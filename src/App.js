import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAdd from "./pages/admin/AdminAdd";
import AdminEdit from "./pages/admin/AdminEdit";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add" element={<AdminAdd />} />
        <Route path="/admin/edit/:id" element={<AdminEdit />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;