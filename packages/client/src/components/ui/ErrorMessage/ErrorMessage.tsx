import { AlertCircle } from "lucide-react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorMessage({
  title = "Error",
  message,
  className = "",
}: ErrorMessageProps) {
  return (
    <div className={`${styles.wrapper} ${className}`.trim()} role="alert">
      <AlertCircle className={styles.icon} aria-hidden="true" size={20} />
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
