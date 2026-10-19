import { Star } from "lucide-react";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import styles from "./testimonials.module.css";

// Add the other two reviews from your design to this array (same shape).
const REVIEWS = [
  {
    id: 1,
    rating: 5,
    quote:
      "The Leelah Tote is hands-down the most beautiful bag I've ever owned. Gets compliments every single day. Worth every penny and more.",
    name: "Leelah K.",
    product: "Leelah Clutch",
    avatar: image3,
  },
  {
    id: 2,
    rating: 5,
    quote:
      "I was nervous ordering online but the packaging alone made me feel like I'd walked into a luxury boutique. The Ember Crossbody is perfect — compact but fits everything.",
    name: "Bakri M.",
    product: "Izza Shoulder",
    avatar: image4,
  },
  {
    id: 3,
    rating: 5,
    quote:
      "I was nervous ordering online but the packaging alone made me feel like I'd walked into a luxury boutique. The Ember Crossbody is perfect — compact but fits everything.",
    name: "Bakri M.",
    product: "Izza Shoulder",
    avatar: image4,
  },
  {
    id: 4,
    rating: 5,
    quote:
      "I was nervous ordering online but the packaging alone made me feel like I'd walked into a luxury boutique. The Ember Crossbody is perfect — compact but fits everything.",
    name: "Bakri M.",
    product: "Izza Shoulder",
    avatar: image4,
  },
];

function Stars({ count = 5, size = 20 }) {
  return (
    <div className={styles.stars} aria-label={`Rated ${count} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < count ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">What they say</p>
          <h2 className={styles.title}>Loved by 10,000+</h2>

          <div className={styles.summary}>
            <Stars count={5} size={26} />
            <span>4.9 average across 10,284 reviews</span>
          </div>
        </header>

        <div className={styles.grid}>
          {REVIEWS.map((review) => (
            <figure key={review.id} className={styles.card}>
              <Stars count={review.rating} size={22} />

              <blockquote className={styles.quote}>"{review.quote}"</blockquote>

              <figcaption className={styles.author}>
                <img src={review.avatar} alt="" className={styles.avatar} loading="lazy" />
                <div>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.product}>{review.product}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;