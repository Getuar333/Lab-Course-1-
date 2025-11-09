import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // Mund të kthejë një spinner ose thjesht null derisa të kontrollohet user
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/loginpage" replace />;
  }

  return children;
};

export default ProtectedRoute;
