import { Link } from "react-router";
import styles from "./notFound.module.css";

function NotFound() {
  return (
    <main className={styles.page}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page has wandered off.</h1>
        <p className={styles.text}>
          The page you're looking for doesn't exist or has moved. Let's get you back to
          something beautiful.
        </p>
        <div className={styles.actions}>
          <Link to="/shop" className={styles.primary}>SHOP THE COLLECTION</Link>
          <Link to="/" className={styles.secondary}>BACK HOME</Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;