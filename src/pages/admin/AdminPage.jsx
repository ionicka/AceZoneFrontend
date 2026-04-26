import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./AdminPage.css";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  imageUrl: "",
  stock: "",
  available: true,
};

const categories = [
  "Rackets",
  "Shoes",
  "Balls",
  "Bags",
  "Clothing",
  "Accessories",
];

export default function AdminPage({ mode = "add" }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch {
      setError("Eroare la încărcarea produselor.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/products/${editingId}`, form);
      } else {
        await api.post("/api/products", form);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchProducts();
    } catch {
      setError("Eroare la salvarea produsului.");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi produsul?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch {
      setError("Eroare la ștergere.");
    }
  };

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="logo">AceZone — Admin</span>
        <button onClick={() => navigate("/home")} className="back-btn">
          Inapoi la site
        </button>
      </header>

      <div className="admin-content">
        <div className="admin-form-section">
          <h2>{editingId ? "Editează produs" : "Adaugă produs nou"}</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nume</label>
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
                <label>Preț ($)</label>
                <input
                  type="number"
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
                <label>Categorie</label>
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
            </div>
            <div className="form-group">
              <label>URL Imagine</label>
              <input
                value={form.imageUrl}
                onChange={update("imageUrl")}
                placeholder="https://..."
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Salvează modificările" : "Adaugă produs"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setForm(emptyForm);
                    setEditingId(null);
                  }}
                >
                  Anulează
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-table-section">
          <h2>Produse ({products.length})</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Categorie</th>
                <th>Preț</th>
                <th>Stoc</th>
                <th>Disponibil</th>
                
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <span
                      className={`status ${p.available ? "active" : "inactive"}`}
                    >
                      {p.available ? "Da" : "Nu"}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(p.id)}
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
