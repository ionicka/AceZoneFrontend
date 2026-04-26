import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./Cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    api.get("/api/cart")
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const updateQuantity = (itemId, qty) => {
    api.put(`/api/cart/${itemId}`, { quantity: qty })
      .then(fetchCart)
      .catch(console.error);
  };

  const removeItem = (itemId) => {
    api.delete(`/api/cart/${itemId}`)
      .then(fetchCart)
      .catch(console.error);
  };

  const clearCart = () => {
    api.delete("/api/cart")
      .then(fetchCart)
      .catch(console.error);
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <div className="cart-header">
          <h2 className="cart-title">Coșul Meu</h2>
          {items.length > 0 && (
            <button className="clear-btn" onClick={clearCart}>Golește coșul</button>
          )}
        </div>

        {loading && <p className="cart-msg">Se încarcă...</p>}

        {!loading && items.length === 0 && (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <p>Coșul tău este gol.</p>
            <button className="btn-primary" onClick={() => navigate("/sale")}>
              Continuă cumpărăturile
            </button>
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    {item.product.imageUrl
                      ? <img src={`http://localhost:8080${item.product.imageUrl}`} alt={item.product.name} />
                      : <span>🎾</span>
                    }
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product.name}</p>
                    {item.product.brand && (
                      <p className="cart-item-brand">{item.product.brand}</p>
                    )}
                    <p className="cart-item-price">${item.product.price}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="cart-item-subtotal">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button className="cart-item-remove" onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 className="summary-title">Sumar comandă</h3>
              <div className="summary-row">
                <span>Produse ({items.length})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Livrare</span>
                <span>{total >= 90 ? <span style={{color:"#5a3e28"}}>Gratuită</span> : "$10.00"}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${(total >= 90 ? total : total + 10).toFixed(2)}</span>
              </div>
              {total < 90 && (
                <p className="free-shipping-msg">
                  Mai adaugă ${(90 - total).toFixed(2)} pentru livrare gratuită!
                </p>
              )}
              <button className="btn-checkout">Finalizează comanda</button>
              <button className="btn-continue" onClick={() => navigate("/sale")}>
                ← Continuă cumpărăturile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}