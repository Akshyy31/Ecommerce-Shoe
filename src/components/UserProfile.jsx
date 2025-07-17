import React, { useContext, useEffect, useState } from "react";
import { Api } from "../commonapi/api";
import AuthContext from "../contextapi/AuthContext";
import Swal from "sweetalert2";

function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser?.id) {
      Api.get(`/users/${currentUser.id}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Failed to fetch user data", err));
    }
  }, [currentUser]);

  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  const handleChangePassword = async () => {
  const { value: password } = await Swal.fire({
    title: "Enter new password",
    input: "password",
    inputPlaceholder: "New password",
    inputAttributes: {
      minlength: 6,
    },
    showCancelButton: true,
    confirmButtonText: "Update",
    preConfirm: (value) => {
      if (!value || value.length < 6) {
        Swal.showValidationMessage("Password must be at least 6 characters");
        return false;
      }
    },
  });

  if (password) {
    try {
      await Api.patch(`/users/${currentUser.id}`, { password });
      Swal.fire("Success!", "Password changed successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to change password", "error");
    }
  }
};

  return (
    <div className="max-w-4xl mx-auto p-5 m-5 mt-10 bg-blue-300 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
          Profile Information
        </h2>
        
      </div>

      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Profile Image */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-56 h-56 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center shadow-inner">
            <img
              src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
              alt="user_profile"
              className="w-40 h-40 object-cover"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            <div className="bg-gray-50 p-2 rounded-xl">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </span>
              <p className="font-semibold text-gray-800 mt-1">{userData.username}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-xl">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </span>
              <p className="font-semibold text-gray-800 mt-1">{userData.email}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-xl">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </span>
              <p className="font-semibold text-gray-800 mt-1">+91 ******5360</p>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-8">
            <h5 className="text-lg font-semibold text-gray-700 p-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Account Security
            </h5>
            <div className="">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Change Password</p>
                  
                </div>
                <button onClick={handleChangePassword} className="text-sm text-white bg-blue-600 px-3 py-2 hover:text-blue-00 font-medium">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
