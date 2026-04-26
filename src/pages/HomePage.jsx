import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./HomePage.css";

const collections = [
  { id: 1, tag: "Noutăți", name: "Rachete Pro", emoji: "🎾", size: "large", category: "Rackets" },
  { id: 2, tag: "Colecție", name: "Încălțăminte", emoji: "👟", size: "", category: "Shoes" },
  { id: 3, tag: "Oferte", name: "Accesorii", emoji: "🎽", size: "", category: "Accessories" },
];

const whyItems = [
  {
    icon: "🚚",
    title: "Livrare Gratuită",
    desc: "Livrare gratuită la toate comenzile peste 500 MDL în toată țara.",
  },
  {
    icon: "↩️",
    title: "Returnare 30 Zile",
    desc: "Nu ești mulțumit? Trimite înapoi în 30 de zile, fără întrebări.",
  },
  {
    icon: "🏆",
    title: "Echipament Premium",
    desc: "Doar branduri certificate și materiale de calitate pentru fiecare jucător.",
  },
  {
    icon: "💳",
    title: "Plată Sigură",
    desc: "Plătește cu cardul, PayPal sau numerar — complet securizat.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        const saleProducts = res.data.filter(p => p.category !== "Court Rental");
        setFeaturedProducts(saleProducts.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="landing-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-eyebrow">Colecția Sezon 2025</p>
            <h1 className="hero-title">
              Ridică-ți Jocul<br />Pe Orice <span>Teren.</span>
            </h1>
            <p className="hero-subtitle">
              Echipament premium de tenis de la cele mai bune branduri din lume.
              Rachete, pantofi, îmbrăcăminte și multe altele — pentru jucători de orice nivel.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/sale")}>
                Cumpără Acum →
              </button>
              <button className="btn-secondary" onClick={() => navigate("/rent")}>
                Închiriază un Teren
              </button>
            </div>
          </div>

          <div className="hero-image-area">
            <div className="hero-image-placeholder">🎾</div>
            {/* <img src="/images/hero.jpg" alt="Jucător tenis" /> */}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-icon">🎾</span>
          <div className="stat-text">
            <strong>500+ Produse</strong>
            <span>Rachete, pantofi și multe altele</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏆</span>
          <div className="stat-text">
            <strong>Top Branduri</strong>
            <span>Wilson, Head, Babolat și altele</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🚚</span>
          <div className="stat-text">
            <strong>Livrare Gratuită</strong>
            <span>La comenzi peste 500 MDL</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏟️</span>
          <div className="stat-text">
            <strong>Terenuri de Tenis</strong>
            <span>Rezervă online, joacă azi</span>
          </div>
        </div>
      </div>

      {/* ── COLLECTIONS ── */}
      <section className="collections-section">
        <div className="section-header">
          <p className="section-eyebrow">Explorează pe Categorie</p>
          <h2 className="section-title">
            Colecțiile <span>Noastre</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="collections-grid">
          {collections.map((col) => (
            <div
              key={col.id}
              className={`collection-card ${col.size}`}
              onClick={() => navigate(`/sale`)}
            >
              <div className="collection-img">
                <span>{col.emoji}</span>
                {/* <img src={`/images/collection-${col.id}.jpg`} alt={col.name} /> */}
              </div>
              <div className="collection-overlay" />
              <div className="collection-info">
                <p className="collection-tag">{col.tag}</p>
                <h3 className="collection-name">{col.name}</h3>
                <button className="collection-link">
                  Vezi Colecția →
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
            <p className="section-eyebrow">Selecție Specială</p>
            <h2 className="section-title">
              Produse <span>Recomandate</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="featured-grid">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="feat-card"
                onClick={() => navigate("/sale")}
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
                    <span className="feat-price-new">{p.price} MDL</span>
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
              Vezi Toate Produsele →
            </button>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ── */}
      <section className="why-section">
        <div className="section-header">
          <p className="section-eyebrow">Promisiunea Noastră</p>
          <h2 className="section-title">
            De Ce să <span>Ne Alegi</span>
          </h2>
          <div className="section-divider" />
          <p style={{ marginTop: "0.8rem", fontSize: 13, color: "#9e8572", fontWeight: 300 }}>
            Tot ce ai nevoie pentru cel mai bun joc al tău.
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
          <p className="cta-eyebrow">Ofertă Limitată</p>
          <h2 className="cta-title">Pregătit să Joci?</h2>
          <p className="cta-desc">
            Alătură-te miilor de jucători care au încredere în noi pentru echipamentul lor.
            Produse noi în fiecare săptămână — nu rata ofertele!
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <button className="btn-primary" onClick={() => navigate("/sale")}>
              Cumpără Acum →
            </button>
            <button className="btn-secondary" onClick={() => navigate("/rent")}>
              Închiriază un Teren
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}