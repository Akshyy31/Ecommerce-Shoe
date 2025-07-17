import React, { useEffect, useState } from "react";
import { Api } from "../commonapi/api";
import { Ban, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function Users() {
  const [userList, setUserList] = useState([]);
  

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Api.get("/users");
        // Filter out admins
        const nonAdminUsers = res.data.filter((user) => user.role !== "admin");
        setUserList(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Toggle block/unblock user
  const handleToggleBlock = async (userId) => {
    const user = userList.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser = { ...user, blocked: !user.blocked };

    try {
      await Api.patch(`/users/${userId}`, updatedUser);
      setUserList((prev) =>
        prev.map((u) => (u.id === userId ? updatedUser : u))
      );
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="p-5 bg-white min-h-screen">
      <h5 className="text-3xl font-bold text-gray-800 mb-6">User Management</h5>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userList.length > 0 ? (
          userList.map((user) => (
            <div
              key={user.id}
              className="bg-white p-5 rounded-xl shadow-md border"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.username}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  <span className="capitalize">{user.role}</span>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {user.blocked ? (
                    <span className="text-red-500 font-medium">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-medium">Active</span>
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleToggleBlock(user.id)}
                  className={`rounded-lg flex items-center justify-center gap-1 px-3 py-2  text-xs font-semibold text-white ${
                    user.blocked
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {user.blocked ? <CheckCircle size={14} /> : <Ban size={14} />}
                  <span className=" text-center">
                    {user.blocked ? "Unblock" : "Block"}
                  </span>
                </button>
                <Link to={`/admin/users/${user.id}`}
                  type="button"
                  className="!bg-green-500 px-3 py-2 !text-white rounded-lg !no-underline hover:no-underline"
                >
                  View More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-6">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Users;
