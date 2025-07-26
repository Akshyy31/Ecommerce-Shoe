import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../contextapi/CartContext";
import AuthContext from "../contextapi/AuthContext";
import Navbar1 from "../Navbar/Navbar1";
import { Api } from "../commonapi/api";

const Checkout = () => {
  const { cart, getTotalAmount, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      alert("Please log in to place an order.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    try {
      const userRes = await Api.get(`/users/${currentUser.id}`);
      const user = userRes.data;
      
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        total: getTotalAmount(),
        status:"pending"
      };

      const updatedOrders = [...(user.orders || []), newOrder];

      await Api.patch(`users/${currentUser.id}`, {
        orders: updatedOrders,
        cart: [],
      });

      clearCart();
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Something went wrong placing the order.");
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="bg-gray-100 min-h-screen py-10 pt-3">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form & Cart Items */}
          <div className="lg:col-span-2 bg-white  rounded-2xl shadow-md p-5">
          

            {/* Shipping Info */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Shipping Address
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border px-4 py-3 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border px-4 py-3 rounded-md"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border px-4 py-3 rounded-md md:col-span-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="border px-4 py-3 rounded-md md:col-span-2"
                  required
                />
                
              </form>
            </section>

            {/* Cart Items */}
            <section className="mt-8 p-2">
              <h5 className="text-xl font-semibold text-gray-700 mb-4">
                Your Items
              </h5>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border p-3 rounded-lg shadow-sm bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-md h-fit sticky top-24 p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-700 p-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <p>{item.name}</p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-red-600">₹{getTotalAmount()}</span>
              </div>
            </div>

            <button
              className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
