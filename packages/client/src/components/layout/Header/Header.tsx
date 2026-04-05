import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img
            src="/favicon.svg"
            alt="Forms Lite Icon"
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>Forms Lite</span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link
            to="/"
            className={[
              styles.navLink,
              location.pathname === "/" ? styles.navLinkActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            My Forms
          </Link>
          <Link
            to="/forms/new"
            className={[
              styles.navLink,
              styles.navLinkCreate,
              location.pathname === "/forms/new" ? styles.navLinkActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            id="nav-create-form"
          >
            + New Form
          </Link>
        </nav>
      </div>
    </header>
  );
}
