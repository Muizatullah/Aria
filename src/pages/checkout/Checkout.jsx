// import { useState } from "react";
// import { Link, Navigate } from "react-router";
// import { Check } from "lucide-react";
// import { useShop } from "../../context/ShopContext.jsx";
// import { products } from "../../data.js";
// import styles from "./checkout.module.css";

// const STEPS = ["Info", "Shipping", "Payment"];

// // Placeholder delivery options: change names, prices and timings to suit you
// const SHIPPING_OPTIONS = [
//   { id: "standard", label: "Standard Delivery", detail: "3–5 business days", price: 0 },
//   { id: "express", label: "Express Delivery", detail: "1–2 business days", price: 25 },
// ];

// const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const formatPrice = (value) =>
//   `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// const makeOrderNumber = () => `ARIA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

// /* ---------- small pieces ---------- */

// function Stepper({ current }) {
//   return (
//     <ol className={styles.stepper} aria-label="Checkout progress">
//       {STEPS.map((label, index) => {
//         const number = index + 1;
//         const state = number < current ? "done" : number === current ? "active" : "todo";

//         return (
//           <li key={label} className={`${styles.step} ${styles[state]}`}>
//             <span className={styles.stepCircle}>
//               {state === "done" ? <Check size={18} /> : number}
//             </span>
//             <span className={styles.stepLabel}>{label}</span>
//             {number < STEPS.length && <span className={styles.stepLine} aria-hidden="true" />}
//           </li>
//         );
//       })}
//     </ol>
//   );
// }

// function Field({ id, name, label, error, optional, as = "input", ...props }) {
//   const Tag = as;
//   return (
//     <div className={styles.field}>
//       <label htmlFor={id} className="sr-only">
//         {label}
//       </label>
//       <Tag
//         id={id}
//         name={name}
//         className={`${styles.input} ${as === "textarea" ? styles.textarea : ""}`}
//         placeholder={optional ? `${label} (optional)` : label}
//         aria-invalid={Boolean(error)}
//         {...props}
//       />
//       {error && <p className={styles.error}>{error}</p>}
//     </div>
//   );
// }

// function Summary({ lines, subtotal, shipping }) {
//   return (
//     <aside className={styles.summary} aria-label="Order summary">
//       <h2 className={styles.summaryTitle}>Order Summary</h2>

//       <ul className={styles.items}>
//         {lines.map(({ product, qty }) => (
//           <li key={product.id} className={styles.item}>
//             <img src={product.image} alt="" className={styles.itemImg} />
//             <div className={styles.itemInfo}>
//               <p className={styles.itemName}>{product.name}</p>
//               <p className={styles.itemQty}>Qty {qty}</p>
//             </div>
//             <p className={styles.itemPrice}>{formatPrice(product.price * qty)}</p>
//           </li>
//         ))}
//       </ul>

//       <dl className={styles.rows}>
//         <div>
//           <dt>Subtotal</dt>
//           <dd>{formatPrice(subtotal)}</dd>
//         </div>
//         <div>
//           <dt>Shipping</dt>
//           <dd>{shipping === 0 ? "FREE" : formatPrice(shipping)}</dd>
//         </div>
//       </dl>

//       <div className={styles.total}>
//         <span>Total</span>
//         <span>{formatPrice(subtotal + shipping)}</span>
//       </div>
//     </aside>
//   );
// }

// /* ---------- page ---------- */

// function Checkout() {
//   const { cart, clearCart } = useShop();

//   const [step, setStep] = useState(1);
//   const [info, setInfo] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     note: "",
//   });
//   const [shippingId, setShippingId] = useState("standard");
//   const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
//   const [errors, setErrors] = useState({});
//   const [order, setOrder] = useState(null); // set once the order is placed

//   const lines = cart
//     .map((item) => {
//       const product = products.find((p) => p.id === item.id);
//       return product ? { product, qty: item.qty } : null;
//     })
//     .filter(Boolean);

//   // Nothing to check out (and no order just placed): back to the cart
//   if (lines.length === 0 && !order) {
//     return <Navigate to="/cart" replace />;
//   }

