import { useParams } from "react-router-dom";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { QuestionBuilderCard } from "@/components/forms/QuestionBuilderCard/QuestionBuilderCard";
import { AddQuestionMenu } from "@/components/forms/AddQuestionMenu/AddQuestionMenu";
import {
  Button,
  Card,
  Input,
  Textarea,
  ErrorMessage,
  Spinner,
} from "@/components/ui";
import type { QuestionType } from "@/types/form.types";
import { FolderPlus } from "lucide-react";
import styles from "./FormBuilderPage.module.css";

export function FormBuilderPage() {
  const { id } = useParams<{ id?: string }>();

  const {
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
  } = useFormBuilder(id);

  if (isFetching) return <Spinner size="lg" />;

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          {id ? "Edit Form" : "Create a New Form"}
        </h1>
        <p className={styles.pageSubtitle}>
          Build your form by adding questions below
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.formArea}>
          {/* Form header card */}
          <Card accent padding="lg">
            <div className={styles.formHeaderCard}>
              <Input
                id="form-title"
                label="Form Title"
                placeholder="Untitled Form"
                value={draft.title}
                onChange={(e) => handleSetTitle(e.target.value)}
                required
                className={styles.titleInput}
              />
              <Textarea
                id="form-description"
                label="Description"
                placeholder="Add a description (optional)"
                value={draft.description}
                onChange={(e) => handleSetDescription(e.target.value)}
                rows={3}
              />
            </div>
          </Card>

          {/* Questions list */}
          {draft.questions.length === 0 ? (
            <div className={styles.emptyQuestions}>
              <FolderPlus
                size={48}
                className={styles.emptyIcon}
                aria-hidden="true"
              />
              <p>No questions yet. Add your first question from the panel →</p>
            </div>
          ) : (
            <div className={styles.questionsList}>
              {draft.questions.map((question, index) => (
                <QuestionBuilderCard
                  key={question.id}
                  question={question}
                  index={index}
                  total={draft.questions.length}
                  onUpdate={(changes) =>
                    handleUpdateQuestion(question.id, changes)
                  }
                  onRemove={() => handleRemoveQuestion(question.id)}
                  onMoveUp={() => handleMoveQuestion(index, index - 1)}
                  onMoveDown={() => handleMoveQuestion(index, index + 1)}
                  onAddOption={() => handleAddOption(question.id)}
                  onUpdateOption={(i, v) =>
                    handleUpdateOption(question.id, i, v)
                  }
                  onRemoveOption={(i) => handleRemoveOption(question.id, i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <Card padding="md">
            <h2 className={styles.sidebarTitle}>Add Question</h2>
            <AddQuestionMenu
              onAdd={(type: QuestionType) => handleAddQuestion(type)}
            />
          </Card>

          <Card padding="md">
            <h2 className={styles.sidebarTitle}>Actions</h2>
            <div className={styles.actions}>
              {errorMessage && <ErrorMessage message={errorMessage} />}
              <Button
                id="save-form-btn"
                onClick={handleSave}
                loading={isSaving}
                disabled={!isValid}
                fullWidth
              >
                Save Form
              </Button>
              <Button
                id="reset-form-btn"
                variant="ghost"
                onClick={handleReset}
                fullWidth
              >
                Reset
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
