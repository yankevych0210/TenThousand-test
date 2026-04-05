import type { QuestionType } from "@/types/form.types";
import { Type, List, CheckSquare, CalendarDays } from "lucide-react";
import styles from "./AddQuestionMenu.module.css";

interface QuestionTypeOption {
  type: QuestionType;
  label: string;
  icon: React.ElementType;
  description: string;
}

const QUESTION_TYPES: QuestionTypeOption[] = [
  {
    type: "TEXT",
    label: "Short Text",
    icon: Type,
    description: "Free-form text answer",
  },
  {
    type: "MULTIPLE_CHOICE",
    label: "Multiple Choice",
    icon: List,
    description: "Single selection",
  },
  {
    type: "CHECKBOX",
    label: "Checkboxes",
    icon: CheckSquare,
    description: "Multiple selections",
  },
  {
    type: "DATE",
    label: "Date",
    icon: CalendarDays,
    description: "Date picker",
  },
];

interface AddQuestionMenuProps {
  onAdd: (type: QuestionType) => void;
}

export function AddQuestionMenu({ onAdd }: AddQuestionMenuProps) {
  return (
    <div className={styles.menu}>
      {QUESTION_TYPES.map(({ type, label, icon: Icon, description }) => (
        <button
          key={type}
          id={`add-question-${type.toLowerCase()}`}
          className={styles.item}
          onClick={() => onAdd(type)}
          type="button"
        >
          <span className={styles.icon} aria-hidden="true">
            <Icon size={20} />
          </span>
          <span className={styles.text}>
            <span className={styles.label}>{label}</span>
            <span className={styles.description}>{description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