//   const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
//   const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === shippingId);
//   const shippingCost = shippingOption.price;

//   /* ----- handlers ----- */

//   const clearError = (name) => {
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleInfo = (e) => {
//     const { name, value } = e.target;
//     setInfo((prev) => ({ ...prev, [name]: value }));
//     clearError(name);
//   };

//   const handleCard = (e) => {
//     const { name } = e.target;
//     let { value } = e.target;

//     if (name === "number") {
//       value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
//     }
//     if (name === "expiry") {
//       const digits = value.replace(/\D/g, "").slice(0, 4);
//       value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
//     }
//     if (name === "cvv") {
//       value = value.replace(/\D/g, "").slice(0, 4);
//     }

//     setCard((prev) => ({ ...prev, [name]: value }));
//     clearError(name);
//   };

//   const validateInfo = () => {
//     const next = {};
//     if (!info.fullName.trim()) next.fullName = "Please enter your full name.";
//     if (!EMAIL_PATTERN.test(info.email.trim())) next.email = "Please enter a valid email address.";
//     if (info.phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a valid phone number.";
//     if (!info.address.trim()) next.address = "Please enter your delivery address.";
//     if (!info.city.trim()) next.city = "Please enter your city.";
//     if (!info.state.trim()) next.state = "Please enter your state.";
//     return next;
//   };

//   const validateCard = () => {
//     const next = {};
//     if (card.number.replace(/\s/g, "").length < 13) next.number = "Please enter a valid card number.";
//     if (!card.name.trim()) next.name = "Please enter the name on the card.";
//     if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) next.expiry = "Use MM/YY.";
//     if (card.cvv.length < 3) next.cvv = "Enter the 3 or 4 digit code.";
//     return next;
//   };

//   const goTo = (next) => {
//     setStep(next);
//     setErrors({});
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const submitInfo = (e) => {
//     e.preventDefault();
//     const found = validateInfo();
//     setErrors(found);
//     if (Object.keys(found).length === 0) goTo(2);
//   };

//   const submitShipping = (e) => {
//     e.preventDefault();
//     goTo(3);
//   };

//   const submitPayment = (e) => {
//     e.preventDefault();
//     const found = validateCard();
//     setErrors(found);
//     if (Object.keys(found).length > 0) return;

//     // TODO: send the order to your backend and take payment through a hosted
//     // provider (e.g. Paystack or Flutterwave). Never store raw card details.
//     setOrder({
//       number: makeOrderNumber(),
//       email: info.email.trim(),
//       total: subtotal + shippingCost,
//     });
//     clearCart();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   /* ----- order placed ----- */

//   if (order) {
//     return (
//       <div className={styles.page}>
//         <div className={styles.done}>
//           <span className={styles.doneIcon}>
//             <Check size={36} />
//           </span>
//           <p className="eyebrow">Order Confirmed</p>
//           <h1 className={styles.doneTitle}>Thank you, {info.fullName.split(" ")[0]}.</h1>
//           <p className={styles.doneText}>
//             Your order <strong>{order.number}</strong> is confirmed. A receipt will be sent to{" "}
//             {order.email}.
//           </p>
//           <p className={styles.doneTotal}>Total paid: {formatPrice(order.total)}</p>
//           <Link to="/shop" className={styles.primary}>
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   /* ----- steps ----- */

//   return (
//     <div className={styles.page}>
//       <div className="container">
//         <Stepper current={step} />

//         <div className={styles.layout}>
//           <div className={styles.main}>
//             {step === 1 && (
//               <form onSubmit={submitInfo} noValidate>
//                 <h1 className={styles.title}>Contact &amp; Shipping Info</h1>
//                 <div className={styles.fields}>
//                   <Field id="co-name" name="fullName" label="Full Name" value={info.fullName}
//                     onChange={handleInfo} error={errors.fullName} autoComplete="name" />
//                   <Field id="co-email" name="email" type="email" label="Email Address"
//                     value={info.email} onChange={handleInfo} error={errors.email} autoComplete="email" />
//                   <Field id="co-phone" name="phone" type="tel" label="Phone Number"
//                     value={info.phone} onChange={handleInfo} error={errors.phone} autoComplete="tel" />
//                   <Field id="co-address" name="address" label="Delivery Address"
//                     value={info.address} onChange={handleInfo} error={errors.address}
//                     autoComplete="street-address" />
//                   <div className={styles.twoCol}>
//                     <Field id="co-city" name="city" label="City" value={info.city}
//                       onChange={handleInfo} error={errors.city} autoComplete="address-level2" />
//                     <Field id="co-state" name="state" label="State" value={info.state}
//                       onChange={handleInfo} error={errors.state} autoComplete="address-level1" />
//                   </div>
//                   <Field id="co-note" name="note" as="textarea" rows={4} optional
//                     label="Delivery Note" value={info.note} onChange={handleInfo} />
//                 </div>
//                 <button type="submit" className={styles.primary}>
//                   Continue to Shipping
//                 </button>
//               </form>
//             )}

//             {step === 2 && (
//               <form onSubmit={submitShipping}>
//                 <h1 className={styles.title}>Shipping Method</h1>

//                 <p className={styles.deliverTo}>
//                   Delivering to <strong>{info.address}, {info.city}, {info.state}</strong>
//                   <button type="button" onClick={() => goTo(1)}>Edit</button>
//                 </p>

//                 <div className={styles.options} role="radiogroup" aria-label="Shipping method">
//                   {SHIPPING_OPTIONS.map((option) => (
//                     <label
//                       key={option.id}
//                       className={`${styles.option} ${shippingId === option.id ? styles.optionOn : ""}`}
//                     >
//                       <input
//                         type="radio"
//                         name="shipping"
//                         value={option.id}
//                         checked={shippingId === option.id}
//                         onChange={() => setShippingId(option.id)}
//                       />
//                       <span className={styles.optionText}>
//                         <span className={styles.optionLabel}>{option.label}</span>
//                         <span className={styles.optionDetail}>{option.detail}</span>
//                       </span>
//                       <span className={styles.optionPrice}>
//                         {option.price === 0 ? "FREE" : formatPrice(option.price)}
//                       </span>
//                     </label>
//                   ))}
//                 </div>

//                 <div className={styles.actions}>
//                   <button type="button" className={styles.back} onClick={() => goTo(1)}>
//                     Back
//                   </button>
//                   <button type="submit" className={styles.primary}>
//                     Continue to Payment
//                   </button>
//                 </div>
//               </form>
//             )}

//             {step === 3 && (
//               <form onSubmit={submitPayment} noValidate>
//                 <h1 className={styles.title}>Payment</h1>
//                 <div className={styles.fields}>
//                   <Field id="co-card" name="number" label="Card Number" inputMode="numeric"
//                     value={card.number} onChange={handleCard} error={errors.number}
//                     autoComplete="cc-number" />
//                   <Field id="co-card-name" name="name" label="Name on Card" value={card.name}
//                     onChange={handleCard} error={errors.name} autoComplete="cc-name" />
//                   <div className={styles.twoCol}>
//                     <Field id="co-expiry" name="expiry" label="Expiry (MM/YY)" inputMode="numeric"
//                       value={card.expiry} onChange={handleCard} error={errors.expiry}
//                       autoComplete="cc-exp" />
//                     <Field id="co-cvv" name="cvv" label="CVV" inputMode="numeric"
//                       value={card.cvv} onChange={handleCard} error={errors.cvv}
//                       autoComplete="cc-csc" />
//                   </div>
//                 </div>

//                 <div className={styles.actions}>
//                   <button type="button" className={styles.back} onClick={() => goTo(2)}>
//                     Back
//                   </button>
//                   <button type="submit" className={styles.primary}>
//                     Place Order · {formatPrice(subtotal + shippingCost)}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>

//           <Summary lines={lines} subtotal={subtotal} shipping={shippingCost} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;


// import { useState } from "react";
// import { Link, Navigate } from "react-router";
// import { Check } from "lucide-react";
// import { useShop } from "../../context/ShopContext.jsx";
// import { products } from "../../data.js";
// import { openPaystack } from "./paystack.js";
// import { formatPrice } from "../../utils/formatPrice";
// import styles from "./checkout.module.css";

// const STEPS = ["Info", "Shipping", "Payment"];

// // Placeholder delivery options: change names, prices and timings to suit you
// const SHIPPING_OPTIONS = [
//   { id: "standard", label: "Standard Delivery", detail: "3–5 business days", price: 0 },
//   { id: "express", label: "Express Delivery", detail: "1–2 business days", price: 37500 },
// ];

// const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// const makeOrderNumber = () => `ARIA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

// /* ---------- small pieces ---------- */

// function Stepper({ current }) {
//   return (
//     <ol className={styles.stepper} aria-label="Checkout progress">
//       {STEPS.map((label, index) => {
//         const number = index + 1;
//         const state = number < current ? "done" : number === current ? "active" : "todo";

//         return (
//           <li key={label} className={`${styles.step} ${styles[state]}`}>
//             <span className={styles.stepCircle}>
//               {state === "done" ? <Check size={18} /> : number}
//             </span>
//             <span className={styles.stepLabel}>{label}</span>
//             {number < STEPS.length && <span className={styles.stepLine} aria-hidden="true" />}
//           </li>
//         );
//       })}
//     </ol>
//   );
// }

// function Field({ id, name, label, error, optional, as = "input", ...props }) {
//   const Tag = as;
//   return (
//     <div className={styles.field}>
//       <label htmlFor={id} className="sr-only">
//         {label}
//       </label>
//       <Tag
//         id={id}
//         name={name}
//         className={`${styles.input} ${as === "textarea" ? styles.textarea : ""}`}
//         placeholder={optional ? `${label} (optional)` : label}
//         aria-invalid={Boolean(error)}
//         {...props}
//       />
//       {error && <p className={styles.error}>{error}</p>}
//     </div>
//   );
// }

// function Summary({ lines, subtotal, shipping }) {
//   return (
//     <aside className={styles.summary} aria-label="Order summary">
//       <h2 className={styles.summaryTitle}>Order Summary</h2>

//       <ul className={styles.items}>
//         {lines.map(({ product, qty }) => (
//           <li key={product.id} className={styles.item}>
//             <img src={product.image} alt="" className={styles.itemImg} />
//             <div className={styles.itemInfo}>
//               <p className={styles.itemName}>{product.name}</p>
//               <p className={styles.itemQty}>Qty {qty}</p>
//             </div>
//             <p className={styles.itemPrice}>{formatPrice(product.price * qty)}</p>
//           </li>
//         ))}
//       </ul>

//       <dl className={styles.rows}>
//         <div>
//           <dt>Subtotal</dt>
//           <dd>{formatPrice(subtotal)}</dd>
//         </div>
//         <div>
//           <dt>Shipping</dt>
//           <dd>{shipping === 0 ? "FREE" : formatPrice(shipping)}</dd>
//         </div>
//       </dl>

//       <div className={styles.total}>
//         <span>Total</span>
//         <span>{formatPrice(subtotal + shipping)}</span>
//       </div>
//     </aside>
//   );
// }

// /* ---------- page ---------- */

// function Checkout() {
//   const { cart, clearCart } = useShop();

//   const [step, setStep] = useState(1);
//   const [info, setInfo] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     note: "",
//   });
//   const [shippingId, setShippingId] = useState("standard");
//   const [paying, setPaying] = useState(false);
//   const [payError, setPayError] = useState("");
//   const [errors, setErrors] = useState({});
//   const [order, setOrder] = useState(null); // set once the order is placed

//   const lines = cart
//     .map((item) => {
//       const product = products.find((p) => p.id === item.id);
//       return product ? { product, qty: item.qty } : null;
//     })
//     .filter(Boolean);

//   // Nothing to check out (and no order just placed): back to the cart
//   if (lines.length === 0 && !order) {
//     return <Navigate to="/cart" replace />;
//   }

//   const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
//   const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === shippingId);
//   const shippingCost = shippingOption.price;

//   /* ----- handlers ----- */

//   const clearError = (name) => {
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleInfo = (e) => {
//     const { name, value } = e.target;
//     setInfo((prev) => ({ ...prev, [name]: value }));
//     clearError(name);
//   };

//   const validateInfo = () => {
//     const next = {};
//     if (!info.fullName.trim()) next.fullName = "Please enter your full name.";
//     if (!EMAIL_PATTERN.test(info.email.trim())) next.email = "Please enter a valid email address.";
//     if (info.phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a valid phone number.";
//     if (!info.address.trim()) next.address = "Please enter your delivery address.";
//     if (!info.city.trim()) next.city = "Please enter your city.";
//     if (!info.state.trim()) next.state = "Please enter your state.";
//     return next;
//   };

//   const goTo = (next) => {
//     setStep(next);
//     setErrors({});
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const submitInfo = (e) => {
//     e.preventDefault();
//     const found = validateInfo();
//     setErrors(found);
//     if (Object.keys(found).length === 0) goTo(2);
//   };

//   const submitShipping = (e) => {
//     e.preventDefault();
//     goTo(3);
//   };

//   const total = subtotal + shippingCost;

//   const handlePay = async () => {
//     setPayError("");
//     setPaying(true);

//     const orderNumber = makeOrderNumber();

//     try {
//       await openPaystack({
//         email: info.email.trim(),
//         amountNaira: total,
//         // Paystack needs a unique reference for every attempt
//         reference: `${orderNumber}-${Date.now()}`,
//         customerName: info.fullName.trim(),
//         phone: info.phone.trim(),
//         onSuccess: (response) => {
//           // TODO: send response.reference (plus the order details) to your
//           // backend and VERIFY the payment with Paystack before shipping.
//           setOrder({
//             number: orderNumber,
//             email: info.email.trim(),
//             total,
//             reference: response.reference,
//           });
//           clearCart();
//           setPaying(false);
//           window.scrollTo({ top: 0, behavior: "smooth" });
//         },
//         onClose: () => setPaying(false), // customer closed the popup
//       });
//     } catch (err) {
//       setPayError(err.message);
//       setPaying(false);
//     }
//   };

//   /* ----- order placed ----- */

//   if (order) {
//     return (
//       <div className={styles.page}>
//         <div className={styles.done}>
//           <span className={styles.doneIcon}>
//             <Check size={36} />
//           </span>
//           <p className="eyebrow">Order Confirmed</p>
//           <h1 className={styles.doneTitle}>Thank you, {info.fullName.split(" ")[0]}.</h1>
//           <p className={styles.doneText}>
//             Your order <strong>{order.number}</strong> is confirmed. A receipt will be sent to{" "}
//             {order.email}.
//           </p>
//           <p className={styles.doneTotal}>Total paid: {formatPrice(order.total)}</p>
//           <Link to="/shop" className={styles.primary}>
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   /* ----- steps ----- */

//   return (
//     <div className={styles.page}>
//       <div className="container">
//         <Stepper current={step} />

//         <div className={styles.layout}>
//           <div className={styles.main}>
//             {step === 1 && (
//               <form onSubmit={submitInfo} noValidate>
//                 <h1 className={styles.title}>Contact &amp; Shipping Info</h1>
//                 <div className={styles.fields}>
//                   <Field id="co-name" name="fullName" label="Full Name" value={info.fullName}
//                     onChange={handleInfo} error={errors.fullName} autoComplete="name" />
//                   <Field id="co-email" name="email" type="email" label="Email Address"
//                     value={info.email} onChange={handleInfo} error={errors.email} autoComplete="email" />
//                   <Field id="co-phone" name="phone" type="tel" label="Phone Number"
//                     value={info.phone} onChange={handleInfo} error={errors.phone} autoComplete="tel" />
//                   <Field id="co-address" name="address" label="Delivery Address"
//                     value={info.address} onChange={handleInfo} error={errors.address}
//                     autoComplete="street-address" />
//                   <div className={styles.twoCol}>
//                     <Field id="co-city" name="city" label="City" value={info.city}
//                       onChange={handleInfo} error={errors.city} autoComplete="address-level2" />
//                     <Field id="co-state" name="state" label="State" value={info.state}
//                       onChange={handleInfo} error={errors.state} autoComplete="address-level1" />
//                   </div>
//                   <Field id="co-note" name="note" as="textarea" rows={4} optional
//                     label="Delivery Note" value={info.note} onChange={handleInfo} />
//                 </div>
//                 <button type="submit" className={styles.primary}>
//                   Continue to Shipping
//                 </button>
//               </form>
//             )}

//             {step === 2 && (
//               <form onSubmit={submitShipping}>
//                 <h1 className={styles.title}>Shipping Method</h1>

//                 <p className={styles.deliverTo}>
//                   Delivering to <strong>{info.address}, {info.city}, {info.state}</strong>
//                   <button type="button" onClick={() => goTo(1)}>Edit</button>
//                 </p>

//                 <div className={styles.options} role="radiogroup" aria-label="Shipping method">
//                   {SHIPPING_OPTIONS.map((option) => (
//                     <label
//                       key={option.id}
//                       className={`${styles.option} ${shippingId === option.id ? styles.optionOn : ""}`}
//                     >
//                       <input
//                         type="radio"
//                         name="shipping"
//                         value={option.id}
//                         checked={shippingId === option.id}
//                         onChange={() => setShippingId(option.id)}
//                       />
//                       <span className={styles.optionText}>
//                         <span className={styles.optionLabel}>{option.label}</span>
//                         <span className={styles.optionDetail}>{option.detail}</span>
//                       </span>
//                       <span className={styles.optionPrice}>
//                         {option.price === 0 ? "FREE" : formatPrice(option.price)}
//                       </span>
//                     </label>
//                   ))}
//                 </div>

//                 <div className={styles.actions}>
//                   <button type="button" className={styles.back} onClick={() => goTo(1)}>
//                     Back
//                   </button>
//                   <button type="submit" className={styles.primary}>
//                     Continue to Payment
//                   </button>
//                 </div>
//               </form>
//             )}

//             {step === 3 && (
//               <div>
//                 <h1 className={styles.title}>Payment</h1>

//                 <div className={styles.payBox}>
//                   <p className={styles.payLead}>
//                     You'll pay securely through Paystack. Choose card, bank transfer or USSD
//                     in the window that opens.
//                   </p>
//                   <p className={styles.payAmount}>
//                     {formatPrice(total)}
//                   </p>
//                   <p className={styles.payNote}>
//                     Charged in naira (NGN). Your card details never touch our website.
//                   </p>
//                 </div>

//                 {payError && (
//                   <p className={styles.error} role="alert">
//                     {payError}
//                   </p>
//                 )}

//                 <div className={styles.actions}>
//                   <button type="button" className={styles.back} onClick={() => goTo(2)} disabled={paying}>
//                     Back
//                   </button>
//                   <button
//                     type="button"
//                     className={styles.primary}
//                     onClick={handlePay}
//                     disabled={paying}
//                   >
//                     {paying ? "Opening Paystack…" : `Pay ${formatPrice(total)}`}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Summary lines={lines} subtotal={subtotal} shipping={shippingCost} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;

import { useState } from "react";
import { Link, Navigate } from "react-router";
import { Check } from "lucide-react";
import { useShop } from "../../context/ShopContext.jsx";
import { products } from "../../data.js";
import { openPaystack } from "./paystack.js";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./checkout.module.css";

const STEPS = ["Info", "Shipping", "Payment"];

// Delivery prices follow the Shipping & Returns page. Change them here (₦).
const FREE_SHIPPING_OVER = 375000;
const STANDARD_FEE = 27000;

const getShippingOptions = (subtotal) => [
  {
    id: "standard",
    label: "Standard Delivery",
    detail: "5–8 business days",
    price: subtotal >= FREE_SHIPPING_OVER ? 0 : STANDARD_FEE,
  },
  { id: "express", label: "Express Delivery", detail: "2–3 business days", price: 37500 },
  { id: "overnight", label: "Overnight", detail: "Next business day · order before 2PM WAT", price: 67500 },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const makeOrderNumber = () => `ARIA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

/* ---------- small pieces ---------- */

function Stepper({ current }) {
  return (
    <ol className={styles.stepper} aria-label="Checkout progress">
      {STEPS.map((label, index) => {
        const number = index + 1;
        const state = number < current ? "done" : number === current ? "active" : "todo";

        return (
          <li key={label} className={`${styles.step} ${styles[state]}`}>
            <span className={styles.stepCircle}>
              {state === "done" ? <Check size={18} /> : number}
            </span>
            <span className={styles.stepLabel}>{label}</span>
            {number < STEPS.length && <span className={styles.stepLine} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ id, name, label, error, optional, as = "input", ...props }) {
  const Tag = as;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Tag
        id={id}
        name={name}
        className={`${styles.input} ${as === "textarea" ? styles.textarea : ""}`}
        placeholder={optional ? `${label} (optional)` : label}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

function Summary({ lines, subtotal, shipping }) {
  return (
    <aside className={styles.summary} aria-label="Order summary">
      <h2 className={styles.summaryTitle}>Order Summary</h2>

      <ul className={styles.items}>
        {lines.map(({ product, qty }) => (
          <li key={product.id} className={styles.item}>
            <img src={product.image} alt="" className={styles.itemImg} />
            <div className={styles.itemInfo}>
              <p className={styles.itemName}>{product.name}</p>
              <p className={styles.itemQty}>Qty {qty}</p>
            </div>
            <p className={styles.itemPrice}>{formatPrice(product.price * qty)}</p>
          </li>
        ))}
      </ul>

      <dl className={styles.rows}>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "FREE" : formatPrice(shipping)}</dd>
        </div>
      </dl>

      <div className={styles.total}>
        <span>Total</span>
        <span>{formatPrice(subtotal + shipping)}</span>
      </div>
    </aside>
  );
}

/* ---------- page ---------- */

function Checkout() {
  const { cart, clearCart } = useShop();

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    note: "",
  });
  const [shippingId, setShippingId] = useState("standard");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null); // set once the order is placed

  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { product, qty: item.qty } : null;
    })
    .filter(Boolean);

  // Nothing to check out (and no order just placed): back to the cart
  if (lines.length === 0 && !order) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const shippingOptions = getShippingOptions(subtotal);
  const shippingOption = shippingOptions.find((o) => o.id === shippingId);
  const shippingCost = shippingOption.price;

  /* ----- handlers ----- */

  const clearError = (name) => {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleInfo = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const validateInfo = () => {
    const next = {};
    if (!info.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!EMAIL_PATTERN.test(info.email.trim())) next.email = "Please enter a valid email address.";
    if (info.phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a valid phone number.";
    if (!info.address.trim()) next.address = "Please enter your delivery address.";
    if (!info.city.trim()) next.city = "Please enter your city.";
    if (!info.state.trim()) next.state = "Please enter your state.";
    return next;
  };

  const goTo = (next) => {
    setStep(next);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitInfo = (e) => {
    e.preventDefault();
    const found = validateInfo();
    setErrors(found);
    if (Object.keys(found).length === 0) goTo(2);
  };

  const submitShipping = (e) => {
    e.preventDefault();
    goTo(3);
  };

  const total = subtotal + shippingCost;

  const handlePay = async () => {
    setPayError("");
    setPaying(true);

    const orderNumber = makeOrderNumber();

    try {
      await openPaystack({
        email: info.email.trim(),
        amountNaira: total,
        // Paystack needs a unique reference for every attempt
        reference: `${orderNumber}-${Date.now()}`,
        customerName: info.fullName.trim(),
        phone: info.phone.trim(),
        onSuccess: (response) => {
          // TODO: send response.reference (plus the order details) to your
          // backend and VERIFY the payment with Paystack before shipping.
          setOrder({
            number: orderNumber,
            email: info.email.trim(),
            total,
            reference: response.reference,
          });
          clearCart();
          setPaying(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onClose: () => setPaying(false), // customer closed the popup
      });
    } catch (err) {
      setPayError(err.message);
      setPaying(false);
    }
  };

  /* ----- order placed ----- */

  if (order) {
    return (
      <div className={styles.page}>
        <div className={styles.done}>
          <span className={styles.doneIcon}>
            <Check size={36} />
          </span>
          <p className="eyebrow">Order Confirmed</p>
          <h1 className={styles.doneTitle}>Thank you, {info.fullName.split(" ")[0]}.</h1>
          <p className={styles.doneText}>
            Your order <strong>{order.number}</strong> is confirmed. A receipt will be sent to{" "}
            {order.email}.
          </p>
          <p className={styles.doneTotal}>Total paid: {formatPrice(order.total)}</p>
          <Link to="/shop" className={styles.primary}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ----- steps ----- */

  return (
    <div className={styles.page}>
      <div className="container">
        <Stepper current={step} />

        <div className={styles.layout}>
          <div className={styles.main}>
            {step === 1 && (
              <form onSubmit={submitInfo} noValidate>
                <h1 className={styles.title}>Contact &amp; Shipping Info</h1>
                <div className={styles.fields}>
                  <Field id="co-name" name="fullName" label="Full Name" value={info.fullName}
                    onChange={handleInfo} error={errors.fullName} autoComplete="name" />
                  <Field id="co-email" name="email" type="email" label="Email Address"
                    value={info.email} onChange={handleInfo} error={errors.email} autoComplete="email" />
                  <Field id="co-phone" name="phone" type="tel" label="Phone Number"
                    value={info.phone} onChange={handleInfo} error={errors.phone} autoComplete="tel" />
                  <Field id="co-address" name="address" label="Delivery Address"
                    value={info.address} onChange={handleInfo} error={errors.address}
                    autoComplete="street-address" />
                  <div className={styles.twoCol}>
                    <Field id="co-city" name="city" label="City" value={info.city}
                      onChange={handleInfo} error={errors.city} autoComplete="address-level2" />
                    <Field id="co-state" name="state" label="State" value={info.state}
                      onChange={handleInfo} error={errors.state} autoComplete="address-level1" />
                  </div>
                  <Field id="co-note" name="note" as="textarea" rows={4} optional
                    label="Delivery Note" value={info.note} onChange={handleInfo} />
                </div>
                <button type="submit" className={styles.primary}>
                  Continue to Shipping
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={submitShipping}>
                <h1 className={styles.title}>Shipping Method</h1>

                <p className={styles.deliverTo}>
                  Delivering to <strong>{info.address}, {info.city}, {info.state}</strong>
                  <button type="button" onClick={() => goTo(1)}>Edit</button>
                </p>

                <div className={styles.options} role="radiogroup" aria-label="Shipping method">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`${styles.option} ${shippingId === option.id ? styles.optionOn : ""}`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shippingId === option.id}
                        onChange={() => setShippingId(option.id)}
                      />
                      <span className={styles.optionText}>
                        <span className={styles.optionLabel}>{option.label}</span>
                        <span className={styles.optionDetail}>{option.detail}</span>
                      </span>
                      <span className={styles.optionPrice}>
                        {option.price === 0 ? "FREE" : formatPrice(option.price)}
                      </span>
                    </label>
                  ))}
                </div>

                <div className={styles.actions}>
                  <button type="button" className={styles.back} onClick={() => goTo(1)}>
                    Back
                  </button>
                  <button type="submit" className={styles.primary}>
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div>
                <h1 className={styles.title}>Payment</h1>

                <div className={styles.payBox}>
                  <p className={styles.payLead}>
                    You'll pay securely through Paystack. Choose card, bank transfer or USSD
                    in the window that opens.
                  </p>
                  <p className={styles.payAmount}>
                    {formatPrice(total)}
                  </p>
                  <p className={styles.payNote}>
                    Charged in naira (NGN). Your card details never touch our website.
                  </p>
                </div>

                {payError && (
                  <p className={styles.error} role="alert">
                    {payError}
                  </p>
                )}

                <div className={styles.actions}>
                  <button type="button" className={styles.back} onClick={() => goTo(2)} disabled={paying}>
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.primary}
                    onClick={handlePay}
                    disabled={paying}
                  >
                    {paying ? "Opening Paystack…" : `Pay ${formatPrice(total)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          <Summary lines={lines} subtotal={subtotal} shipping={shippingCost} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;