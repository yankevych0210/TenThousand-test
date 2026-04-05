import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={[styles.input, error ? styles.inputError : "", className]
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
