import React, { useEffect, useState } from "react";
import { Api } from "../commonapi/api";
import { Eye, Pencil, Trash } from "lucide-react";
import AddProducts from "./Addproducts";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const res = await Api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate paginated products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Products List</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showAddForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {/* Render Add Product form conditionally */}
      {showAddForm && (
        <AddProducts
          onClose={() => setShowAddForm(false)}
          onAdded={fetchProducts}
        />
      )}

      {/* Products Table */}
      <div className="overflow-x-auto p-3">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 text-sm">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">ID</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, i) => (
              <tr
                key={product.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-800 font-medium">{product.name}</p>
                  </div>
                </td>
                <td className="p-3 text-sm">₹{product.price}</td>
                <td className="p-3 text-sm">#{product.id}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock.toLowerCase() === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded">
                    <Eye size={16} className="text-gray-600" />
                  </button>
                  <button className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded">
                    <Pencil size={16} className="text-yellow-600" />
                  </button>
                  <button className="bg-red-100 hover:bg-red-200 p-2 rounded">
                    <Trash size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {products.length === 0 && (
          <p className="text-gray-500 text-center py-6">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
