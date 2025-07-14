import React, { useContext } from "react";
import WishlistContext from "../contextapi/WishListContext";
import CartContext from "../contextapi/CartContext";
import { toast } from "react-toastify";
import Navbar1 from "../Navbar/Navbar1";

function Wishlist() {
  
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Item added to cart");
  };

  return (
    <div>
      <Navbar1 />

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          My Wishlist
        </h2>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 object-contain rounded-md mb-3"
                />
                <div className="flex-grow space-y-1">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                  <p className="text-indigo-600 font-bold text-lg">
                    ₹{item.price}
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
