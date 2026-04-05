import { useState, useCallback } from "react";
import type { GetFormQuery } from "@/generated/graphql";
import { useSubmitResponseMutation } from "@/api/graphqlApi";

type AnswerMap = Record<string, string[]>;
type ValidationErrors = Record<string, string>;

export function useFormSubmit(form: GetFormQuery["form"] | undefined) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [
    submitResponseMutation,
    { isLoading: isSubmitting, error: submitError },
  ] = useSubmitResponseMutation();

  const setAnswer = useCallback((questionId: string, values: string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: values }));
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    if (!form) return false;
    const errors: ValidationErrors = {};

    for (const question of form.questions) {
      if (question.required) {
        const values = answers[question.id] ?? [];
        const isEmpty =
          values.length === 0 || values.every((v) => v.trim() === "");
        if (isEmpty) {
          errors[question.id] = "This question is required";
        }
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form, answers]);

  const handleSubmit = useCallback(async () => {
    if (!form) return;
    if (!validate()) return;

    try {
      await submitResponseMutation({
        input: {
          formId: form.id,
          answers: form.questions.map((q) => ({
            questionId: q.id,
            values: answers[q.id] ?? [],
          })),
        },
      }).unwrap();

      setIsSubmitted(true);
    } catch {
      // error exposed via submitError
    }
  }, [form, answers, validate, submitResponseMutation]);

  const errorMessage =
    submitError != null
      ? Array.isArray(submitError)
        ? submitError.map((e) => e.message).join(", ")
        : "Failed to submit response"
      : null;

  return {
    answers,
    validationErrors,
    isSubmitting,
    isSubmitted,
    errorMessage,
    setAnswer,
    handleSubmit,
  };
}
