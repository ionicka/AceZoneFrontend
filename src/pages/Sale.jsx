import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./Sale.css";
import { useFavourites } from "../context/FavouritesContext";
import { useCart } from "../context/CartContext";
const categories = [
  { value: "All Categories", label: "Toate Categoriile" },
  { value: "Rackets", label: "Rachete" },
  { value: "Shoes", label: "Încălțăminte" },
  { value: "Balls", label: "Mingi" },
  { value: "Bags", label: "Genți" },
  { value: "Clothing", label: "Îmbrăcăminte" },
  { value: "Accessories", label: "Accesorii" },
];

export default function Sale() {
   const { loadCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
    const { liked, toggleFavourite } = useFavourites();
  const [cartMsg, setCartMsg] = useState({});

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



  const addToCart = (e, productId) => {
    e.stopPropagation();
    api.post(`/api/cart/${productId}`)
      .then(() => {
        loadCart();
        setCartMsg(prev => ({ ...prev, [productId]: true }));
        setTimeout(() => setCartMsg(prev => ({ ...prev, [productId]: false })), 1500);
      })
      .catch(console.error);
  };

  return (
    <div className="Sale-page">
      <Navbar />
      <div className="categories-bar">
        <button className="filter-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          &#9776; Filtre
        </button>
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`cat-btn ${activeCategory === cat.value ? "active" : ""}`}
            onClick={() => handleCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="main-layout">
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          {/* filtre */}
        </aside>

        <div className="products-grid">
          {loading && (
            <p style={{ padding: "1rem", color: "#7a6555" }}>Se încarcă produsele...</p>
          )}

          {!loading && filtered.length === 0 && (
            <p style={{ padding: "1rem", color: "#7a6555" }}>
              Nu există produse în această categorie.
            </p>
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
                  <span className="price-new">{p.price} MDL</span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => addToCart(e, p.id)}
                  disabled={p.stock === 0}
                >
                  {cartMsg[p.id] ? "✓ Adăugat!" : "🛒 Adaugă în coș"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}