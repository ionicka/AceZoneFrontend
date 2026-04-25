import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./Home.css";

const categories = ["All Categories", "Rackets", "Shoes", "Balls", "Bags", "Clothing", "Accessories", "Court Rental"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/products")
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === "All Categories") {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === cat));
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="categories-bar">
        <button className="filter-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          &#9776; Filters
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="main-layout">
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          {/* filtre */}
        </aside>

        <div className="products-grid">
          {loading && <p style={{ padding: "1rem", color: "#7a6555" }}>Se încarcă produsele...</p>}

          {!loading && filtered.length === 0 && (
            <p style={{ padding: "1rem", color: "#7a6555" }}>Nu există produse în această categorie.</p>
          )}

          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img">
               {p.imageUrl
  ? <img
      src={`http://localhost:8080${p.imageUrl}`}
      alt={p.name}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  : <span style={{ fontSize: 48 }}>🎾</span>
}
                {p.stock === 0 && <span className="badge" style={{ background: "#c62828" }}>Stoc epuizat</span>}
              </div>
              <div className="product-info">
                <p className="product-name">{p.name}</p>
                {p.brand && <p style={{ fontSize: 11, color: "#9e8572", marginBottom: 4 }}>{p.brand}</p>}
                <div className="product-price">
                  {p.oldPrice && <span className="price-old">${p.oldPrice}</span>}
                  <span className="price-new">${p.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}