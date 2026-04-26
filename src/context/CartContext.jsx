import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const loadCart = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get("/api/cart")
      .then(res => {
        const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadCart();
  }, []);

  const clearCart = () => setCartCount(0);

  return (
    <CartContext.Provider value={{ cartCount, loadCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}