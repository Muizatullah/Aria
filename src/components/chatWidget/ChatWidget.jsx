import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { MessageSquare, Star, Send, X } from "lucide-react";
import { getReply, whyFor } from "./Stylist.js";
import styles from "./chatWidget.module.css";

const GREETING = {
  id: "greeting",
  role: "assistant",
  text: "Hi! I'm ARIA's style assistant. Tell me what you're looking for — an occasion, a need, a vibe — and I'll find your perfect bag.",
  products: [],
};

const SUGGESTIONS = ["I need a work bag", "Something for evenings"];

const formatPrice = (value) => `$${value.toLocaleString("en-US")}`;

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Keep the newest message in view
  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, thinking, open]);

  // Focus the field when the panel opens; close on Escape
  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Clear the pending "typing" timer if the widget is removed
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (text) => {
    const value = text.trim();
    if (!value || thinking) return;

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: value }]);
    setDraft("");
    setThinking(true);

    // Short pause so it feels like the assistant is thinking
    timerRef.current = setTimeout(() => {
      const reply = getReply(value);
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", ...reply }]);
      setThinking(false);
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(draft);
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      {open && (
        <section className={styles.panel} role="dialog" aria-label="ARIA style assistant">
          <header className={styles.header}>
            <span className={styles.avatar}>
              <Star size={22} />
            </span>
            <div className={styles.headText}>
              <p className={styles.name}>ARIA Assistant</p>
              <p className={styles.role}>AI Style Guide</p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={22} />
            </button>
          </header>

          <div className={styles.messages} ref={listRef} aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`${styles.row} ${styles[message.role]}`}>
                <p className={styles.bubble}>{message.text}</p>

                {message.products?.length > 0 && (
                  <ul className={styles.products}>
                    {message.products.map((product) => (
                      <li key={product.id}>
                        <Link
                          // TODO: change to `/product/${product.slug}` once the product page exists
                          to={`/shop?q=${encodeURIComponent(product.name)}`}
                          className={styles.product}
                          onClick={() => setOpen(false)}
                        >
                          <img src={product.image} alt="" />
                          <span className={styles.productInfo}>
                            <span className={styles.productName}>{product.name}</span>
                            <span className={styles.productMeta}>
                              {product.collection} · {formatPrice(product.price)}
                            </span>
                            <span className={styles.productWhy}>{whyFor(product)}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {thinking && (
              <div className={`${styles.row} ${styles.assistant}`}>
                <p className={`${styles.bubble} ${styles.typing}`} aria-label="Typing">
                  <span />
                  <span />
                  <span />
                </p>
              </div>
            )}

            {showSuggestions && !thinking && (
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((text) => (
                  <button key={text} type="button" onClick={() => send(text)}>
                    {text}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="chat-input" className="sr-only">
              Describe what you need
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Describe what you need..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.send}
              disabled={!draft.trim() || thinking}
              aria-label="Send message"
            >
              <Send size={22} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close style assistant" : "Open style assistant"}
        aria-expanded={open}
      >
        {open ? <X size={30} /> : <MessageSquare size={30} />}
      </button>
    </>
  );
}

export default ChatWidget;