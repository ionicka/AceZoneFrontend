import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./Admin.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch {
      setError("Eroare la încărcarea produselor.");
    }
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

  return (
    <div className="admin-page">
      <AdminHeader />
      <div className="admin-content">
        <div className="admin-table-section">
          <div className="section-header">
            <h2>Toate produsele ({products.length})</h2>
            <button className="btn-primary" onClick={() => navigate("/admin/add")}>
              + Adaugă produs
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nume</th>
                <th>Categorie</th>
                <th>Brand</th>
                <th>Preț</th>
                <th>Stoc</th>
                <th>Disponibil</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td>
                    {p.oldPrice && <span className="price-old">${p.oldPrice} </span>}
                    <span>${p.price}</span>
                  </td>
                  <td>{p.stock}</td>
                  <td>
                    <span className={`status ${p.available ? "active" : "inactive"}`}>
                      {p.available ? "Da" : "Nu"}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn-edit"
                      onClick={() => navigate(`/admin/edit/${p.id}`)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>
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

function AdminHeader() {
  const navigate = useNavigate();
  return (
    <header className="admin-header">
      <span className="logo">ArenaTenis — Admin</span>
      <button onClick={() => navigate("/home")} className="back-btn">
        Înapoi la site
      </button>
    </header>
  );
}