import {} from "lucide-react";
import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/ProductDetail";
import Cart from "./Cart/Cart";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import PrivateRoute from "./components/PrivateRoute";
import Wishlist from "./Wishlist page/Wishlist";
import CategoryPage from "./Home_page_Card/CategoryPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/cartpage" element={<Cart />} />
        <Route path="/check-out" element={<Checkout />} />
        <Route path="/order-confirmation" element={<Order />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Other routes */}
        {/* <Route path="/category/:categoryName" element={<CategoryPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
