import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sale from "./pages/Sale";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAdd from "./pages/admin/AdminAdd";
import AdminEdit from "./pages/admin/AdminEdit";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Rent from "./pages/Rent";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import Contact from "./pages/Contact";
import { FavouritesProvider } from "./context/FavouritesContext";
import { CartProvider } from "./context/CartContext";
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <FavouritesProvider>
          <CartProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/sale" element={<PrivateRoute><Sale /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/rent" element={<PrivateRoute><Rent /></PrivateRoute>} />
        <Route path="/admin/products" element={<PrivateRoute><AdminProducts /></PrivateRoute>} />
        <Route path="/admin/add" element={<PrivateRoute><AdminAdd /></PrivateRoute>} />
        <Route path="/admin/edit/:id" element={<PrivateRoute><AdminEdit /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
<Route path="/favourites" element={<PrivateRoute><Favourites /></PrivateRoute>} />
<Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
      </Routes>
      </CartProvider>
      </FavouritesProvider>
    </BrowserRouter>
  );
}

export default App;