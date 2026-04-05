import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function Card({
  children,
  className = "",
  accent = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={[
        styles.card,
        accent ? styles.accent : "",
        styles[`padding_${padding}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
