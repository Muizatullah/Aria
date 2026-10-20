
import { createContext, useContext, useMemo, useState } from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // cart: [{ id, qty }]   wishlist: [id]
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (id, amount = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item
        );
      }
      return [...prev, { id, qty: amount }];
    });
  };

  // Change a quantity by +1 / -1. Dropping to 0 removes the item.
  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      addToCart,
      changeQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
      cartCount: cart.reduce((sum, item) => sum + item.qty, 0),
      wishlistCount: wishlist.length,
    }),
    [cart, wishlist]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}