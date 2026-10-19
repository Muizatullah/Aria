import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProductCard from "../productCard/ProductCard";
import { products } from "../../data.js";
import styles from "./newArrivals.module.css";

function NewArrivals() {
  const featured = products.filter((p) => p.featured);

  return (
    <section id="featured" className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 className={styles.title}>New Arrivals</h2>
          </div>

          <Link to="/shop" className={styles.viewAll}>
            View all <ArrowRight size={20} />
          </Link>
        </header>

        <div className={styles.grid}>
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;