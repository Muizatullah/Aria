import { useState } from "react";
import { useSearchParams } from "react-router";
import { Check, Package } from "lucide-react";
import { products } from "../../data.js";
import { STAGES, findOrder } from "../../data.js";
import styles from "./trackOrder.module.css";

const SAMPLE_ID = "ARIA-2026-8841";

function TrackOrder() {
  // The searched ID lives in the URL (?id=ARIA-2026-8841) so results can be linked to
  const [searchParams, setSearchParams] = useSearchParams();
  const searched = searchParams.has("id");
  const query = searchParams.get("id") || "";

  const [input, setInput] = useState(query);

  const order = searched ? findOrder(query) : null;

  const search = (value) => {
    setSearchParams({ id: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(input);
  };

  const useSample = () => {
    setInput(SAMPLE_ID);
    search(SAMPLE_ID);
  };

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <p className="eyebrow">Logistics</p>
        <h1 className={styles.title}>Track Your Order</h1>
        <p className={styles.subtitle}>
          Enter your order ID or tracking number to see your delivery status.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} role="search">
          <label htmlFor="track-input" className="sr-only">
            Order ID or tracking number
          </label>
          <input
            id="track-input"
            type="text"
            className={styles.input}
            placeholder="ARIA-2026-XXXX or DHL tracking number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={styles.button}>
            Track
          </button>
        </form>

        <p className={styles.try}>
          Try:{" "}
          <button type="button" onClick={useSample}>
            {SAMPLE_ID}
          </button>
        </p>
      </div>

      {searched && !order && (
        <p className={styles.notFound} role="status">
          No order found for “{query}”. Check your confirmation email and try again.
        </p>
      )}

      {order && (
        <section className={styles.result} aria-label={`Order ${order.id}`}>
          <header className={styles.resultHead}>
            <div>
              <p className={styles.label}>Order</p>
              <h2 className={styles.orderId}>{order.id}</h2>
            </div>
            <span className={styles.badge}>{STAGES[order.stage].label}</span>
          </header>

          <dl className={styles.facts}>
            <div>
              <dt>Carrier</dt>
              <dd>{order.carrier}</dd>
            </div>
            <div>
              <dt>Tracking number</dt>
              <dd>{order.trackingNumber}</dd>
            </div>
            <div>
              <dt>Delivering to</dt>
              <dd>{order.destination}</dd>
            </div>
            <div>
              <dt>Estimated delivery</dt>
              <dd>{order.estimatedDelivery}</dd>
            </div>
          </dl>

          <ol className={styles.timeline}>
            {STAGES.map((stage, index) => {
              const state =
                index < order.stage ? "done" : index === order.stage ? "current" : "todo";
              const entry = order.history[index];

              return (
                <li key={stage.key} className={`${styles.stage} ${styles[state]}`}>
                  <span className={styles.dot}>
                    {state === "done" ? <Check size={16} /> : null}
                  </span>
                  <div>
                    <p className={styles.stageName}>{stage.label}</p>
                    {entry && (
                      <p className={styles.stageNote}>
                        <span>{entry.date}</span> · {entry.note}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className={styles.items}>
            <p className={styles.label}>
              <Package size={16} aria-hidden="true" /> In this order
            </p>
            <ul>
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <li key={item.productId}>
                    <img src={product.image} alt="" />
                    <span>{product.name}</span>
                    <span className={styles.qty}>Qty {item.qty}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default TrackOrder;