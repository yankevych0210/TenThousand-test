import styles from "./Textarea.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const inputId = id ?? `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        className={[
          styles.textarea,
          error ? styles.textareaError : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
