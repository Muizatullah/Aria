import storyImage from "../../assets/image1.jpeg";
import styles from "./ourStory.module.css";

const TIMELINE = [
  { year: "2019", label: "Founded in Lagos" },
  { year: "2026", label: "Aria opens" },
  { year: "2026", label: "10,000+ customers worldwide" },
];

function OurStory() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={`container ${styles.hero}`}>
        <p className="eyebrow">Since 2019</p>
        <h1 className={styles.title}>Our Story</h1>
      </header>

      {/* The woman behind ARIA */}
      <section className={`container ${styles.founder}`}>
        <div className={styles.founderInner}>
          <div className={styles.founderText}>
            <h2 className={styles.heading}>The Woman Behind ARIA</h2>

            <p className={styles.body}>
              Long before university halls, Bakri Ikmat was already sketching
              and breathing life into bags, a passion that birthed theshoetrybe
              in 2019. In 2026, she stepped into a bold new chapter with the
              rebrand to ARIA. Rooted in the Yoruba word Ariya (celebration),
              ARIA was created with a clear purpose: so that everyone who
              carries our pieces can experience a profound sense of energy, joy,
              elevation, and peace.
            </p>

            <p className={styles.body}>
              One year later, she founded ARIA in Lagos with a vision: every
              woman deserves a bag that was made for her life, not just her
              outfit.
            </p>
          </div>

          <div className={styles.founderImage}>
            <img
              src={storyImage}
              alt="A stack of books with an open lookbook on top"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className={`container ${styles.quoteWrap}`}>
        <figure className={styles.quote}>
          <blockquote className={styles.quoteText}>
            "A bag is not an accessory. It is the architecture of a woman's day.
            We build accordingly."
          </blockquote>
          <figcaption className={styles.cite}>
            — Bakri Ikmat, Founder
          </figcaption>
        </figure>
      </section>

      {/* Timeline */}
      <section
        className={`container ${styles.timelineWrap}`}
        aria-label="Timeline"
      >
        <ol className={styles.timeline}>
          {TIMELINE.map((item) => (
            <li key={item.year} className={styles.milestone}>
              <span className={styles.year}>{item.year}</span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* The ARIA name */}
      <section className={`container ${styles.nameWrap}`}>
        <div className={styles.name}>
          <h2 className={styles.heading}>The ARIA Name</h2>
          <p className={styles.body}>
            Aria — Yoruba for "cellebration" and musical for "melody." We chose it
            because a great bag should feel weightless even when it carries
            everything, and because beauty should move through you like music.
            
          </p>
        </div>
      </section>
    </div>
  );
}

export default OurStory;
