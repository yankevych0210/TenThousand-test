import styles from "./Badge.module.css";

type BadgeColor = "purple" | "green" | "yellow" | "red" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
}

export function Badge({ children, color = "purple" }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[color]].join(" ")}>{children}</span>
  );
}
