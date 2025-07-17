import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../commonapi/api';

function Userdetails() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  


  useEffect(() => {
    fetchData();
  }, [id]);

 const fetchData = async () => {
  try {
    // Get user details
    const userRes = await Api.get(`/users/${id}`);
    const user = userRes.data;
    setUserDetails(user);

    // Get wishlist for this user
    const wishlistRes = await Api.get(`/wishlist?userId=${id}`);
    setWishlistItems(wishlistRes.data);

    // Get cart items for this user
    const cartRes = await Api.get(`/cart?userId=${id}`);
    setCartItems(cartRes.data);

    // Get orders for this user
    const ordersRes = await Api.get(`/orders?userId=${id}`);
    setUserOrders(ordersRes.data);
  } catch (error) {
    console.error("Error loading user data:", error);
  }
};

  
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Details</h2>
      
      <div className="space-y-2 mb-8">
        <p><strong>Name:</strong> {userDetails.username}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Status:</strong> <span className={userDetails.isBlocked ? "text-red-500" : "text-green-600"}>{userDetails.isBlocked ? "Blocked" : "Active"}</span></p>
        <p><strong>Role:</strong> {userDetails.role}</p>
      </div>

      {/* Wishlist */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Wishlist</h3>
        {wishlistItems.length ? (
          <ul className="list-disc pl-6">
            {wishlistItems.map(item => (
              <li key={item.id}>
                {item.title} - ₹{item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items in wishlist.</p>
        )}
      </div>

      {/* Cart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Cart</h3>
        {cartItems.length ? (
          <ul className="list-disc pl-6">
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} - ₹{item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Cart is empty.</p>
        )}
      </div>

      {/* Orders */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Orders</h3>
        {userOrders.length ? (
          <ul className="list-disc pl-6">
            {userOrders.map(order => (
              <li key={order.id}>
                Order #{order.id} - ₹{order.total} - <span className="italic">{order.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No orders placed yet.</p>
        )}
      </div>
    </div>
  );
}

export default Userdetails;
