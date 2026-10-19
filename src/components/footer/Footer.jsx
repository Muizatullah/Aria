import { Link } from "react-router";
import logo from "../../assets/ARIA LOGO-42.svg";
import styles from "./footer.module.css";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/shop?sort=new" },
      { label: "Collections", to: "/collections" },
      { label: "Bestsellers", to: "/shop?sort=bestsellers" },
      { label: "Lookbook", to: "/lookbook" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", to: "/our-story" },
      { label: "Craftsmanship", to: "/craftsmanship" },
      // { label: "Sustainability", to: "/sustainability" },
      { label: "Sustainability", to: "/Our-Story" },
      // { label: "Careers", to: "/careers" },
      { label: "Careers", to: "/our-Story" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Support", to: "/support" },
      { label: "Shipping & Returns", to: "/shipping" },
      { label: "Order Tracking", to: "/track-order" },
      { label: "Account", to: "/account" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Accessibility", to: "/accessibility" },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" aria-label="ARIA home" className={styles.logo}>
              <img src={logo} alt="ARIA" />
            </Link>
            <p className={styles.tagline}>
              Handcrafted leather bags for women who move through the world with
              intention.
            </p>
            <p className={styles.made}>Made in Florence. Worn everywhere.</p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} className={styles.column} aria-label={column.title}>
              <h3 className={styles.heading}>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} ARIA Luxury. All rights reserved.
          </p>

          <ul className={styles.legal}>
            {LEGAL.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={styles.legalLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;