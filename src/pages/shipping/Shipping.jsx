// import styles from "./shipping.module.css";

// // All the policy text lives here: edit the wording or prices in this list
// const SECTIONS = [
//   {
//     title: "Shipping",
//     rows: [
//       {
//         label: "Standard Delivery",
//         value: "5–8 business days · Free on orders over $250 · $18 otherwise",
//       },
//       { label: "Express Delivery", value: "2–5 business days · 25" },
//       { label: "Overnight", value: "Next business day ·45 · Order before 2PM WAT" },
//       { label: "International", value: "7–14 business days · Rates calculated at checkout" },
//     ],
//   },
//   {
//     title: "Returns",
//     rows: [
//       { label: "Return Window", value: "30 days from delivery date" },
//       { label: "Condition", value: "Unworn, undamaged, with original dust bag and tags" },
//       {
//         label: "Free Returns",
//         value: "First return per year is free · Subsequent returns $12 shipping fee",
//       },
//       { label: "Personalized Items", value: "Non-refundable unless damaged in transit" },
//     ],
//   },
//   {
//     title: "Refunds",
//     rows: [
//       { label: "Processing Time", value: "5–10 business days after we receive the return" },
//       { label: "Method", value: "Refunded to original payment method" },
//       { label: "Exchange", value: "Free exchanges for size, colour, or style" },
//     ],
//   },
// ];

// function Shipping() {
//   return (
//     <div className={styles.page}>
//       <div className={styles.content}>
//         <header className={styles.header}>
//           <p className="eyebrow">Policy</p>
//           <h1 className={styles.title}>Shipping &amp; Returns</h1>
//         </header>

//         {SECTIONS.map((section) => (
//           <section key={section.title} className={styles.section}>
//             <h2 className={styles.sectionTitle}>{section.title}</h2>

//             <dl className={styles.rows}>
//               {section.rows.map((row) => (
//                 <div key={row.label} className={styles.row}>
//                   <dt>{row.label}</dt>
//                   <dd>{row.value}</dd>
//                 </div>
//               ))}
//             </dl>
//           </section>
//         ))}

//         <aside className={styles.warranty}>
//           <h2 className={styles.warrantyTitle}>Lifetime Warranty</h2>
//           <p>
//             All ARIA bags are warranted against manufacturing defects for the life of the
//             product. Hardware failure, seam separation, and structural defects are repaired or
//             replaced at no cost. Wear, scratches, and damage caused by misuse are not covered
//             but can often be repaired at a fair rate by our atelier.
//           </p>
//         </aside>
//       </div>
//     </div>
//   );
// }

// export default Shipping;



import styles from "./shipping.module.css";

// All the policy text lives here: edit the wording or prices in this list
const SECTIONS = [
  {
    title: "Shipping",
    rows: [
      {
        label: "Standard Delivery",
        value: "5–8 business days · Free on orders over ₦375,000 · ₦27,000 otherwise",
      },
      { label: "Express Delivery", value: "2–3 business days · ₦37,500" },
      { label: "Overnight", value: "Next business day · ₦67,500 · Order before 2PM WAT" },
      { label: "International", value: "7–14 business days · Rates calculated at checkout" },
    ],
  },
  {
    title: "Returns",
    rows: [
      { label: "Return Window", value: "30 days from delivery date" },
      { label: "Condition", value: "Unworn, undamaged, with original dust bag and tags" },
      {
        label: "Free Returns",
        value: "First return per year is free · Subsequent returns ₦18,000 shipping fee",
      },
      { label: "Personalized Items", value: "Non-refundable unless damaged in transit" },
    ],
  },
  {
    title: "Refunds",
    rows: [
      { label: "Processing Time", value: "5–10 business days after we receive the return" },
      { label: "Method", value: "Refunded to original payment method" },
      { label: "Exchange", value: "Free exchanges for size, colour, or style" },
    ],
  },
];

function Shipping() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <p className="eyebrow">Policy</p>
          <h1 className={styles.title}>Shipping &amp; Returns</h1>
        </header>

        {SECTIONS.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>

            <dl className={styles.rows}>
              {section.rows.map((row) => (
                <div key={row.label} className={styles.row}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <aside className={styles.warranty}>
          <h2 className={styles.warrantyTitle}>Lifetime Warranty</h2>
          <p>
            All ARIA bags are warranted against manufacturing defects for the life of the
            product. Hardware failure, seam separation, and structural defects are repaired or
            replaced at no cost. Wear, scratches, and damage caused by misuse are not covered
            but can often be repaired at a fair rate by our atelier.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Shipping;