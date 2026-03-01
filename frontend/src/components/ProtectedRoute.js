import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAuthenticated,
  requiredRole = null,
  userRole = null,
}) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    navigate("/dashboard");
    return null;
  }

  return children;
};

export default ProtectedRoute;
