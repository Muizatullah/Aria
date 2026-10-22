import { Navigate } from "react-router";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { useShop } from "./context/ShopContext.jsx";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Searchoverlay from "./components/searchoverLay/SearchoverLay.jsx";
import ChatWidget from "./components/chatWidget/ChatWidget.jsx";

import Shop from "./pages/shop/Shop";
import {
  CollectionPage,
  Homepage,
  LookBook,
  OurStory,
  CraftsmanShip,
  Account,
  WishList,
  Cart,
  Checkout,
  TrackOrder,
  Support,
  Shipping,
  Legal,
  Product,
  NotFound,
} from "./pages";

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlistCount } = useShop();
  return (
    <>
      <ScrollToTop />
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearchClick={() => setSearchOpen(true)}
      />

      <Searchoverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ChatWidget />

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/lookBook" element={<LookBook />} />
          <Route path="/our-Story" element={<OurStory />} />
          <Route path="/craftsmanShip" element={<CraftsmanShip />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/support" element={<Support />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route
            path="/careers"
            element={<Navigate to="/our-Story" replace />}
          />
          <Route
            path="/sustainability"
            element={<Navigate to="/our-Story" replace />}
          />

          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route
            path="/accessibility"
            element={<Legal type="accessibility" />}
          />
          <Route path="/product/:slug" element={<Product />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
