// CartContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { Api } from "../commonapi/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const cartCount = cart.length; 

  // Fetch cart from backend on login
  useEffect(() => {
    if (currentUser?.id) fetchCart();
  }, [currentUser]);

  const fetchCart = async () => {
    try {
      const res = await Api.get(`/users/${currentUser.id}`);
      console.log("result of user from cart:", res);
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateBackendCart = async (newCart) => {
    if (!currentUser) {
      return;
    }
    try {
      await Api.patch(`/users/${currentUser.id}`, {
        cart: newCart,
      });
    } catch (err) {
      console.error("Error syncing cart from update backend:", err);
    }
  };


  // add to cart
  const addToCart = async (product, quantity = 1) => {
    if (!currentUser) return;
    try {
      const { data } = await Api.get(`/users/${currentUser.id}`);
      const existingCart = data.cart || [];

      const updatedCart = existingCart.some((item) => item.id === product.id)
        ? existingCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...existingCart, { ...product, quantity }];

      updateBackendCart(updatedCart);
      setCart(updatedCart);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateBackendCart(updatedCart);
  };


  const clearCart = () => {
    setCart([]);
    updateBackendCart([]);
  };

  const increment = (p_id) => {
    const updatedCart = cart.map((item) =>
      item.id === p_id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateBackendCart(updatedCart);
  };

  const decrement = (p_id) => {
    const updatedCart = cart.map((item) =>
      item.id === p_id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    updateBackendCart(updatedCart);
  };

  const getTotalAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cartCount,
        clearCart,
        increment,
        decrement,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
