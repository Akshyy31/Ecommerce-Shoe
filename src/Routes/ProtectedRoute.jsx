import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contextapi/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  
  const { currentUser } = useContext(AuthContext);



  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return (
      <Navigate to={currentUser.role === "admin" ? "/admin/dashboard" : "/"} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
