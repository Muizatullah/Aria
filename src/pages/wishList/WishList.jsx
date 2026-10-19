import { Link } from "react-router";
import { Heart } from "lucide-react";
import ProductCard from "../../components/productCard/ProductCard";
import { useShop } from "../../context/ShopContext.jsx";
import { products } from "../../data.js";
import styles from "./wishList.module.css";

function WishList() {
  const { wishlist } = useShop();

  // wishlist holds product ids; keep the order the person saved them in
  const saved = wishlist
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <p className="eyebrow">Saved</p>
          <h1 className={styles.title}>Wishlist</h1>
          {saved.length > 0 && (
            <p className={styles.count}>
              {saved.length} {saved.length === 1 ? "piece" : "pieces"} saved
            </p>
          )}
        </div>
      </header>

      <section className={`container ${styles.content}`}>
        {saved.length > 0 ? (
          <div className={styles.grid}>
            {saved.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Heart size={64} strokeWidth={1.5} className={styles.heart} aria-hidden="true" />
            <p className={styles.message}>
              Nothing saved yet. Start exploring and save pieces you love.
            </p>
            <Link to="/shop" className={styles.cta}>
              Shop Now
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default WishList;