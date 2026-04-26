import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useFavourites } from "../context/FavouritesContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { clearFavourites } = useFavourites();
  const { cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAdmin = payload.role === "ROLE_ADMIN";
    } catch (e) {
      console.error("Token invalid");
    }
  }

  const handleLogout = () => {
    clearFavourites();
    clearCart();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">AceZone</Link>
        <Link to="/" className="nav-link">Acasă</Link>
        <Link to="/about" className="nav-link">Despre Noi</Link>
        <Link to="/sale" className="nav-link">Produse</Link>
        <Link to="/rent" className="nav-link">Închiriază</Link>
        <Link to="/contact" className="nav-link">Contactați-ne</Link>
      </div>
      <div className="navbar-right">
        {isAdmin ? (
          <>
            <Link to="/admin/products" className="nav-link admin-link">&#9776; Toate produsele</Link>
            <Link to="/admin/add" className="nav-link admin-link">+ Adaugă</Link>
            <Link to="/admin/products" className="nav-link admin-link">&#9998; Modifică</Link>
          </>
        ) : (
          <>
            <Link to="/favourites" className="nav-link">&#9825; Favorite</Link>
            <Link to="/cart" className="nav-link">
              &#128722; Coș <span className="cart-badge">{cartCount}</span>
            </Link>
          </>
        )}
        <button className="logout-btn" onClick={handleLogout}>Delogare</button>
      </div>
    </nav>
  );
}