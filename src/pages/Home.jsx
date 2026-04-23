import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const categories = ["All Categories", "Fashion", "Health & Wellness", "Home", "Sports", "Court Rental"];

const products = [
  { id: 1, name: "Tennis Racket Pro Elite", price: 89.99, emoji: "🎾", badge: "Top Item" },
  { id: 2, name: "Tennis Shoes Court Master", price: 94.99, oldPrice: 120.00, emoji: "👟" },
  { id: 3, name: "Tennis Balls Wilson x3", price: 12.99, emoji: "⚽", badge: "Sale" },
  { id: 4, name: "Tennis Bag Sport Pro", price: 59.99, oldPrice: 75.00, emoji: "🎒" },
  { id: 5, name: "Court Rental — 1 hour", price: 25, emoji: "🎾", badge: "Rental" },
  { id: 6, name: "Wristband & Grip Set", price: 18.50, emoji: "🧤" },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="home-page">
      <Navbar />
      <div className="categories-bar">
        <button className="filter-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          &#9776; Filters
        </button>
        {categories.map(cat => (
          <button key={cat} className={`cat-btn ${cat === "All Categories" ? "active" : ""}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="main-layout">
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          {/* filtre */}
        </aside>
        <div className="products-grid">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img">
                {p.emoji}
                {p.badge && <span className="badge">{p.badge}</span>}
              </div>
              <div className="product-info">
                <p className="product-name">{p.name}</p>
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