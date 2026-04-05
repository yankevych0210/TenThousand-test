import type { GetFormQuery } from "@/generated/graphql";
import styles from "./QuestionRenderer.module.css";

type Question = GetFormQuery["form"]["questions"][number];

interface QuestionRendererProps {
  question: Question;
  values: string[];
  error?: string;
  onChange: (values: string[]) => void;
}

export function QuestionRenderer({
  question,
  values,
  error,
  onChange,
}: QuestionRendererProps) {
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange([e.target.value]);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange([e.target.value]);
  };

  const handleRadioChange = (option: string) => {
    onChange([option]);
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const next = checked
      ? [...values, option]
      : values.filter((v) => v !== option);
    onChange(next);
  };

  return (
    <div
      className={[styles.wrapper, error ? styles.hasError : ""]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-labelledby={`title-${question.id}`}
    >
      <div id={`title-${question.id}`} className={styles.questionText}>
        {question.text}
        {question.required && (
          <span className={styles.required} aria-label="required">
            {" "}
            *
          </span>
        )}
      </div>

      <div className={styles.inputArea}>
        {question.type === "TEXT" && (
          <input
            id={`answer-${question.id}`}
            type="text"
            className={styles.textInput}
            value={values[0] ?? ""}
            onChange={handleTextChange}
            placeholder="Your answer"
            aria-required={question.required}
          />
        )}

        {question.type === "DATE" && (
          <input
            id={`answer-${question.id}`}
            type="date"
            className={styles.textInput}
            value={values[0] ?? ""}
            onChange={handleDateChange}
            aria-required={question.required}
          />
        )}

        {question.type === "MULTIPLE_CHOICE" && (
          <div
            className={styles.optionGroup}
            role="radiogroup"
            aria-required={question.required}
          >
            {(question.options ?? []).map((option) => (
              <label key={option} className={styles.optionLabel}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={values[0] === option}
                  onChange={() => handleRadioChange(option)}
                  className={styles.radio}
                />
                <span className={styles.optionText}>{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === "CHECKBOX" && (
          <div className={styles.optionGroup}>
            {(question.options ?? []).map((option) => (
              <label key={option} className={styles.optionLabel}>
                <input
                  type="checkbox"
                  value={option}
                  checked={values.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange(option, e.target.checked)
                  }
                  className={styles.checkbox}
                />
                <span className={styles.optionText}>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
