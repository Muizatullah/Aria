import { useState } from "react";
import { Plus } from "lucide-react";
import heroImage from "../../assets/image1.jpeg";
import styles from "./craftsmanShip.module.css";

const STATS = [
  { value: "47", label: "Quality Checks" },
  { value: "17", label: "Artisan Hands" },
  { value: "6", label: "Week Lead Time" },
];

// PLACEHOLDER descriptions — the design only shows the step titles (the "+" opens
// each one). Replace the `text` of each step with your real copy.
const STEPS = [
  {
    number: "01",
    title: "Hide Selection",
    text: "Each hide is chosen by hand for grain, thickness and consistency. Only full-grain leather with no visible scarring reaches our atelier floor.",
  },
  {
    number: "02",
    title: "Pattern Cutting",
    text: "Every panel is cut by hand from a paper pattern, following the natural direction of the grain so the bag holds its shape for years.",
  },
  {
    number: "03",
    title: "Edge Treatment",
    text: "Edges are skived, dyed, sanded and burnished until they are smooth, sealed and perfectly even.",
  },
  {
    number: "04",
    title: "Saddle Stitching",
    text: "Two needles, one waxed thread, every stitch pulled by hand. If one thread breaks, the seam holds.",
  },
  {
    number: "05",
    title: "Hardware Fitting",
    text: "Solid brass zippers, clasps and rings are fitted and tested for fit, weight and finish before the bag is closed.",
  },
  {
    number: "06",
    title: "Final Inspection",
    text: "Every bag is inspected by hand, piece by piece, before it is wrapped and shipped to you.",
  },
];

function CraftsmanShip() {
  const [openIndex, setOpenIndex] = useState(null); // one step open at a time

  const toggle = (index) => setOpenIndex((current) => (current === index ? null : index));

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <img src={heroImage} alt="" className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroShade} />

        <div className={`container ${styles.heroContent}`}>
          <p className="eyebrow">The Process</p>
          <h1 className={styles.title}>CraftsmanShip</h1>
        </div>
      </header>

      {/* Stats */}
      <section className={styles.stats} aria-label="ARIA in numbers">
        <div className="container">
          <ul className={`${styles.statGrid} ${styles.inset}`}>
            {STATS.map((stat) => (
              <li key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Six-step process */}
      <section className={styles.process}>
        <div className="container">
          <div className={styles.inset}>
            <h2 className={styles.heading}>The Six-Step Process</h2>

            <ul className={styles.steps}>
              {STEPS.map((step, index) => {
                const open = openIndex === index;
                return (
                  <li key={step.number} className={`${styles.step} ${open ? styles.stepOpen : ""}`}>
                    <button
                      type="button"
                      className={styles.stepButton}
                      aria-expanded={open}
                      aria-controls={`step-panel-${index}`}
                      id={`step-button-${index}`}
                      onClick={() => toggle(index)}
                    >
                      <span className={styles.stepNumber}>{step.number}</span>
                      <span className={styles.stepTitle}>{step.title}</span>
                      <Plus size={24} className={styles.plus} aria-hidden="true" />
                    </button>

                    <div
                      id={`step-panel-${index}`}
                      role="region"
                      aria-labelledby={`step-button-${index}`}
                      className={styles.panel}
                      aria-hidden={!open}
                    >
                      <div className={styles.panelInner}>
                        <p className={styles.panelText}>{step.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section className={styles.warranty}>
        <div className="container">
          <div className={`${styles.warrantyCard} ${styles.inset}`}>
            <h2 className={styles.warrantyTitle}>Lifetime Warranty</h2>
            <p className={styles.warrantyText}>
              Every ARIA bag is warranted against manufacturing defects for life. If
              the stitching fails, the hardware breaks, or the structure compromises —
              we repair it free of charge.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CraftsmanShip;