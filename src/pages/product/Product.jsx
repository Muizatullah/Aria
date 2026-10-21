// import { useState } from "react";
// import { Link, Navigate, useParams } from "react-router";
// import { Heart, Minus, Plus, Star, Package, Check } from "lucide-react";
// import { products } from "../../data.js";
// import { useShop } from "../../context/ShopContext";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import { getExtras, colorNames, sampleReviews } from "./productextras";
// import styles from "./product.module.css";

// const TABS = ["Details", "Fits", "Care"];

// function Stars({ value, size = 16 }) {
//   return (
//     <span className={styles.stars} aria-label={`Rated ${value} out of 5`}>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <Star key={i} size={size} fill={i < value ? "currentColor" : "none"} />
//       ))}
//     </span>
//   );
// }

// function Product() {
//   const { slug } = useParams();
//   const product = products.find((p) => p.slug === slug);
//   const { addToCart, toggleWishlist, isWishlisted } = useShop();

//   const [color, setColor] = useState(0);
//   const [qty, setQty] = useState(1);
//   const [tab, setTab] = useState("Details");
//   const [added, setAdded] = useState(false);
//   const [showFits, setShowFits] = useState(false);

//   if (!product) return <Navigate to="/shop" replace />;

//   const extras = getExtras(product.slug);
//   const liked = isWishlisted(product.id);
//   const related = products.filter((p) => p.id !== product.id).slice(0, 2);

//   const handleAdd = () => {
//     addToCart(product.id, qty);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1800);
//   };

//   const rows = [
//     ["Dimensions", extras.dimensions],
//     ["Material", extras.material],
//     ["Collection", product.collection],
//   ];

//   return (
//     <main className={styles.page}>
//       <div className="container">
//         <nav className={styles.crumbs} aria-label="Breadcrumb">
//           <Link to="/">Home</Link> <span>/</span> <Link to="/shop">Shop</Link> <span>/</span>
//           <span className={styles.current}>{product.name}</span>
//         </nav>

//         <div className={styles.top}>
//           <div className={styles.media}>
//             <img src={product.image} alt={product.name} />
//           </div>

//           <div className={styles.info}>
//             <span className={styles.collection}>{product.collection} COLLECTION</span>
//             <h1 className={styles.title}>{product.name}</h1>

//             <div className={styles.ratingRow}>
//               <Stars value={product.rating} />
//               <span className={styles.reviewCount}>{product.reviews} reviews</span>
//             </div>

//             <div className={styles.prices}>
//               <span className={styles.price}>${product.price}</span>
//               {product.oldPrice && <span className={styles.oldPrice}>${product.oldPrice}</span>}
//             </div>

//             <p className={styles.desc}>{extras.description}</p>

//             <p className={styles.label}>Color</p>
//             <div className={styles.swatches}>
//               {product.colors.map((c, i) => (
//                 <button
//                   key={c}
//                   type="button"
//                   className={`${styles.swatch} ${i === color ? styles.swatchActive : ""}`}
//                   style={{ background: c }}
//                   onClick={() => setColor(i)}
//                   aria-label={colorNames[c] || c}
//                   aria-pressed={i === color}
//                 />
//               ))}
//               <span className={styles.colorName}>{colorNames[product.colors[color]]}</span>
//             </div>

//             <p className={styles.label}>Quantity</p>
//             <div className={styles.qty}>
//               <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
//                 <Minus size={18} />
//               </button>
//               <span>{qty}</span>
//               <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
//                 <Plus size={18} />
//               </button>
//             </div>

//             <div className={styles.actions}>
//               <button type="button" className={styles.addBtn} onClick={handleAdd}>
//                 {added ? (<><Check size={18} /> ADDED TO CART</>) : "ADD TO CART"}
//               </button>
//               <button
//                 type="button"
//                 className={`${styles.heartBtn} ${liked ? styles.heartActive : ""}`}
//                 onClick={() => toggleWishlist(product.id)}
//                 aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
//                 aria-pressed={liked}
//               >
//                 <Heart size={22} fill={liked ? "currentColor" : "none"} />
//               </button>
//             </div>

//             <button type="button" className={styles.fitsBtn} onClick={() => setShowFits((s) => !s)} aria-expanded={showFits}>
//               <Package size={18} /> WHAT FITS INSIDE?
//             </button>
//             {showFits && (
//               <ul className={styles.fitsList}>
//                 {extras.fits.map((f) => (<li key={f}>{f}</li>))}
//               </ul>
//             )}

//             <div className={styles.tabs} role="tablist">
//               {TABS.map((t) => (
//                 <button
//                   key={t}
//                   type="button"
//                   role="tab"
//                   aria-selected={tab === t}
//                   className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
//                   onClick={() => setTab(t)}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>

//             <div className={styles.panel}>
//               {tab === "Details" &&
//                 rows.map(([k, v]) => (
//                   <div key={k} className={styles.row}>
//                     <span>{k}</span>
//                     <span>{v}</span>
//                   </div>
//                 ))}
//               {tab === "Fits" && (
//                 <ul className={styles.bullets}>
//                   {extras.fits.map((f) => (<li key={f}>{f}</li>))}
//                 </ul>
//               )}
//               {tab === "Care" && (
//                 <ul className={styles.bullets}>
//                   {extras.care.map((c) => (<li key={c}>{c}</li>))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>

