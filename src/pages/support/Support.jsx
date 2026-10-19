import { useState } from "react";
import { Link } from "react-router";
import { Mail, MessageCircle, Phone, Plus, Truck, Package } from "lucide-react";
import styles from "./support.module.css";

const CONTACTS = [
  {
    id: "email",
    icon: Mail,
    title: "Email",
    value: "hello@arialuxe.com",
    href: "mailto:hello@ariadesign.com",
    note: "Reply within 4 hours",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+234 813 440 7246",
    href: "https://wa.me/2348134407246",
    note: "Chat with a stylist now",
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone",
    value: "+234 813 440 7246",
    href: "tel:+2348134407246",
    note: "Mon–Fri 9AM–6PM WAT",
  },
];

// PLACEHOLDER answers: only the questions were visible in the design.
// Replace each answer with your real policy.
const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Orders are crafted and packed within 7 business days. Standard delivery within Nigeria takes 3–5 business days, and Express takes 1–2 business days once your order has shipped.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship worldwide through DHL Express. Delivery time and cost depend on your country and are shown at checkout.",
  },
  {
    q: "What is your return policy?",
    a: "You can return unused bags in their original packaging within 14 days of delivery for a full refund. Contact us first so we can arrange the return.",
  },
  {
    q: "How do I care for my ARIA bag?",
    a: "Keep your bag stuffed with tissue and stored in its dust bag. Wipe gently with a soft dry cloth, avoid prolonged water and direct sun, and condition the leather twice a year.",
  },
  {
    q: "Can I get my bag repaired?",
    a: "Yes. Every ARIA bag is covered by our lifetime warranty, and our artisans can repair wear, hardware and stitching. Email us with photos and we'll advise next steps.",
  },
  {
    q: "How do I track my order?",
    a: "Use the Track an Order page and enter the order ID from your confirmation email, for example ARIA-2026-8841, or your DHL tracking number.",
  },
];

const HELP_LINKS = [
  { id: "track", icon: Truck, title: "Track an Order", text: "Check your delivery status", to: "/track-order" },
  { id: "shipping", icon: Package, title: "Shipping & Returns", text: "Full policy details", to: "/shipping" },
];

function Support() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex((current) => (current === index ? null : index));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className="eyebrow">We Are Here</p>
        <h1 className={styles.title}>Customer Support</h1>
        <p className={styles.subtitle}>Real people. Real answers. Mon–Fri 9AM–6PM WAT.</p>
      </header>

      <div className="container">
        <ul className={styles.contacts}>
          {CONTACTS.map(({ id, icon: Icon, title, value, href, note }) => (
            <li key={id} className={styles.contact}>
              <Icon size={44} strokeWidth={1.5} className={styles.contactIcon} aria-hidden="true" />
              <h2 className={styles.contactTitle}>{title}</h2>
              <a
                href={href}
                className={styles.contactValue}
                {...(id === "whatsapp" ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {value}
              </a>
              <p className={styles.contactNote}>{note}</p>
            </li>
          ))}
        </ul>

        <section className={styles.faq} aria-labelledby="faq-title">
          <h2 id="faq-title" className={styles.faqTitle}>
            Frequently Asked Questions
          </h2>

          <ul className={styles.faqList}>
            {FAQS.map((item, index) => {
              const open = openIndex === index;

              return (
                <li key={item.q} className={`${styles.faqItem} ${open ? styles.open : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className={styles.question}
                      onClick={() => toggle(index)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                    >
                      <span>{item.q}</span>
                      <Plus size={20} className={styles.plus} aria-hidden="true" />
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={styles.answerWrap}
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div className={styles.help}>
          {HELP_LINKS.map(({ id, icon: Icon, title, text, to }) => (
            <Link key={id} to={to} className={styles.helpCard}>
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <span className={styles.helpTitle}>{title}</span>
                <span className={styles.helpText}>{text}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Support;