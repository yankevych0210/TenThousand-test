import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setTitle,
  setDescription,
  addQuestion,
  updateQuestion,
  removeQuestion,
  addOption,
  updateOption,
  removeOption,
  moveQuestion,
  resetForm,
  initForm,
} from "@/features/forms/formBuilderSlice";
import {
  useCreateFormMutation,
  useUpdateFormMutation,
  useGetFormQuery,
} from "@/api/graphqlApi";
import type { GetFormQuery } from "@/generated/graphql";
import type { GraphQLError } from "@/api/baseApi";
import type { QuestionType, DraftQuestion } from "@/types/form.types";

type ExistingQuestion = GetFormQuery["form"]["questions"][number];

function mapExistingQuestion(q: ExistingQuestion): DraftQuestion {
  return {
    id: q.id,
    text: q.text,
    type: q.type as QuestionType,
    options: q.options ?? [],
    required: q.required,
  };
}

export function useFormBuilder(formId?: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const draft = useAppSelector((state) => state.formBuilder);

  const { data: existingFormData, isLoading: isFetching } = useGetFormQuery(
    { id: formId! },
    { skip: !formId },
  );

  const [createFormMutation, { isLoading: isCreating, error: createError }] =
    useCreateFormMutation();
  const [updateFormMutation, { isLoading: isUpdating, error: updateError }] =
    useUpdateFormMutation();

  const isSaving = isCreating || isUpdating;
  const saveError = createError ?? updateError;

  useEffect(() => {
    if (formId && existingFormData?.form) {
      dispatch(
        initForm({
          title: existingFormData.form.title,
          description: existingFormData.form.description ?? "",
          questions: existingFormData.form.questions.map(mapExistingQuestion),
        }),
      );
    } else if (!formId) {
      dispatch(resetForm());
    }
  }, [formId, existingFormData, dispatch]);

  const handleSetTitle = useCallback(
    (value: string) => dispatch(setTitle(value)),
    [dispatch],
  );

  const handleSetDescription = useCallback(
    (value: string) => dispatch(setDescription(value)),
    [dispatch],
  );

  const handleAddQuestion = useCallback(
    (type: QuestionType) => dispatch(addQuestion(type)),
    [dispatch],
  );

  const handleUpdateQuestion = useCallback(
    (id: string, changes: Partial<DraftQuestion>) =>
      dispatch(updateQuestion({ id, changes })),
    [dispatch],
  );

  const handleRemoveQuestion = useCallback(
    (id: string) => dispatch(removeQuestion(id)),
    [dispatch],
  );

  const handleAddOption = useCallback(
    (questionId: string) => dispatch(addOption(questionId)),
    [dispatch],
  );

  const handleUpdateOption = useCallback(
    (questionId: string, index: number, value: string) =>
      dispatch(updateOption({ questionId, index, value })),
    [dispatch],
  );

  const handleRemoveOption = useCallback(
    (questionId: string, index: number) =>
      dispatch(removeOption({ questionId, index })),
    [dispatch],
  );

  const handleMoveQuestion = useCallback(
    (fromIndex: number, toIndex: number) =>
      dispatch(moveQuestion({ fromIndex, toIndex })),
    [dispatch],
  );

  const handleSave = useCallback(async () => {
    if (!draft.title.trim()) return;

    try {
      const questionsData = draft.questions.map((q) => ({
        id: q.id,
        text: q.text.trim() || "Untitled Question",
        type: q.type,
        options:
          q.options.length > 0
            ? q.options.filter((o) => o.trim() !== "")
            : null,
        required: q.required,
      }));

      if (formId) {
        await updateFormMutation({
          input: {
            id: formId,
            title: draft.title.trim(),
            description: draft.description.trim() || null,
            questions: questionsData,
          },
        }).unwrap();
        dispatch(resetForm());
        navigate(`/forms/${formId}/fill`);
      } else {
        const result = await createFormMutation({
          input: {
            title: draft.title.trim(),
            description: draft.description.trim() || null,
            questions: questionsData,
          },
        }).unwrap();
        dispatch(resetForm());
        navigate(`/forms/${result.createForm.id}/fill`);
      }
    } catch {
      // error is exposed via saveError
    }
  }, [
    draft,
    formId,
    updateFormMutation,
    createFormMutation,
    dispatch,
    navigate,
  ]);

  const handleReset = useCallback(() => {
    if (formId && existingFormData) {
      dispatch(
        initForm({
          title: existingFormData.form.title,
          description: existingFormData.form.description ?? "",
          questions: existingFormData.form.questions.map(mapExistingQuestion),
        }),
      );
    } else {
      dispatch(resetForm());
    }
  }, [dispatch, formId, existingFormData]);

  const isValid = draft.title.trim().length > 0;

  const errorMessage =
    saveError != null
      ? Array.isArray(saveError)
        ? (saveError as GraphQLError[]).map((e) => e.message).join(", ")
        : "Failed to save form"
      : null;

  return {
    draft,
    isSaving,
    isFetching,
    errorMessage,
    isValid,
    handleSetTitle,
    handleSetDescription,
    handleAddQuestion,
    handleUpdateQuestion,
    handleRemoveQuestion,
    handleAddOption,
    handleUpdateOption,
    handleRemoveOption,
    handleMoveQuestion,
    handleSave,
    handleReset,
  };
}