//         <section className={styles.reviews}>
//           <h2 className={styles.heading}>Customer Reviews</h2>
//           <div className={styles.reviewGrid}>
//             {sampleReviews.map((r) => (
//               <article key={r.name} className={styles.review}>
//                 <header>
//                   <span className={styles.avatar}>{r.name[0]}</span>
//                   <div>
//                     <p className={styles.reviewer}>{r.name}</p>
//                     <p className={styles.date}>{r.date}</p>
//                   </div>
//                   <Stars value={r.rating} size={15} />
//                 </header>
//                 <p className={styles.reviewText}>"{r.text}"</p>
//                 <p className={styles.verified}>✓ VERIFIED PURCHASE</p>
//               </article>
//             ))}
//           </div>
//         </section>

//         <section className={styles.related}>
//           <h2 className={styles.heading}>You May Also Like</h2>
//           <div className={styles.relatedGrid}>
//             {related.map((p) => (<ProductCard key={p.id} product={p} />))}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default Product;


import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { Heart, Minus, Plus, Star, Package, Check } from "lucide-react";
import { products } from "../../data.js";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import { getExtras, colorNames, sampleReviews } from "./productExtras";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./product.module.css";

const TABS = ["Details", "Fits", "Care"];

function Stars({ value, size = 16 }) {
  return (
    <span className={styles.stars} aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < value ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

function Product() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const [color, setColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Details");
  const [added, setAdded] = useState(false);
  const [showFits, setShowFits] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const extras = getExtras(product.slug);
  const liked = isWishlisted(product.id);
  const related = products.filter((p) => p.id !== product.id).slice(0, 2);

  const handleAdd = () => {
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const rows = [
    ["Dimensions", extras.dimensions],
    ["Material", extras.material],
    ["Collection", product.collection],
  ];

  return (
    <main className={styles.page}>
      <div className="container">
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/shop">Shop</Link> <span>/</span>
          <span className={styles.current}>{product.name}</span>
        </nav>

        <div className={styles.top}>
          <div className={styles.media}>
            <img src={product.image} alt={product.name} />
          </div>

          <div className={styles.info}>
            <span className={styles.collection}>{product.collection} COLLECTION</span>
            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <Stars value={product.rating} />
              <span className={styles.reviewCount}>{product.reviews} reviews</span>
            </div>

            <div className={styles.prices}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.oldPrice && <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>}
            </div>

            <p className={styles.desc}>{extras.description}</p>

            <p className={styles.label}>Color</p>
            <div className={styles.swatches}>
              {product.colors.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.swatch} ${i === color ? styles.swatchActive : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(i)}
                  aria-label={colorNames[c] || c}
                  aria-pressed={i === color}
                />
              ))}
              <span className={styles.colorName}>{colorNames[product.colors[color]]}</span>
            </div>

            <p className={styles.label}>Quantity</p>
            <div className={styles.qty}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                <Minus size={18} />
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                <Plus size={18} />
              </button>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.addBtn} onClick={handleAdd}>
                {added ? (<><Check size={18} /> ADDED TO CART</>) : "ADD TO CART"}
              </button>
              <button
                type="button"
                className={`${styles.heartBtn} ${liked ? styles.heartActive : ""}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={liked}
              >
                <Heart size={22} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>

            <button type="button" className={styles.fitsBtn} onClick={() => setShowFits((s) => !s)} aria-expanded={showFits}>
              <Package size={18} /> WHAT FITS INSIDE?
            </button>
            {showFits && (
              <ul className={styles.fitsList}>
                {extras.fits.map((f) => (<li key={f}>{f}</li>))}
              </ul>
            )}

            <div className={styles.tabs} role="tablist">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className={styles.panel}>
              {tab === "Details" &&
                rows.map(([k, v]) => (
                  <div key={k} className={styles.row}>
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              {tab === "Fits" && (
                <ul className={styles.bullets}>
                  {extras.fits.map((f) => (<li key={f}>{f}</li>))}
                </ul>
              )}
              {tab === "Care" && (
                <ul className={styles.bullets}>
                  {extras.care.map((c) => (<li key={c}>{c}</li>))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <section className={styles.reviews}>
          <h2 className={styles.heading}>Customer Reviews</h2>
          <div className={styles.reviewGrid}>
            {sampleReviews.map((r) => (
              <article key={r.name} className={styles.review}>
                <header>
                  <span className={styles.avatar}>{r.name[0]}</span>
                  <div>
                    <p className={styles.reviewer}>{r.name}</p>
                    <p className={styles.date}>{r.date}</p>
                  </div>
                  <Stars value={r.rating} size={15} />
                </header>
                <p className={styles.reviewText}>"{r.text}"</p>
                <p className={styles.verified}>✓ VERIFIED PURCHASE</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.related}>
          <h2 className={styles.heading}>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Product;