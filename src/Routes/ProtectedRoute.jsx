import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contextapi/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Restoring session...</div>;
  }


  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect based on role
    return (
      <Navigate to={currentUser.role === "admin" ? "/admin/dashboard" : "/"} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
