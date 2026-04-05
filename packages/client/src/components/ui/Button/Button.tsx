import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        loading ? styles.loading : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
