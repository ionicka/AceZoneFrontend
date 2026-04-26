import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./Admin.css";
import ImageUpload from "../../components/ImageUpload";
import Navbar from "../../components/Navbar";

const emptyForm = {
  name: "",
  description: "",
  price: 0,
  category: "",
  brand: "",
  imageUrl: "",
  stock: 10,
  available: true,
  rentable: false,
  rentPrice: "",
};

const categories = [
  "Rackets",
  "Shoes",
  "Balls",
  "Bags",
  "Clothing",
  "Accessories",
  "Court Rental",
];

export default function AdminAdd() {
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isCourt = form.category === "Court Rental";

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    if (cat === "Court Rental") {
      setForm({ ...form, category: cat, rentable: true, price: 0, stock: 10 });
    } else {
      setForm({ ...form, category: cat, rentable: false, rentPrice: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/products", form);
      setSuccess(isCourt ? "Teren adăugat cu succes!" : "Produs adăugat cu succes!");
      setForm(emptyForm);
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch {
      setError("Eroare la adăugare.");
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-content">
        <div className="admin-form-section">
          <h2>{isCourt ? "Adaugă Teren de Tenis" : "Adaugă Produs Nou"}</h2>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="admin-form">

            {/* ── NUME + BRAND ── */}
            <div className="form-row">
              <div className="form-group">
                <label>Nume *</label>
                <input
                  value={form.name}
                  onChange={update("name")}
                  required
                  placeholder={isCourt ? "ex: Teren Central" : "Numele produsului"}
                />
              </div>
              {!isCourt && (
                <div className="form-group">
                  <label>Brand</label>
                  <input value={form.brand} onChange={update("brand")} />
                </div>
              )}
            </div>

            {/* ── DESCRIERE ── */}
            <div className="form-group">
              <label>Descriere</label>
              <textarea
                value={form.description}
                onChange={update("description")}
                rows={3}
                placeholder={isCourt ? "ex: Teren acoperit, suprafață hard court, iluminat LED." : ""}
              />
            </div>

            {/* ── PREȚ + STOC (doar pentru produse normale) ── */}
            {!isCourt && (
              <div className="form-row">
                <div className="form-group">
                  <label>Preț (MDL) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={update("price")}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stoc</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={update("stock")}
                  />
                </div>
              </div>
            )}

            {/* ── CATEGORIE + DISPONIBIL ── */}
            <div className="form-row">
              <div className="form-group">
                <label>Categorie *</label>
                <select value={form.category} onChange={handleCategoryChange} required>
                  <option value="">Selectează...</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Disponibil</label>
                <select
                  value={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.value === "true" })}
                >
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </select>
              </div>

              {/* Acces Chirie — ascuns pentru Court Rental */}
              {!isCourt && (
                <div className="form-group">
                  <label>Acces Chirie</label>
                  <select
                    value={form.rentable}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        rentable: e.target.value === "true",
                        rentPrice: e.target.value === "false" ? "" : form.rentPrice,
                      })
                    }
                  >
                    <option value="false">Nu</option>
                    <option value="true">Da</option>
                  </select>
                </div>
              )}
            </div>

            {/* ── PREȚ ÎNCHIRIERE ── */}
            {(isCourt || form.rentable === true || form.rentable === "true") && (
              <div className="form-group">
                <label>Preț închiriere (MDL/oră) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.rentPrice}
                  onChange={update("rentPrice")}
                  required
                  placeholder="ex: 150"
                />
              </div>
            )}

            {/* ── IMAGINE ── */}
            <div className="form-group">
              <label>Imagine</label>
              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {isCourt ? "Adaugă Teren" : "Adaugă Produs"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/admin/products")}
              >
                Anulează
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}