import look1 from "../../assets/image2.jpeg";
import look2 from "../../assets/image5.jpeg";
import styles from "./lookBook.module.css";

// `span` is how many of the 12 grid columns the photo takes up.
// Row 1 in the design is 7 + 5. To add the next rows, copy an object, import
// the image above, and pick spans that add up to 12 (e.g. 4 + 4 + 4, or 5 + 7).
const LOOKS = [
  { id: 1, image: look1, alt: "ARIA lookbook — editorial look 1", span: 7 },
  { id: 2, image: look2, alt: "ARIA lookbook — editorial look 2", span: 5 },
];

function LookBook() {
  return (
    <div className={styles.page}>
      <header className={`container ${styles.header}`}>
        <p className="eyebrow">Editorial</p>
        <h1 className={styles.title}>Lookbook</h1>
      </header>

      <section className={`container ${styles.gallery}`} aria-label="Lookbook gallery">
        {LOOKS.map((look) => (
          <figure
            key={look.id}
            className={styles.look}
            style={{ gridColumn: `span ${look.span}` }}
          >
            <img src={look.image} alt={look.alt} loading="lazy" />
          </figure>
        ))}
      </section>
    </div>
  );
}

export default LookBook;