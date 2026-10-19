import { Navigate } from "react-router";
import { LEGAL } from "./Legalcontent.js";
import styles from "./legal.module.css";

// One page layout for all three legal pages. Pick the content with `type`:
//   <Legal type="privacy" />   <Legal type="terms" />   <Legal type="accessibility" />
function Legal({ type }) {
  const page = LEGAL[type];

  if (!page) return <Navigate to="/" replace />;

  return (
    <div className={styles.page}>
      <article className={styles.content}>
        <header className={styles.header}>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.updated}>Last updated: {page.updated}</p>
          <p className={styles.intro}>{page.intro}</p>
        </header>

        {page.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.heading}>{section.heading}</h2>

            {section.paragraphs?.map((text) => (
              <p key={text} className={styles.text}>
                {text}
              </p>
            ))}

            {section.list && (
              <ul className={styles.list}>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}

export default Legal;