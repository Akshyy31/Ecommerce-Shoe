import React, { useContext, useState } from "react";
import CartContext from "../contextapi/CartContext";
import Navbar1 from "../Navbar/Navbar1";
import { Link } from "react-router-dom";
import AuthContext from "../contextapi/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const { cart, increment, decrement, removeFromCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar1 />

      <div className="w-full mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">
          Your Shopping Cart ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <h2 className="text-xl mb-6">
              There are no products in your Shopping Cart.
            </h2>
            <div className="text-left mt-10">
              <h3 className="font-semibold text-gray-800 mb-2">
                POPULAR SEARCHES
              </h3>
              <p className="text-sm text-gray-600">
                Women's Shoes | Walking Shoes for Women | Walking Shoes for Men
                | Men's Shoes | Running Shoes for Women | Running Shoes for Men
                | Women's Slippers | Men's Slippers | Kids Shoes | Slip-Ins |
                Men's Jackets | Women's Jacket | Men's T-Shirts | Sports Bra |
                Arch Fit Shoes | Memory Foam | Goga Mat | GO Walk | James Gold
                Crown Collection | GO Run | Mark Nason | Kids Light Up Shoes |
                Tokidoki | Shoes Sale | Running Shoes | Walking Shoes |
                Trail-Hiking | Black Shoes | White Shoes | Pink Shoes | Blue
                Shoes
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              {cart.map((item) => (
                <div key={item.id} className="mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Style: # {item.styleNumber || "220421-GYNV"}
                      </p>
                      <p className="text-sm text-gray-600">
                        color: {item.color || "GREY/NAVY"}
                      </p>
                      <p className="text-sm text-gray-600">
                        size: {item.size || "8"}
                      </p>
                      <p className="text-sm text-green-600 mt-1">In Stock</p>
                      <button className="text-sm text-blue-600 mt-2 hover:underline">
                        Apply Coupon
                      </button>
                    </div>
                    <div className="flex flex-col items-end">
                      <button
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure to Remove the item"
                          );
                          if (confirmDelete) removeFromCart(item.id);
                        }}
                        className="text-gray-500 hover:text-black text-sm mb-4"
                      >
                        Remove
                      </button>
                      <div className="flex items-center">
                        <button
                          onClick={() => decrement(item.id)}
                          className="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => increment(item.id)}
                          className="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <h2 className="font-bold text-lg mb-4">PRICE DETAILS</h2>
              <div className="flex justify-between mb-2">
                <span>Total Cart MRP Value ({cart.length} Items)</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Discount</span>
                <span>-₹0.00</span>
              </div>
              <div className="flex justify-between border-t pt-4 mb-6">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold">
                  ₹{totalPrice.toLocaleString("en-IN")}.00
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                All prices are including tax*
              </p>

              <div className="flex justify-between">
                <Link
                  to="/productlist"
                  className="px-5 py-2 !bg-black !text-white  border border-black rounded hover:no-underline hover:bg-gray-100 transition text-sm"
                >
                  CONTINUE SHOPPING
                </Link>
                <button
                  onClick={() => {
                    if (!currentUser) {
                      toast.error("Login to Proceed to Check-out");
                    } else {
                      navigate("/check-out");
                    }
                  }}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition text-sm"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
