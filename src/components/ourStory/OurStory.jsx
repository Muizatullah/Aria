import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import image9 from "../../assets/image9.jpeg";
import styles from "./ourStory.module.css";

function OurStory() {
  return (
    <section id="story" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <p className="eyebrow">Our Story</p>

          <h2 className={styles.title}>
            Born in Lagos. Made for <em>Modern Men and Women.</em>
          </h2>

          <p className={styles.body}>
            Founded in 2026 by Bakri Ikmat, ARIA draws its name from the Yoruba
            word for celebration. Born from a bold vision to craft
            accessories for the modern Nigerian trailblazer, every piece is
            meticulously handcrafted right here in our Lagos workshop, designed
            to move with your energy and elevate your everyday story.
          </p>

          <Link to="/our-story" className={styles.link}>
            Read our story <ArrowRight size={20} />
          </Link>
        </div>

        <div className={styles.visual}>
          <img
            src={image9}
            alt="Artisan crafting a leather bag in the ARIA atelier"
            loading="lazy"
          />

          <div className={styles.badge}>
            <span className={styles.number}></span>
            <span className={styles.label}>Ikky Hands</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
