import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isUser, isAdmin, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth(); // wait until auth check finishes
      setLoading(false); // now safe to continue
    };
    verify();
  }, []);

  const userRole = user?.user?.role;

  console.log("user:", user);
  console.log("user role:", userRole);
  console.log("required role:", requiredRole);
  console.log("isUser:", isUser);
  console.log("isAdmin:", isAdmin);

  if (loading) {
    return <div>Loading...</div>; // Or your loading spinner
  }

  const isAuthenticated = requiredRole === "user" ? isUser : isAdmin;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
