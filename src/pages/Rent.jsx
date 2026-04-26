import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./Sale.css";
import { useFavourites } from "../context/FavouritesContext";

export default function Rent() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const { liked, toggleFavourite } = useFavourites();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/products")
      .then(res => {
        const rentProducts = res.data.filter(p => p.rentable === true);
        setProducts(rentProducts);
        setFiltered(rentProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="Sale-page">
      <Navbar />
      <div className="categories-bar">
        <span style={{ fontSize: 13, fontWeight: 600, color: "#5a3e28", padding: "0 8px" }}>
          Produse disponibile pentru închiriere
        </span>
      </div>
      <div className="main-layout">
        <div className="products-grid">
          {loading && (
            <p style={{ padding: "1rem", color: "#7a6555" }}>Se încarcă...</p>
          )}
          {!loading && filtered.length === 0 && (
            <p style={{ padding: "1rem", color: "#7a6555" }}>
              Nu există produse disponibile pentru chirie.
            </p>
          )}
          {filtered.map(p => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => navigate(`/rent/${p.id}`)}
            >
              <div className="product-img">
                {p.imageUrl
                  ? <img src={`http://localhost:8080${p.imageUrl}`} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: 48 }}>🎾</span>
                }
                {p.stock === 0 && (
                  <span className="badge" style={{ background: "#c62828" }}>Stoc epuizat</span>
                )}
                <button
                  className={`heart ${liked[p.id] ? "liked" : ""}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavourite(p.id); }}
                  title={liked[p.id] ? "Elimină din favorite" : "Adaugă la favorite"}
                >
                  {liked[p.id] ? "♥" : "♡"}
                </button>
              </div>
              <div className="product-info">
                <p className="product-name">{p.name}</p>
                {p.brand && (
                  <p style={{ fontSize: 11, color: "#9e8572", marginBottom: 4 }}>{p.brand}</p>
                )}
                <div className="product-price">
                  <span className="price-new">{p.price} MDL / oră</span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => { e.stopPropagation(); navigate(`/rent/${p.id}`); }}
                  disabled={p.stock === 0}
                >
                  📅 Închiriază acum
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}