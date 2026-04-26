import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./Favourites.css";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMsg, setCartMsg] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = () => {
    api.get("/api/favourites")
      .then(res => {
        setFavourites(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const removeFavourite = (productId) => {
    api.delete(`/api/favourites/${productId}`)
      .then(() => {
        setFavourites(prev => prev.filter(f => f.product.id !== productId));
      })
      .catch(console.error);
  };

  const addToCart = (productId) => {
    api.post(`/api/cart/${productId}`)
      .then(() => {
        setCartMsg(prev => ({ ...prev, [productId]: true }));
        setTimeout(() => setCartMsg(prev => ({ ...prev, [productId]: false })), 1500);
      })
      .catch(console.error);
  };

  return (
    <div className="fav-page">
      <Navbar />
      <div className="fav-container">
        <div className="fav-header">
          <h2 className="fav-title">Favorite</h2>
          <span className="fav-count">{favourites.length} produse</span>
        </div>

        {loading && <p className="fav-msg">Se încarcă...</p>}

        {!loading && favourites.length === 0 && (
          <div className="fav-empty">
            <span className="fav-empty-icon">♡</span>
            <p>Nu ai niciun produs la favorite.</p>
            <button className="btn-primary" onClick={() => navigate("/sale")}>
              Descoperă produse
            </button>
          </div>
        )}

        <div className="fav-grid">
          {favourites.map(fav => (
            <div key={fav.id} className="fav-card">
              <button
                className="fav-remove"
                onClick={() => removeFavourite(fav.product.id)}
                title="Elimină din favorite"
              >
                ♥
              </button>
              <div className="fav-img">
                {fav.product.imageUrl
                  ? <img src={`http://localhost:8080${fav.product.imageUrl}`} alt={fav.product.name} />
                  : <span>🎾</span>
                }
              </div>
              <div className="fav-info">
                {fav.product.brand && (
                  <p className="fav-brand">{fav.product.brand}</p>
                )}
                <p className="fav-name">{fav.product.name}</p>
                <div className="fav-price">
                  <span className="price-new">{fav.product.price} MDL</span>
                </div>
                <button
                  className="btn-add-cart"
                  onClick={() => addToCart(fav.product.id)}
                >
                  {cartMsg[fav.product.id] ? "✓ Adăugat!" : "🛒 Adaugă în coș"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}