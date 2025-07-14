import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "tailwindcss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextapi/AuthContext.jsx";
import { CartProvider } from "./contextapi/CartContext.jsx";
import { WishlistProvider } from "./contextapi/WishListContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              theme="colored"
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
