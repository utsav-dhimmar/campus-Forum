import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/User.context";

// this component prevents login user to access login or regsiter pages
export default function GuestOnly() {
  const { data: userData } = useAuth();
  if (userData) {
    return <Navigate to="/" replace />;
  }
  if (userData?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
