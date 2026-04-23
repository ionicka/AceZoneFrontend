import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./Admin.css";

const categories = ["Rackets", "Shoes", "Balls", "Bags", "Clothing", "Accessories", "Court Rental"];

export default function AdminEdit() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError("Produsul nu a fost găsit."));
  }, [id]);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/products/${id}`, form);
      setSuccess("Produs actualizat cu succes!");
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch {
      setError("Eroare la actualizare.");
    }
  };

  if (!form) return <div className="admin-page"><p style={{padding:"2rem"}}>Se încarcă...</p></div>;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="logo">ArenaTenis — Admin</span>
        <button onClick={() => navigate("/admin/products")} className="back-btn">
          Înapoi la produse
        </button>
      </header>
      <div className="admin-content">
        <div className="admin-form-section">
          <h2>Modifică produs #{id}</h2>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nume *</label>
                <input value={form.name} onChange={update("name")} required />
              </div>
              <div className="form-group">
                <label>Brand</label>
                <input value={form.brand || ""} onChange={update("brand")} />
              </div>
            </div>
            <div className="form-group">
              <label>Descriere</label>
              <textarea value={form.description || ""} onChange={update("description")} rows={3} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Preț ($) *</label>
                <input type="number" step="0.01" value={form.price} onChange={update("price")} required />
              </div>
              <div className="form-group">
                <label>Preț vechi ($)</label>
                <input type="number" step="0.01" value={form.oldPrice || ""} onChange={update("oldPrice")} />
              </div>
              <div className="form-group">
                <label>Stoc</label>
                <input type="number" value={form.stock || ""} onChange={update("stock")} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Categorie *</label>
                <select value={form.category} onChange={update("category")} required>
                  <option value="">Selectează...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Disponibil</label>
                <select value={form.available}
                  onChange={e => setForm({ ...form, available: e.target.value === "true" })}>
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>URL Imagine</label>
              <input value={form.imageUrl || ""} onChange={update("imageUrl")} />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="preview"
                  style={{ marginTop: 8, height: 100, borderRadius: 8, objectFit: "cover" }} />
              )}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Salvează modificările</button>
              <button type="button" className="btn-secondary"
                onClick={() => navigate("/admin/products")}>
                Anulează
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}