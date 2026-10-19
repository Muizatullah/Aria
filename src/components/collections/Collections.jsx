import { Link } from "react-router";
import { collections } from "../../data.js";
import styles from "./collections.module.css";

function Collections() {
  return (
    <section className={styles.section} aria-label="Collections">
      {collections.map((item) => (
        <Link key={item.id} to={item.to} className={styles.tile}>
          <img src={item.image} alt="" className={styles.image} loading="lazy" />
          <div className={`${styles.overlay} ${styles[item.id]}`} />

          <div className={styles.content}>
            <span className={`eyebrow ${styles.label}`}>Collection</span>
            <h2 className={styles.name}>{item.name}</h2>
            <span className={styles.explore}>Explore →</span>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default Collections;