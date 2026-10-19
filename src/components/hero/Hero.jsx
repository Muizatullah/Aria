import { Link } from "react-router";
import heroImage from "../../assets/hero-bag.jpeg";
import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <img src={heroImage} alt="" className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>New Collection — #2026</p>

        <h1 className={styles.title}>
          <span className={styles.line}>Carry</span>
          <span className={`${styles.line} ${styles.accent}`}>Your</span>
          <span className={styles.line}>Story</span>
        </h1>

        <p className={styles.text}>
          Handcrafted leather bags for both men and women who move through the world with
          intention. Made in Nigeria. Worn everywhere.
        </p>

        <div className={styles.actions}>
          <Link to="/shop" className={styles.primaryBtn}>
            Shop Now
          </Link>
          <Link to="/collections" className={styles.secondaryBtn}>
            View Collections
          </Link>
        </div>
      </div>

      <a href="#featured" className={styles.scroll} aria-label="Scroll down">
        <span>Scroll</span>
        <i className={styles.scrollLine} />
      </a>
    </section>
  );
}

export default Hero;