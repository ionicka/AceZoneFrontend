import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./Admin.css";
import ImageUpload from "../../components/ImageUpload";
import Navbar from "../../components/Navbar";
const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  imageUrl: "",
  stock: "",
  available: true,
  rentable: false,
};

const categories = [
  "Rackets",
  "Shoes",
  "Balls",
  "Bags",
  "Clothing",
  "Accessories",
];

export default function AdminAdd() {
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/products", form);
      setSuccess("Produs adăugat cu succes!");
      setForm(emptyForm);
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch {
      setError("Eroare la adăugarea produsului.");
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-content">
        <div className="admin-form-section">
          <h2>Adaugă produs nou</h2>
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
                <input value={form.brand} onChange={update("brand")} />
              </div>
            </div>
            <div className="form-group">
              <label>Descriere</label>
              <textarea
                value={form.description}
                onChange={update("description")}
                rows={3}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Preț ($) *</label>
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
            <div className="form-row">
              <div className="form-group">
                <label>Categorie *</label>
                <select
                  value={form.category}
                  onChange={update("category")}
                  required
                >
                  <option value="">Selectează...</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Disponibil</label>
                <select
                  value={form.available}
                  onChange={(e) =>
                    setForm({ ...form, available: e.target.value === "true" })
                  }
                >
                  <option value="true">Da</option>
                  <option value="false">Nu</option>
                </select>
              </div>
              <div className="form-group">
                <label>Acces Chirie</label>
                <select
                  value={form.rentable}
                  onChange={(e) =>
                    setForm({ ...form, rentable: e.target.value === "true" })
                  }
                >
                  <option value="false">Nu</option>
                  <option value="true">Da</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Imagine</label>
              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Adaugă produs
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
