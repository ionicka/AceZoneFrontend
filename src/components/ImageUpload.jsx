import { useState, useRef } from "react";
import api from "../api/axiosConfig";
import "./ImageUpload.css";

export default function ImageUpload({ value, onChange }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      onChange(res.data);
    } catch {
      alert("Eroare la încărcarea imaginii.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleClick = () => inputRef.current.click();

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    onChange("");
  };

  return (
    <div
      className={`upload-zone ${dragging ? "dragging" : ""} ${preview ? "has-preview" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={e => handleFile(e.target.files[0])}
      />

      {preview ? (
        <div className="preview-container">
          <img src={preview} alt="preview" className="preview-img" />
          {uploading && <div className="upload-overlay">Se încarcă...</div>}
          <button className="remove-btn" onClick={handleRemove}>✕</button>
        </div>
      ) : (
        <div className="upload-placeholder">
          <span className="upload-icon">&#128247;</span>
          <p>Trage imaginea aici sau <span className="upload-link">selecteaz-o</span></p>
         
        </div>
      )}
    </div>
  );
}