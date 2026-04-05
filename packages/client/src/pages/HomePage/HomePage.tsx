import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetFormsQuery, useDeleteFormMutation } from "@/api/graphqlApi";
import type { GetFormsQuery } from "@/generated/graphql";
import {
  FileText,
  Pencil,
  Trash2,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import {
  Card,
  Button,
  Spinner,
  EmptyState,
  ErrorMessage,
  Badge,
  ConfirmModal,
} from "@/components/ui";
import { formatDate } from "@/utils/date";
import styles from "./HomePage.module.css";

type FormListItem = GetFormsQuery["forms"][number];

export function HomePage() {
  const { data, isLoading, error } = useGetFormsQuery();
  const [deleteFormMutation, { isLoading: isDeleting }] =
    useDeleteFormMutation();
  const [formToDelete, setFormToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (!formToDelete) return;
    try {
      await deleteFormMutation({ id: formToDelete.id }).unwrap();
      setFormToDelete(null);
    } catch (err) {
      console.error("Failed to delete form", err);
    }
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/forms/${id}/fill`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (isLoading) return <Spinner size="lg" />;
  if (error) {
    return (
      <div className={styles.page}>
        <ErrorMessage message="Could not load forms. Is the server running?" />
      </div>
    );
  }

  const forms = data?.forms ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Forms</h1>
          <p className={styles.heroSubtitle}>
            Create forms, collect responses, and analyse results — all in one
            place.
          </p>
          <Link to="/forms/new" id="create-form-hero-btn">
            <Button size="lg">Create New Form</Button>
          </Link>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.decorCircle1} />
          <div className={styles.decorCircle2} />
        </div>
      </div>

      {forms.length === 0 ? (
        <EmptyState
          icon={<FileText size={48} />}
          title="No forms yet"
          description="Create your first form to start collecting responses."
          action={
            <Link to="/forms/new">
              <Button>Create Your First Form</Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>All Forms</h2>
            <Badge color="purple">
              {forms.length} form{forms.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className={styles.grid}>
            {forms.map((form: FormListItem) => (
              <article key={form.id} className={styles.formCard}>
                <Card accent className={styles.cardContainer}>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>
                        {formatDate(form.createdAt)}
                      </span>
                      <Badge color="gray">
                        {form.questions.length} question
                        {form.questions.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <h3 className={styles.cardTitle}>{form.title}</h3>
                    {form.description && (
                      <p className={styles.cardDescription}>
                        {form.description}
                      </p>
                    )}
                  </div>
                  <div className={styles.cardActions}>
                    <Link
                      to={`/forms/${form.id}/fill`}
                      id={`fill-form-${form.id}`}
                      title="Fill Form"
                    >
                      <Button variant="primary" size="sm">
                        Fill Form
                      </Button>
                    </Link>
                    <Link
                      to={`/forms/${form.id}/responses`}
                      id={`view-responses-${form.id}`}
                      title="View Responses"
                    >
                      <Button variant="ghost" size="sm">
                        Responses
                      </Button>
                    </Link>
                    <div className={styles.actionGroupRight}>
                      <button
                        onClick={() => handleCopyLink(form.id)}
                        className={styles.iconBtn}
                        title="Copy Form Link"
                        type="button"
                      >
                        {copiedId === form.id ? (
                          <Check size={18} className={styles.successIcon} />
                        ) : (
                          <LinkIcon size={18} />
                        )}
                      </button>
                      <Link
                        to={`/forms/${form.id}/edit`}
                        className={styles.iconBtn}
                        title="Edit Form"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() =>
                          setFormToDelete({ id: form.id, title: form.title })
                        }
                        className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                        title="Delete Form"
                        type="button"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </Card>
              </article>
            ))}
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={!!formToDelete}
        title="Delete Form"
        message={`Are you sure you want to delete "${formToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setFormToDelete(null)}
        isLoading={isDeleting}
      />
    </main>
  );
}
