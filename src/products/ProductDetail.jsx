import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Api } from "../commonapi/api";
import AuthContext from "../contextapi/AuthContext";
import CartContext from "../contextapi/CartContext";
import WishlistContext from "../contextapi/WishListContext";
import Navbar1 from "../Navbar/Navbar1";
import { toast, ToastContainer } from "react-toastify";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("7");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} item(s) added to cart.`);
  };

  const handleToggleWishlist = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    toggleWishlist(product);

    if (isInWishlist(product.id)) {
      toast.info("Removed from wishlist", { position: "top-right" });
    } else {
      toast.success("Added to wishlist", { position: "top-right" });
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div>
      <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  marginTop: "20px", // Optional: add space from top
                },
              }}
            />
      <Navbar1 />
      <div className="container mx-auto p-4 min-h-screen">
        <ToastContainer />

        <div className="max-w-8xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 shadow-md rounded-lg p-4 bg-amber-100">
            {/* Product Image */}
            <div className="flex flex-col gap-4 justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-[400px] object-contain"
              />
              <div className="grid grid-cols-3 gap-2">
                <img src={product.image1} className="h-24 bg-white p-2 rounded" alt="img1" />
                <img src={product.image2} className="h-24 bg-white p-2 rounded" alt="img2" />
                <img src={product.image3} className="h-24 bg-white p-2 rounded" alt="img3" />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              {/* Wishlist Icon */}
              <div className="flex justify-end text-3xl">
                {isInWishlist(product.id) ? (
                  <FaHeart onClick={handleToggleWishlist} className="text-red-500 cursor-pointer" />
                ) : (
                  <FaHeartBroken onClick={handleToggleWishlist} className="text-gray-400 cursor-pointer" />
                )}
              </div>

              <h2 className="text-2xl text-red-500 font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="text-lg font-semibold text-black">
                ₹ {Number(product.price).toLocaleString()}
              </div>

              {/* Size Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700">Select Size</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.available_sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-3 py-1 rounded-full text-sm ${
                        selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                      }`}
                    >
                      {size}
                    </button>
                  )) || <span>No sizes available</span>}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={decrementQuantity} className="px-3 py-1 border rounded">
                    -
                  </button>
                  <span className="w-10 text-center">{String(quantity).padStart(2, "0")}</span>
                  <button onClick={incrementQuantity} className="px-3 py-1 border rounded">
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-1/2 bg-red-600 text-white py-3 rounded hover:bg-red-700"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className="w-1/2 border border-gray-400 text-gray-700 py-3 rounded hover:bg-gray-100"
                >
                  {isInWishlist(product.id)
                    ? "♥ REMOVE FROM WISHLIST"
                    : "♡ ADD TO WISHLIST"}
                </button>
              </div>

              {/* Additional Info */}
              <div className="p-4 border-t mt-2">
                <h3 className="font-bold text-xl mb-2">Product Details</h3>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.in_stock ? "In Stock" : "Available"}</p>
                <p><strong>More:</strong> {product.additional_details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
