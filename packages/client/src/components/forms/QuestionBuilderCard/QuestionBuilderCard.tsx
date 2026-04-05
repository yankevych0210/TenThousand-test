import { Input } from "@/components/ui";
import type { DraftQuestion } from "@/types/form.types";
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Circle,
  Square,
  X,
} from "lucide-react";
import styles from "./QuestionBuilderCard.module.css";

const QUESTION_TYPE_LABELS: Record<DraftQuestion["type"], string> = {
  TEXT: "Short Text",
  MULTIPLE_CHOICE: "Multiple Choice",
  CHECKBOX: "Checkboxes",
  DATE: "Date",
};

interface QuestionBuilderCardProps {
  question: DraftQuestion;
  index: number;
  total: number;
  onUpdate: (changes: Partial<DraftQuestion>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAddOption: () => void;
  onUpdateOption: (index: number, value: string) => void;
  onRemoveOption: (index: number) => void;
}

export function QuestionBuilderCard({
  question,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: QuestionBuilderCardProps) {
  const hasOptions =
    question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOX";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.index}>Q{index + 1}</span>
          <span className={styles.typeBadge}>
            {QUESTION_TYPE_LABELS[question.type]}
          </span>
        </div>
        <div className={styles.headerActions}>
          <button
            id={`move-up-q${index}`}
            className={styles.iconBtn}
            onClick={onMoveUp}
            disabled={index === 0}
            aria-label="Move question up"
            type="button"
          >
            <ArrowUp size={18} />
          </button>
          <button
            id={`move-down-q${index}`}
            className={styles.iconBtn}
            onClick={onMoveDown}
            disabled={index === total - 1}
            aria-label="Move question down"
            type="button"
          >
            <ArrowDown size={18} />
          </button>
          <button
            id={`remove-q${index}`}
            className={[styles.iconBtn, styles.iconBtnDanger].join(" ")}
            onClick={onRemove}
            aria-label="Remove question"
            type="button"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <Input
          id={`question-text-${question.id}`}
          placeholder="Question text"
          value={question.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
        />

        {hasOptions && (
          <div className={styles.optionsSection}>
            <p className={styles.optionsLabel}>Options</p>
            <div className={styles.optionsList}>
              {question.options.map((option, i) => (
                <div key={i} className={styles.optionRow}>
                  <span className={styles.optionMarker} aria-hidden="true">
                    {question.type === "MULTIPLE_CHOICE" ? (
                      <Circle size={16} />
                    ) : (
                      <Square size={16} />
                    )}
                  </span>
                  <input
                    id={`option-${question.id}-${i}`}
                    type="text"
                    className={styles.optionInput}
                    value={option}
                    onChange={(e) => onUpdateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                  />
                  <button
                    className={[
                      styles.iconBtn,
                      styles.iconBtnSm,
                      styles.iconBtnDanger,
                    ].join(" ")}
                    onClick={() => onRemoveOption(i)}
                    disabled={question.options.length <= 1}
                    aria-label={`Remove option ${i + 1}`}
                    type="button"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              id={`add-option-${question.id}`}
              className={styles.addOptionBtn}
              onClick={onAddOption}
              type="button"
            >
              <Plus size={16} style={{ marginRight: "4px" }} /> Add Option
            </button>
          </div>
        )}

        <div className={styles.footer}>
          <label
            className={styles.requiredToggle}
            htmlFor={`required-${question.id}`}
          >
            <input
              id={`required-${question.id}`}
              type="checkbox"
              checked={question.required}
              onChange={(e) => onUpdate({ required: e.target.checked })}
            />
            <span>Required</span>
          </label>
        </div>
      </div>
    </div>
  );
}
