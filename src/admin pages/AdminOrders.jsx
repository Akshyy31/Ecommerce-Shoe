import React, { useEffect, useState } from "react";
import { Api } from "../commonapi/api";
import { MapPin, Package, User, Trash2 } from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await Api.get("/users");
        const allOrders = [];

        res.data.forEach((user) => {
          user.orders?.forEach((order, index) => {
            allOrders.push({
              ...order,
              userId: user.id,
              username: user.username || user.name,
              email: user.email,
              address: user.address,
              id: order.id || index,
            });
          });
        });

        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (userId, orderId, newStatus) => {
    try {
      const res = await Api.get(`/users/${userId}`);
      const updatedOrders = res.data.orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      await Api.patch(`/users/${userId}`, { orders: updatedOrders });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const deleteOrder = async (userId, orderId) => {
    try {
      const res = await Api.get(`/users/${userId}`);
      const updatedOrders = res.data.orders.filter((o) => o.id !== orderId);
      await Api.patch(`/users/${userId}`, { orders: updatedOrders });
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const filteredOrders = orders
    .filter((order) =>
      statusFilter === "all" ? true : order.status === statusFilter
    )
    .filter(
      (order) =>
        order.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const statusConfig = {
    pending: {
      color: "border-yellow-300 text-yellow-700",
      bg: "bg-yellow-50",
      icon: "🕐",
    },
    processing: {
      color: "border-blue-300 text-blue-700",
      bg: "bg-blue-50",
      icon: "🔄",
    },
    delivered: {
      color: "border-green-300 text-green-700",
      bg: "bg-green-50",
      icon: "✅",
    },
  };

  return (
    <div className="p-1 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">


        <div className="flex flex-wrap items-center gap-3 m-3">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {["pending", "processing", "delivered"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-sm shadow-sm transition px-4 py-2 rounded-md  
          ${
            statusFilter === status
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-blue-100 text-gray-700 border-gray-700 hover:bg-blue-200"
          }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user/email"
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md px-4 py-2 text-sm shadow-sm w-full md:w-64 transition"
          />

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md px-4 py-2 text-sm shadow-sm transition"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className="space-y-4">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <div
                key={order.id}
                className={`relative overflow-hidden rounded-2xl shadow-md m-5 hover:shadow-lg transition-all duration-300 border-l-4 ${
                  order.status === "pending"
                    ? "border-l-amber-400"
                    : order.status === "processing"
                    ? "border-l-blue-400"
                    : "border-l-green-400"
                } bg-white`}
              >
                <div
                  className={`${
                    statusConfig[order.status].bg
                  } px-3 border-b border-gray-100`}
                >
                  <div className="flex justify-between p-2  items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800 text-sm">
                          {order.username}
                        </h6>
                        <p className="text-xs text-gray-600">{order.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2 rounded-full text-xs font-medium border ${
                          statusConfig[order.status].color
                        }`}
                      >
                        {statusConfig[order.status].icon} {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 ">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2  bg-gray rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 text-xs truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center p-1 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-blue-700 text-sm">
                        ₹{order.total}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(
                              order.userId,
                              order.id,
                              "processing"
                            )
                          }
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs font-medium"
                        >
                          Start Processing
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(
                              order.userId,
                              order.id,
                              "delivered"
                            )
                          }
                          className="px-3 py-1 bg-blue-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No orders found</p>
              <p className="text-gray-400 text-sm">
                Orders will appear here once customers place them
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1.5 rounded border text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
