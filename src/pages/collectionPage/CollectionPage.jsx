import { useMemo } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../../components/productCard/ProductCard";
import { products, shopCollection  } from "../../data.js";
import styles from "./collectionPage.module.css";

const FILTERS = [
  { id: "all", label: "All" },
  ...shopCollection.map((c) => ({ id: c.id, label: c.name })),
  { id: "limited", label: "Limited" },
];

function filterProducts(list, filter) {
  if (filter === "all") return list;
  if (filter === "limited") return list.filter((p) => p.badges.includes("LIMITED"));
  return list.filter((p) => p.collection.toLowerCase() === filter);
}

function CollectionsPage() {
  // Selection lives in the URL (?collection=ember) so it can be linked to and survives refresh
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("collection");
  const active = FILTERS.some((f) => f.id === requested) ? requested : "all";

  const visible = useMemo(() => filterProducts(products, active), [active]);

  const select = (id) => {
    setSearchParams(id === "all" ? {} : { collection: id });
  };

  return (
    <div className={styles.page}>
      <header className={`container ${styles.header}`}>
        <p className="eyebrow">Curated Worlds</p>
        <h1 className={styles.title}>Collections</h1>
      </header>

      {/* Collection cards — clicking one selects it */}
      <section className={`container ${styles.cards}`} aria-label="Collections">
        {shopCollection.map((collection) => {
          const selected = active === collection.id;
          return (
            <button
              key={collection.id}
              type="button"
              className={`${styles.card} ${selected ? styles.cardActive : ""}`}
              aria-pressed={selected}
              onClick={() => select(selected ? "all" : collection.id)}
            >
              <img src={collection.image} alt={collection.name} loading="lazy" />
              <span className={styles.shade} />
              <span className={styles.cardText}>
                <span className={styles.cardName}>{collection.name}</span>
                <span className={styles.cardTagline}>{collection.tagline}</span>
              </span>
            </button>
          );
        })}
      </section>

      {/* Filter chips */}
      <section className={`container ${styles.filters}`} aria-label="Filter products">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`${styles.chip} ${active === filter.id ? styles.chipActive : ""}`}
            aria-pressed={active === filter.id}
            onClick={() => select(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </section>

      {/* Products */}
      <section className={`container ${styles.products}`} aria-live="polite">
        {visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No pieces in this collection yet — check back soon.</p>
        )}
      </section>
    </div>
  );
}

export default CollectionsPage;