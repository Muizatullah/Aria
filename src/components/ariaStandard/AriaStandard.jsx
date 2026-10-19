import { Link } from "react-router";
import styles from "./ariaStandard.module.css";

const STANDARDS = [
  {
    number: "01",
    title: "Full-Grain Leather",
    text: "The top layer of the hide — the most durable, most beautiful. It develops a rich patina that makes each bag uniquely yours over time.",
  },
  {
    number: "02",
    title: "Saddle Stitching",
    text: "Every seam is hand-stitched using the centuries-old saddle stitch technique. If one thread breaks, the seam holds. Machine stitching cannot replicate this.",
  },
  {
    number: "03",
    title: "Brass Hardware",
    text: "Solid brass, not plated. Our zippers, clasps, and rings are cast from raw brass and will never rust, peel, or flake — even after decades of daily use.",
  },
];

function AriaStandard() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">The ARIA Standard</p>
          <h2 className={styles.title}>Built to Last a Lifetime</h2>
        </header>

        <div className={styles.grid}>
          {STANDARDS.map((item) => (
            <article key={item.number} className={styles.card}>
              <span className={styles.number}>{item.number}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <Link to="/craftsmanship" className={styles.button}>
            The Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AriaStandard;