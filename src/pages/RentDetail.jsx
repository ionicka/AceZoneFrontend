import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./RentDetail.css";

export default function RentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Produsul nu a fost găsit.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffMs = end - start;
      if (diffMs > 0) {
        const hours = Math.ceil(diffMs / (1000 * 60 * 60));
        setTotalHours(hours);
       setTotalPrice(hours * (product?.rentPrice || 0));
        setAvailable(null); // resetează disponibilitatea la schimbare
      } else {
        setTotalHours(0);
        setTotalPrice(0);
      }
    }
  }, [startTime, endTime, product]);

  const checkAvailability = () => {
    if (!startTime || !endTime) return;
    api.get(`/api/rentals/${id}/availability`, {
      params: {
        startTime: startTime.replace("T", "T") + ":00",
        endTime: endTime.replace("T", "T") + ":00",
      }
    })
      .then(res => setAvailable(res.data.available))
      .catch(() => setError("Eroare la verificarea disponibilității."));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime || totalHours <= 0) {
      setError("Selectați un interval valid.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/api/rentals/${id}`, {
        startTime: startTime + ":00",
        endTime: endTime + ":00",
      });
      setSuccess("Rezervare efectuată cu succes! Vă vom contacta pentru confirmare.");
      setStartTime("");
      setEndTime("");
      setTotalHours(0);
      setTotalPrice(0);
    } catch (err) {
      setError(err.response?.data || "Eroare la efectuarea rezervării.");
    }
    setSubmitting(false);
  };

  const now = new Date().toISOString().slice(0, 16);

  if (loading) return (
    <div className="rent-detail-page">
      <Navbar />
      <p style={{ padding: "2rem", color: "#7a6555" }}>Se încarcă...</p>
    </div>
  );

  if (!product) return (
    <div className="rent-detail-page">
      <Navbar />
      <p style={{ padding: "2rem", color: "#c62828" }}>Produsul nu a fost găsit.</p>
    </div>
  );

  return (
    <div className="rent-detail-page">
      <Navbar />

      <div className="rent-detail-container">
        <button className="back-btn" onClick={() => navigate("/rent")}>
          ← Înapoi la închirieri
        </button>

        <div className="rent-detail-layout">
          {/* ── PRODUS INFO ── */}
          <div className="rent-product-card">
            <div className="rent-product-img">
              {product.imageUrl
                ? <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />
                : <span>🎾</span>
              }
            </div>
            <div className="rent-product-info">
              {product.brand && <p className="rent-product-brand">{product.brand}</p>}
              <h2 className="rent-product-name">{product.name}</h2>
              {product.description && (
                <p className="rent-product-desc">{product.description}</p>
              )}
              <div className="rent-price-tag">
                <span className="rent-price-label">Preț per oră</span>
                <span className="rent-price-value">{product.rentPrice} MDL</span>
              </div>
              <div className={`rent-stock ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
                {product.stock > 0 ? "✓ Disponibil" : "✕ Stoc epuizat"}
              </div>
            </div>
          </div>

          {/* ── FORMULAR REZERVARE ── */}
          <div className="rent-form-card">
            <h3 className="rent-form-title">Rezervă acum</h3>

            {success && <div className="rent-success">{success}</div>}
            {error && <div className="rent-error">{error}</div>}

            {available === true && (
              <div className="rent-available">✓ Produsul este disponibil în intervalul selectat!</div>
            )}
            {available === false && (
              <div className="rent-unavailable">✕ Produsul nu este disponibil în acest interval.</div>
            )}

            <form onSubmit={handleSubmit} className="rent-form">
              <div className="rent-form-group">
                <label>Data și ora de început</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  min={now}
                  onChange={e => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="rent-form-group">
                <label>Data și ora de sfârșit</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  min={startTime || now}
                  onChange={e => setEndTime(e.target.value)}
                  required
                />
              </div>

              {totalHours > 0 && (
                <div className="rent-summary">
                  <div className="rent-summary-row">
                    <span>Durata</span>
                    <span>{totalHours} {totalHours === 1 ? "oră" : "ore"}</span>
                  </div>
                  <div className="rent-summary-row">
                    <span>Preț per oră</span>
                    <span>{product.price} MDL</span>
                  </div>
                  <div className="rent-summary-divider" />
                  <div className="rent-summary-row rent-summary-total">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} MDL</span>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="btn-check"
                onClick={checkAvailability}
                disabled={!startTime || !endTime || totalHours <= 0}
              >
                Verifică disponibilitatea
              </button>

              <button
                type="submit"
                className="btn-reserve"
                disabled={submitting || product.stock === 0 || totalHours <= 0}
              >
                {submitting ? "Se procesează..." : "Confirmă rezervarea"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}