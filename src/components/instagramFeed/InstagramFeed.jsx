import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import image5 from "../../assets/image5.jpeg";
import image6 from "../../assets/image6.jpeg";
import styles from "./instagramFeed.module.css";

const HANDLE = "ariadesign.ng";
const PROFILE_URL = `https://www.instagram.com/${HANDLE}`;

const POSTS = [image1, image2, image3, image4, image5, image6];

// Inline SVG — lucide-react no longer ships brand icons in newer versions
function InstagramIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function InstagramFeed() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profile}
          >
            <InstagramIcon />
            <span className={styles.handle}>@{HANDLE}</span>
            <span className={styles.followers}>· 12.4K followers</span>
          </a>

          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.follow}
          >
            Follow us
          </a>
        </header>

        <div className={styles.grid}>
          {POSTS.map((src, index) => (
            <a
              key={index}
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.post}
              aria-label={`Instagram post ${index + 1}`}
            >
              <img src={src} alt={`Instagram ${index + 1}`} loading="lazy" />
              <span className={styles.overlay}>
                <InstagramIcon size={28} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramFeed;