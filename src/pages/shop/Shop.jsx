// import { useMemo } from "react";
// import { useSearchParams } from "react-router";
// import { ChevronDown } from "lucide-react";
// import ProductCard from "../../components/productCard/ProductCard";
// import { products } from "../../data.js";
// import styles from "./shop.module.css";

// const SORT_OPTIONS = [
//   { value: "featured", label: "Featured" },
//   { value: "new", label: "Newest" },
//   { value: "bestsellers", label: "Bestsellers" },
//   { value: "price-asc", label: "Price: Low to High" },
//   { value: "price-desc", label: "Price: High to Low" },
// ];

// const hasBadge = (product, badge) => product.badges.includes(badge);

// function sortProducts(list, sort) {
//   const sorted = [...list];

//   switch (sort) {
//     case "new":
//       return sorted.sort(
//         (a, b) => Number(hasBadge(b, "NEW")) - Number(hasBadge(a, "NEW")) || b.id - a.id
//       );
//     case "bestsellers":
//       return sorted.sort(
//         (a, b) =>
//           Number(hasBadge(b, "BESTSELLER")) - Number(hasBadge(a, "BESTSELLER")) ||
//           b.reviews - a.reviews
//       );
//     case "price-asc":
//       return sorted.sort((a, b) => a.price - b.price);
//     case "price-desc":
//       return sorted.sort((a, b) => b.price - a.price);
//     default:
//       return sorted; // featured = original order in data.js
//   }
// }

// function Shop() {
//   // The sort lives in the URL (?sort=new) so footer links and refreshes keep working
//   const [searchParams, setSearchParams] = useSearchParams();
//   const requested = searchParams.get("sort");
//   const sort = SORT_OPTIONS.some((o) => o.value === requested) ? requested : "featured";

//   const visible = useMemo(() => sortProducts(products, sort), [sort]);

//   const handleSort = (e) => {
//     const value = e.target.value;
//     setSearchParams(value === "featured" ? {} : { sort: value });
//   };

//   return (
//     <div className={styles.page}>
//       <header className={styles.header}>
//         <div className={`container ${styles.headerInner}`}>
//           <div>
//             <p className="eyebrow">The Collection</p>
//             <h1 className={styles.title}>Shop All</h1>
//           </div>

//           <div className={styles.sortWrap}>
//             <label htmlFor="shop-sort" className="sr-only">
//               Sort products
//             </label>
//             <select
//               id="shop-sort"
//               className={styles.select}
//               value={sort}
//               onChange={handleSort}
//             >
//               {SORT_OPTIONS.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown size={20} className={styles.chevron} aria-hidden="true" />
//           </div>
//         </div>
//       </header>

//       <section className={`container ${styles.content}`}>
//         <p className={styles.count} aria-live="polite">
//           {visible.length} {visible.length === 1 ? "product" : "products"}
//         </p>

//         <div className={styles.grid}>
//           {visible.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Shop;


import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { ChevronDown } from "lucide-react";
import ProductCard from "../../components/productCard/ProductCard";
import { products } from "../../data.js";
import styles from "./shop.module.css";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "Newest" },
  { value: "bestsellers", label: "Bestsellers" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const hasBadge = (product, badge) => product.badges.includes(badge);

// Every word in the search must appear in the product's name, collection or tags.
// "bag"/"bags" are ignored because every product is a bag ("Tote bags" -> "tote").
function matchesQuery(product, query) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/s$/, ""))
    .filter((word) => word && word !== "bag");

  if (words.length === 0) return true;

  const haystack = [product.name, product.collection, ...(product.tags || [])]
    .join(" ")
    .toLowerCase();

  return words.every((word) => haystack.includes(word));
}

function sortProducts(list, sort) {
  const sorted = [...list];

  switch (sort) {
    case "new":
      return sorted.sort(
        (a, b) => Number(hasBadge(b, "NEW")) - Number(hasBadge(a, "NEW")) || b.id - a.id
      );
    case "bestsellers":
      return sorted.sort(
        (a, b) =>
          Number(hasBadge(b, "BESTSELLER")) - Number(hasBadge(a, "BESTSELLER")) ||
          b.reviews - a.reviews
      );
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted; // featured = original order in data.js
  }
}

function Shop() {
  // Sort and search live in the URL (?sort=new&q=tote) so links and refreshes keep working
  const [searchParams, setSearchParams] = useSearchParams();

  const requested = searchParams.get("sort");
  const sort = SORT_OPTIONS.some((o) => o.value === requested) ? requested : "featured";
  const query = (searchParams.get("q") || "").trim();

  const visible = useMemo(
    () => sortProducts(products.filter((p) => matchesQuery(p, query)), sort),
    [sort, query]
  );

  const handleSort = (e) => {
    const next = new URLSearchParams(searchParams);
    if (e.target.value === "featured") next.delete("sort");
    else next.set("sort", e.target.value);
    setSearchParams(next);
  };

  const clearSearch = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    setSearchParams(next);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div>
            <p className="eyebrow">{query ? "Search Results" : "The Collection"}</p>
            <h1 className={styles.title}>Shop All</h1>
          </div>

          <div className={styles.sortWrap}>
            <label htmlFor="shop-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="shop-sort"
              className={styles.select}
              value={sort}
              onChange={handleSort}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className={styles.chevron} aria-hidden="true" />
          </div>
        </div>
      </header>

      <section className={`container ${styles.content}`}>
        <p className={styles.count} aria-live="polite">
          {query ? (
            <>
              {visible.length} {visible.length === 1 ? "result" : "results"} for “{query}”
              <button type="button" className={styles.clear} onClick={clearSearch}>
                Clear search
              </button>
            </>
          ) : (
            <>
              {visible.length} {visible.length === 1 ? "product" : "products"}
            </>
          )}
        </p>

        {visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            No bags match “{query}”. Try “tote”, “clutch” or “crossbody”.
          </p>
        )}
      </section>
    </div>
  );
}

export default Shop;