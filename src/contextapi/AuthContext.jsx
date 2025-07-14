import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Api } from "../commonapi/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userid : ", userId);
    if (userId) {
      Api.get(`/users/${userId}`)
        .then((res) => setCurrentUser(res.data))
        .catch((err) => {
          console.error("Failed to restore user on refresh", err);
          localStorage.removeItem("userid");
        });
    }
  }, []);
  


  // Login
  const loginUser = async (email, password) => {
    try {
      const res = await Api.get(`/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        const userData = res.data[0];
        console.log("userData from login", userData);
        if (userData.isBlock) throw new Error("user is Blocked");
        setCurrentUser(userData);
        localStorage.setItem("userId", userData.id);
        toast.success("Login Succesfully");
        return true;
      } else {
        toast.error("In-valid credentials");
        return false;
      }
    } catch {
      toast.error("Login failed. Please try again.");
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
      value={{ currentUser, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
