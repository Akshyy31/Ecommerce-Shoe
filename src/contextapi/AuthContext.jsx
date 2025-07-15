import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Api } from "../commonapi/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    Api.get(`/users/${userId}`)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => {
        console.error("Failed to restore user on refresh", err);
        localStorage.removeItem("userId");
      })
      .finally(() => setLoading(false)); // ✅ stop loading
  } else {
    setLoading(false); // ✅ no user to restore
  }
}, []);
  

  // Login
  const loginUser = async (email, password) => {
  try {
    const res = await Api.get(`/users?email=${email}&password=${password}`);

    if (res.data.length === 0) {
      toast.error("Invalid credentials");
      return false;
    }

    const userData = res.data[0];

    if (userData.isBlock) {
      toast.error("Your account is blocked. Please contact support.");
      return false;
    }

    setCurrentUser(userData);
    localStorage.setItem("userId", userData.id);
    toast.success("Login successful!");
    return userData; // return full user object

  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed. Please try again.");
    return false;
  }
};


  //Registration
  const registerUser = async (formData) => {
    try {
      const existingUsers = await Api.get(`/users?email=${formData.email}`);
      console.log(existingUsers);

      if (existingUsers.data.length > 0) {
        toast.warning("Email already registered. Please login.");
        navigate("/");
        return;
      }
      await Api.post("/users", formData);
      // alert("Registration successful!");
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error("Error registering user", err);
    }
  };

  //Logout 
  const logoutUser = () => {
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, registerUser, loginUser, logoutUser , loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
