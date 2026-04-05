import { useParams } from "react-router-dom";
import { useGetFormQuery } from "@/api/graphqlApi";
import type { GetFormQuery } from "@/generated/graphql";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { QuestionRenderer } from "@/components/forms/QuestionRenderer/QuestionRenderer";
import { CheckCircle } from "lucide-react";
import { Button, Card, Spinner, ErrorMessage } from "@/components/ui";
import { formatDate } from "@/utils/date";
import styles from "./FormFillerPage.module.css";

type FormQuestion = GetFormQuery["form"]["questions"][number];

export function FormFillerPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetFormQuery(
    { id: id! },
    { skip: !id },
  );

  const {
    answers,
    validationErrors,
    isSubmitting,
    isSubmitted,
    errorMessage,
    setAnswer,
    handleSubmit,
  } = useFormSubmit(data?.form);

  if (isLoading) return <Spinner size="lg" />;

  if (error || !data) {
    return (
      <div className={styles.page}>
        <ErrorMessage message="Failed to load form. Please check the URL and try again." />
      </div>
    );
  }

  const { form } = data;

  if (isSubmitted) {
    return (
      <main className={styles.page}>
        <div className={styles.successCard}>
          <CheckCircle
            className={styles.successIcon}
            size={64}
            aria-hidden="true"
          />
          <h1 className={styles.successTitle}>Response Submitted!</h1>
          <p className={styles.successText}>
            Your response has been recorded successfully.
          </p>
          <div className={styles.successActions}>
            <Button variant="ghost" onClick={() => window.location.reload()}>
              Submit another response
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.formContainer}>
        {/* Form header */}
        <Card accent padding="lg">
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>{form.title}</h1>
            {form.description && (
              <p className={styles.formDescription}>{form.description}</p>
            )}
            <p className={styles.formMeta}>
              Created {formatDate(form.createdAt)} · {form.questions.length}{" "}
              question{form.questions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </Card>

        {/* Questions */}
        <form
          id="form-filler"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
          className={styles.questionsForm}
          noValidate
        >
          {form.questions.map((question: FormQuestion) => (
            <QuestionRenderer
              key={question.id}
              question={question}
              values={answers[question.id] ?? []}
              error={validationErrors[question.id]}
              onChange={(values) => setAnswer(question.id, values)}
            />
          ))}

          {errorMessage && <ErrorMessage message={errorMessage} />}

          <div className={styles.submitArea}>
            <Button
              id="submit-form-btn"
              type="submit"
              size="lg"
              loading={isSubmitting}
              fullWidth
            >
              Submit Response
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
