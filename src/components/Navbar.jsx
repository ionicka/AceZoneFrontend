import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
    localStorage.removeItem("token");
    navigate("/login");
  };




 return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">AceZone</Link>
        <Link to="/" className="nav-link">Acasă</Link>
        <Link to="/about" className="nav-link">Despre Noi</Link>
        <Link to="/sale" className="nav-link">Vânzări</Link>
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
            <Link to="/favourites" className="nav-link">&#9825; Favourites</Link>
            <Link to="/cart" className="nav-link">&#128722; Cart <span className="cart-badge">0</span></Link>
          </>
        )}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}