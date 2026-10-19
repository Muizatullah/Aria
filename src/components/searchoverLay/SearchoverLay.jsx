import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import styles from "./searchoverlay.module.css";

const POPULAR = ["Tote bags", "Orange leather", "Evening clutch", "Work bag"];

function Searchoverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus the field, lock page scroll and listen for Escape while open
  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const search = (term) => {
    const value = term.trim();
    if (!value) return;
    navigate(`/shop?q=${encodeURIComponent(value)}`);
    setQuery("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
        <X size={32} />
      </button>

      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit} role="search">
          <Search size={28} className={styles.icon} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            placeholder="Search bags, collections, styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search bags, collections, styles"
            autoComplete="off"
          />
        </form>

        <p className={styles.label}>Popular searches</p>
        <ul className={styles.popular}>
          {POPULAR.map((term) => (
            <li key={term}>
              <button type="button" className={styles.term} onClick={() => search(term)}>
                {term}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Searchoverlay;