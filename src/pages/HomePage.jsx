import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./HomePage.css";

const collections = [
  { id: 1, tag: "New Arrivals", name: "Pro Rackets", emoji: "🎾", size: "large" },
  { id: 2, tag: "Collection", name: "Footwear", emoji: "👟", size: "" },
  { id: 3, tag: "Hot Sale", name: "Accessories", emoji: "🎽", size: "" },
];

const whyItems = [
  {
    icon: "🚚",
    title: "Free Shipping",
    desc: "Free delivery on all orders over $90 anywhere in the country.",
  },
  {
    icon: "↩️",
    title: "30-Day Returns",
    desc: "Not satisfied? Send it back within 30 days, no questions asked.",
  },
  {
    icon: "🌿",
    title: "Quality Gear",
    desc: "Only certified brands and premium materials for every player.",
  },
  {
    icon: "💳",
    title: "Secure Payment",
    desc: "Pay with card, PayPal or cash on delivery — fully secure.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        // Afișăm primele 4 produse ca "featured"
        setFeaturedProducts(res.data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="landing-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-pattern" />

        <div className="hero-content">
          <p className="hero-eyebrow">Season 2025 Collection</p>
          <h1 className="hero-title">
            Elevate Your <span>Game</span> On Every Court.
          </h1>
          <p className="hero-subtitle">
            Premium tennis gear from the world's top brands. Rackets, shoes,
            apparel and more — for players at every level.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/sale")}>
              Shop Now →
            </button>
            <button className="btn-secondary" onClick={() => navigate("/sale?category=Court Rental")}>
              Book a Court
            </button>
          </div>
        </div>

        {/* Placeholder — înlocuiește cu <img> când ai poza */}
        <div className="hero-image-area">
          <div className="hero-image-placeholder">🎾</div>
          {/* <img src="/images/hero.jpg" alt="Tennis player" /> */}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-icon">🎾</span>
          <div className="stat-text">
            <strong>500+ Products</strong>
            <span>Rackets, shoes & more</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏆</span>
          <div className="stat-text">
            <strong>Top Brands</strong>
            <span>Wilson, Head, Babolat & more</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🚚</span>
          <div className="stat-text">
            <strong>Free Shipping</strong>
            <span>On orders over $90</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏟️</span>
          <div className="stat-text">
            <strong>Court Rentals</strong>
            <span>Book online, play today</span>
          </div>
        </div>
      </div>

      {/* ── COLLECTIONS ── */}
      <section className="collections-section">
        <div className="section-header">
          <p className="section-eyebrow">Browse by Category</p>
          <h2 className="section-title">
            Our <span>Collections</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="collections-grid">
          {collections.map((col) => (
            <div
              key={col.id}
              className={`collection-card ${col.size}`}
              onClick={() => navigate(`/sale?category=${col.name}`)}
            >
              {/* Placeholder — înlocuiește div-ul cu <img> când ai pozele */}
              <div className="collection-img">
                <span>{col.emoji}</span>
                {/* <img src={`/images/collection-${col.id}.jpg`} alt={col.name} /> */}
              </div>
              <div className="collection-overlay" />
              <div className="collection-info">
                <p className="collection-tag">{col.tag}</p>
                <h3 className="collection-name">{col.name}</h3>
                <button className="collection-link">
                  Shop Collection →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      {featuredProducts.length > 0 && (
        <section className="featured-section">
          <div className="section-header">
            <p className="section-eyebrow">Hand-picked for you</p>
            <h2 className="section-title">
              Featured <span>Products</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="featured-grid">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="feat-card"
                onClick={() => navigate(`/sale`)}
              >
                <div className="feat-img">
                  {p.imageUrl ? (
                    <img
                      src={`http://localhost:8080${p.imageUrl}`}
                      alt={p.name}
                    />
                  ) : (
                    <span>🎾</span>
                  )}
                  
                </div>
                <div className="feat-info">
                  {p.brand && <p className="feat-brand">{p.brand}</p>}
                  <p className="feat-name">{p.name}</p>
                  <div className="feat-price">
                    
                    <span className="feat-price-new">${p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-wrap">
            <button
              className="btn-primary"
              style={{ background: "#5a3e28" }}
              onClick={() => navigate("/sale")}
            >
              View All Products →
            </button>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ── */}
      <section className="why-section">
        <div className="section-header">
          <p className="section-eyebrow">Our Promise</p>
          <h2 className="section-title">
            Why Choose <span>Us</span>
          </h2>
          <div className="section-divider" />
          <p
            style={{
              marginTop: "0.8rem",
              fontSize: 14,
              color: "#9e8572",
              fontWeight: 300,
            }}
          >
            Everything you need to play your best game.
          </p>
        </div>

        <div className="why-grid">
          {whyItems.map((item) => (
            <div key={item.title} className="why-card">
              <span className="why-icon">{item.icon}</span>
              <h4 className="why-title">{item.title}</h4>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <p className="cta-eyebrow">Limited Time Offer</p>
          <h2 className="cta-title">Ready to Hit the Court?</h2>
          <p className="cta-desc">
            Join thousands of players who trust us for their gear. New arrivals
            every week — don't miss out.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <button className="btn-primary" onClick={() => navigate("/sale")}>
              Shop Now →
            </button>
            <button className="btn-secondary" onClick={() => navigate("/sale?category=Court Rental")}>
              Book a Court
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}