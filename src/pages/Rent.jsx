// src/pages/Rent.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./Sale.css"; // poți refolosi același CSS

export default function Rent() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/products")
      .then(res => {
        // ← AICI folosești rentProducts — filtrezi doar ce are rentable: true
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
      <div className="products-grid">
        {loading && <p style={{ padding: "1rem", color: "#7a6555" }}>Se încarcă...</p>}
        {!loading && filtered.length === 0 && (
          <p style={{ padding: "1rem", color: "#7a6555" }}>Nu există produse disponibile pentru chirie.</p>
        )}
        {filtered.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-img">
              {p.imageUrl
                ? <img src={`http://localhost:8080${p.imageUrl}`} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: 48 }}>🎾</span>
              }
            </div>
            <div className="product-info">
              <p className="product-name">{p.name}</p>
              {p.brand && <p style={{ fontSize: 11, color: "#9e8572", marginBottom: 4 }}>{p.brand}</p>}
              <div className="product-price">
                <span className="price-new">${p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}