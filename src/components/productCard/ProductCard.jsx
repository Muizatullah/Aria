import { Link } from "react-router";
import { Heart, Star } from "lucide-react";
import { useShop } from "../../context/ShopContext.jsx";
import styles from "./productCard.module.css";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const liked = isWishlisted(product.id);

  const { id, slug, name, collection, price, oldPrice, rating, reviews, badges, colors, image } =
    product;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Link to={`/product/${slug}`} className={styles.imageLink} aria-label={name}>
          <img src={image} alt={name} loading="lazy" />
        </Link>

        {badges.length > 0 && (
          <div className={styles.badges}>
            {badges.map((badge) => (
              <span
                key={badge}
                className={`${styles.badge} ${
                  badge === "BESTSELLER" ? styles.badgeLight : styles.badgeAccent
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          className={`${styles.heart} ${liked ? styles.heartActive : ""}`}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          onClick={() => toggleWishlist(id)}
        >
          <Heart size={22} fill={liked ? "currentColor" : "none"} />
        </button>

        <button type="button" className={styles.addBtn} onClick={() => addToCart(id)}>
          Add to Cart
        </button>
      </div>

      <div className={styles.info}>
        <div>
          <span className={styles.collection}>{collection}</span>
          <h3 className={styles.name}>
            <Link to={`/product/${slug}`}>{name}</Link>
          </h3>
        </div>

        <div className={styles.prices}>
          <span className={styles.price}>${price}</span>
          {oldPrice && <span className={styles.oldPrice}>${oldPrice}</span>}
        </div>
      </div>

      <div className={styles.rating} aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />
        ))}
        <span className={styles.reviews}>({reviews})</span>
      </div>

      <div className={styles.swatches}>
        {colors.map((color) => (
          <span key={color} className={styles.swatch} style={{ background: color }} />
        ))}
      </div>
    </article>
  );
}

export default ProductCard;