// import { Link } from "react-router";
// import { ShoppingBag, Minus, Plus, X } from "lucide-react";
// import { useShop } from "../../context/ShopContext.jsx";
// import { products } from "../../data.js";
// import styles from "./cart.module.css";

// const formatPrice = (value) => `$${value.toLocaleString("en-US")}`;

// function Cart() {
//   const { cart, changeQty, removeFromCart } = useShop();

//   // Join cart entries ({ id, qty }) with the full product data
//   const lines = cart
//     .map((item) => {
//       const product = products.find((p) => p.id === item.id);
//       return product ? { product, qty: item.qty } : null;
//     })
//     .filter(Boolean);

//   const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);

//   if (lines.length === 0) {
//     return (
//       <div className={styles.page}>
//         <div className={styles.empty}>
//           <ShoppingBag size={72} strokeWidth={1.25} className={styles.bagIcon} aria-hidden="true" />
//           <h1 className={styles.emptyTitle}>Your bag is empty</h1>
//           <p className={styles.emptyText}>Add some beautiful pieces to get started.</p>
//           <Link to="/shop" className={styles.cta}>
//             Shop Now
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.page}>
//       <header className={styles.header}>
//         <div className="container">
//           <p className="eyebrow">Your Selection</p>
//           <h1 className={styles.title}>Shopping Bag</h1>
//         </div>
//       </header>

//       <div className={`container ${styles.layout}`}>
//         <ul className={styles.list}>
//           {lines.map(({ product, qty }) => (
//             <li key={product.id} className={styles.item}>
//               <Link to={`/product/${product.slug}`} className={styles.thumb}>
//                 <img src={product.image} alt={product.name} />
//               </Link>

//               <div className={styles.info}>
//                 <p className={styles.collection}>{product.collection}</p>
//                 <Link to={`/product/${product.slug}`} className={styles.name}>
//                   {product.name}
//                 </Link>
//                 <p className={styles.unit}>{formatPrice(product.price)}</p>

//                 <div className={styles.qty} aria-label={`Quantity of ${product.name}`}>
//                   <button
//                     type="button"
//                     onClick={() => changeQty(product.id, -1)}
//                     aria-label="Decrease quantity"
//                   >
//                     <Minus size={16} />
//                   </button>
//                   <span>{qty}</span>
//                   <button
//                     type="button"
//                     onClick={() => changeQty(product.id, 1)}
//                     aria-label="Increase quantity"
//                   >
//                     <Plus size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className={styles.side}>
//                 <button
//                   type="button"
//                   className={styles.remove}
//                   onClick={() => removeFromCart(product.id)}
//                   aria-label={`Remove ${product.name}`}
//                 >
//                   <X size={20} />
//                 </button>
//                 <p className={styles.lineTotal}>{formatPrice(product.price * qty)}</p>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <aside className={styles.summary} aria-label="Order summary">
//           <h2 className={styles.summaryTitle}>Order Summary</h2>

//           <dl className={styles.rows}>
//             <div>
//               <dt>Subtotal</dt>
//               <dd>{formatPrice(subtotal)}</dd>
//             </div>
//             <div>
//               <dt>Shipping</dt>
//               <dd>Calculated at checkout</dd>
//             </div>
//           </dl>

//           <div className={styles.total}>
//             <span>Estimated total</span>
//             <span>{formatPrice(subtotal)}</span>
//           </div>

//           <Link to="/checkout" className={styles.checkout}>
//             Checkout
//           </Link>
//           <Link to="/shop" className={styles.continue}>
//             Continue shopping
//           </Link>
//         </aside>
//       </div>
//     </div>
//   );
// }

// export default Cart;


import { Link } from "react-router";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { useShop } from "../../context/ShopContext.jsx";
import { products } from "../../data.js";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./cart.module.css";


function Cart() {
  const { cart, changeQty, removeFromCart } = useShop();

  // Join cart entries ({ id, qty }) with the full product data
  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { product, qty: item.qty } : null;
    })
    .filter(Boolean);

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);

  if (lines.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <ShoppingBag size={72} strokeWidth={1.25} className={styles.bagIcon} aria-hidden="true" />
          <h1 className={styles.emptyTitle}>Your bag is empty</h1>
          <p className={styles.emptyText}>Add some beautiful pieces to get started.</p>
          <Link to="/shop" className={styles.cta}>
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <p className="eyebrow">Your Selection</p>
          <h1 className={styles.title}>Shopping Bag</h1>
        </div>
      </header>

      <div className={`container ${styles.layout}`}>
        <ul className={styles.list}>
          {lines.map(({ product, qty }) => (
            <li key={product.id} className={styles.item}>
              <Link to={`/product/${product.slug}`} className={styles.thumb}>
                <img src={product.image} alt={product.name} />
              </Link>

              <div className={styles.info}>
                <p className={styles.collection}>{product.collection}</p>
                <Link to={`/product/${product.slug}`} className={styles.name}>
                  {product.name}
                </Link>
                <p className={styles.unit}>{formatPrice(product.price)}</p>

                <div className={styles.qty} aria-label={`Quantity of ${product.name}`}>
                  <button
                    type="button"
                    onClick={() => changeQty(product.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    onClick={() => changeQty(product.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.side}>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFromCart(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  <X size={20} />
                </button>
                <p className={styles.lineTotal}>{formatPrice(product.price * qty)}</p>
              </div>
            </li>
          ))}
        </ul>

        <aside className={styles.summary} aria-label="Order summary">
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <dl className={styles.rows}>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>Calculated at checkout</dd>
            </div>
          </dl>

          <div className={styles.total}>
            <span>Estimated total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Link to="/checkout" className={styles.checkout}>
            Checkout
          </Link>
          <Link to="/shop" className={styles.continue}>
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;