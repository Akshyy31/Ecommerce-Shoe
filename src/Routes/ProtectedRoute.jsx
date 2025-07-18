import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contextapi/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { currentUser } = useContext(AuthContext);

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return (
      <Navigate to={currentUser.role === "admin" ? "/admin/dashboard" : "/"} replace />
    );
  }

  // ✅ Authorized access
  return <Outlet />;
};

export default ProtectedRoute;
