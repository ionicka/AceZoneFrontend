import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero */}
      <div className="contact-hero">
        <h1 className="contact-hero-title">Contactați-ne</h1>
        <p className="contact-hero-sub">Suntem aici să vă ajutăm. Scrieți-ne oricând!</p>
      </div>

      <div className="contact-container">
        {/* Info cards */}
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <span className="contact-icon">📍</span>
            <h4>Adresă</h4>
            <p>Str. Exemplu Nr. 1<br />Chisinau, Moldova</p>
          </div>
          <div className="contact-info-card">
            <span className="contact-icon">📞</span>
            <h4>Telefon</h4>
            <p>06866453<br />Lun–Vin, 9:00–18:00</p>
          </div>
          <div className="contact-info-card">
            <span className="contact-icon">✉️</span>
            <h4>Email</h4>
            <p>contact@acezone.md<br />Răspundem în 24h</p>
          </div>
          <div className="contact-info-card">
            <span className="contact-icon">🏟️</span>
            <h4>Program</h4>
            <p>Lun–Vin: 9:00–20:00<br />Sâm–Dum: 10:00–18:00</p>
          </div>
        </div>

        {/* Form + Map */}
        <div className="contact-main">
          <div className="contact-form-section">
            <h3 className="form-title">Trimite un mesaj</h3>

            {sent && (
              <div className="success-banner">
                ✓ Mesajul a fost trimis! Vă vom contacta în curând.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nume *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Numele tău"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="email@exemplu.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Subiect</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Cum te putem ajuta?"
                />
              </div>
              <div className="form-group">
                <label>Mesaj *</label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={5}
                  placeholder="Scrie mesajul tău aici..."
                  required
                />
              </div>
              <button type="submit" className="btn-submit">
                Trimite mesajul →
              </button>
            </form>
          </div>

          <div className="contact-map-section">
            <h3 className="form-title">Locație</h3>
            <div className="map-placeholder">
              <span>🗺️</span>
              <p>Hartă indisponibilă</p>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}