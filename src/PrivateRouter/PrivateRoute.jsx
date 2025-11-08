// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-yellow-400 text-lg font-semibold">
        Checking authentication...
      </div>
    );
  }

  // ✅ If user not logged in, redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // ✅ Otherwise, allow access
  return <Outlet />;
};

export default PrivateRoute;
