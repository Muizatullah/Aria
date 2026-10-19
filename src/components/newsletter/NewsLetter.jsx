import { useState } from "react";
import styles from "./newsletter.module.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  const handleSubmit = (e) => {
    e.preventDefault();

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }

    // TODO: send `email` to your backend or email service (Mailchimp, Resend, etc.)
    setStatus("success");
    setEmail("");
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <div className={styles.inner}>
        <p className={styles.label}>Join the ARIA Circle</p>

        <h2 id="newsletter-title" className={styles.title}>
          First to Know.
          <br />
          Always in Style.
        </h2>

        <p className={styles.text}>
          New drops, styling edits, and exclusive access — delivered to your inbox.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            className={styles.input}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            aria-invalid={status === "error"}
            autoComplete="email"
          />
          <button type="submit" className={styles.button}>
            Join
          </button>
        </form>

        <p
          className={`${styles.note} ${status === "error" ? styles.error : ""}`}
          role="status"
          aria-live="polite"
        >
          {status === "success"
            ? "Thank you — you're on the list."
            : status === "error"
            ? "Please enter a valid email address."
            : "No spam, ever. Unsubscribe any time."}
        </p>
      </div>
    </section>
  );
}

export default Newsletter;