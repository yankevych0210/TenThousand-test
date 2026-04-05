import { useParams, Link } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "@/api/graphqlApi";
import type { GetFormQuery, GetResponsesQuery } from "@/generated/graphql";
import { BarChart2 } from "lucide-react";
import {
  Card,
  Button,
  Spinner,
  ErrorMessage,
  EmptyState,
  Badge,
} from "@/components/ui";
import { formatDate } from "@/utils/date";
import styles from "./FormResponsesPage.module.css";

type FormQuestion = GetFormQuery["form"]["questions"][number];
type FormResponse = GetResponsesQuery["responses"][number];
type FormAnswer = FormResponse["answers"][number];

export function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: formData,
    isLoading: formLoading,
    error: formError,
  } = useGetFormQuery({ id: id! }, { skip: !id });

  const { data: responsesData, isLoading: responsesLoading } =
    useGetResponsesQuery({ formId: id! }, { skip: !id });

  const isLoading = formLoading || responsesLoading;

  if (isLoading) return <Spinner size="lg" />;

  if (formError || !formData) {
    return (
      <div className={styles.page}>
        <ErrorMessage message="Could not load form. Is the server running?" />
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const { form } = formData;
  const responses = responsesData?.responses ?? [];

  const questionMap = new Map<string, FormQuestion>(
    form.questions.map((q) => [q.id, q]),
  );

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <Link to="/" className={styles.breadcrumb}>
          ← My Forms
        </Link>
        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>{form.title} — Responses</h1>
          <Badge color="purple">
            {responses.length} response{responses.length !== 1 ? "s" : ""}
          </Badge>
        </div>
        {form.description && (
          <p className={styles.description}>{form.description}</p>
        )}
        <div className={styles.pageActions}>
          <Link to={`/forms/${form.id}/fill`} className={styles.fillLink}>
            Fill this form →
          </Link>
        </div>
      </div>

      {responses.length === 0 ? (
        <EmptyState
          icon={<BarChart2 size={48} />}
          title="No responses yet"
          description="Share this form and responses will appear here."
          action={
            <Link to={`/forms/${form.id}/fill`}>
              <Button>Fill the Form</Button>
            </Link>
          }
        />
      ) : (
        <div className={styles.responsesList}>
          {responses.map((response: FormResponse, index: number) => (
            <Card key={response.id} padding="md">
              <div className={styles.responseHeader}>
                <h2 className={styles.responseTitle}>Response #{index + 1}</h2>
                <span className={styles.responseDate}>
                  {formatDate(response.submittedAt)}
                </span>
              </div>
              <div className={styles.answersList}>
                {response.answers.map((answer: FormAnswer) => {
                  const question = questionMap.get(answer.questionId);
                  const questionLabel =
                    question?.text.trim() || "Untitled Question";
                  const nonEmptyValues = answer.values.filter(
                    (v) => v.trim() !== "",
                  );
                  const displayValue =
                    nonEmptyValues.length > 0
                      ? nonEmptyValues.join(", ")
                      : undefined;
                  return (
                    <div key={answer.questionId} className={styles.answerRow}>
                      <p className={styles.answerQuestion}>{questionLabel}</p>
                      <p className={styles.answerValue}>
                        {displayValue ?? (
                          <em className={styles.noAnswer}>
                            No answer provided
                          </em>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
