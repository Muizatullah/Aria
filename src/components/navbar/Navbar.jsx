import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import logo from "../../assets/ARIA LOGO-42.svg";
import styles from "./navbar.module.css";

const NAV_LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "Our Story", to: "/our-story" },
  { label: "Craftsmanship", to: "/craftsmanship" },
];

function Navbar({ cartCount = 0, wishlistCount = 0, onSearchClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={closeMenu} aria-label="ARIA home">
          <img src={logo} alt="ARIA" />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Search"
            onClick={onSearchClick}
          >
            <Search size={22} />
          </button>

          <Link to="/account" className={`${styles.iconBtn} ${styles.hideOnMobile}`} aria-label="Account">
            <User size={22} />
          </Link>

          <Link to="/wishlist" className={`${styles.iconBtn} ${styles.hideOnMobile}`} aria-label="Wishlist">
            <Heart size={22} />
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
            <ShoppingBag size={22} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/account" className={linkClass} onClick={closeMenu}>
            Account
          </NavLink>
          <NavLink to="/wishlist" className={linkClass} onClick={closeMenu}>
            Wishlist
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;