import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, User } from "lucide-react";
import AuthContext from "../contextapi/AuthContext";
import CartContext from "../contextapi/CartContext";
import WishlistContext from "../contextapi/WishListContext";

function Navbar1() {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setShowDropdown(false); // Close dropdown on login/logout
  }, [currentUser]);

  return (
    <div className="relative">
      <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="font-bold text-3xl !text-black hover:no-underline">
                Urban-Foot
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="!text-black hover:text-indigo-600 font-semibold p-3"
              >
                Home
              </Link>
              <Link
                to="/productlist"
                className="!text-black hover:text-indigo-600 font-semibold p-3"
              >
                Products
              </Link>

              <Link
                to="/cartpage"
                className="relative !text-black hover:text-indigo-600 m-3"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/wishlist"
                className="relative !text-black hover:text-indigo-600 m-3"
              >
                <Heart size={24} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Auth Controls */}
              <div className="relative p-3">
                {currentUser ? (
                  <div className="relative">
                    <div
                      className="cursor-pointer px-3 py-1 bg-black text-white rounded-full text-sm"
                      onClick={() => setShowDropdown((prev) => !prev)}
                    >
                      Hi, {currentUser.username}
                    </div>

                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/order-confirmation"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your Orders
                        </Link>
                        <button
                          onClick={logoutUser}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2    !text-black rounded-full text-sm hover:bg-gray-800"
                  >
                    <User />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pt-4 pb-3 space-y-2 bg-white shadow">
            <Link to="/" className="block px-3 py-2 text-gray-800 font-medium">
              Home
            </Link>
            <Link
              to="/productlist"
              className="block px-3 py-2 text-gray-800 font-medium"
            >
              Products
            </Link>
            <Link
              to="/cartpage"
              className="block px-3 py-2 text-gray-800 font-medium"
            >
              Cart ({cartCount})
            </Link>
            <Link
              to="/wishlist"
              className="block px-3 py-2 text-gray-800 font-medium"
            >
              Wishlist ({wishlistCount})
            </Link>
            <Link
              to="/order-confirmation"
              className="block px-3 py-2 text-gray-800 font-medium"
            >
              Orders
            </Link>

            {currentUser ? (
              <>
                <div className="px-3 py-2 text-gray-800 font-medium">
                  Hi, {currentUser.username}
                </div>
                <button
                  onClick={logoutUser}
                  className="block w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-black font-medium bg-gray-200 rounded"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar1;
