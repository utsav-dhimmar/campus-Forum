import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function GuestOnly() {
  const { data: userData } = useAuthStore();

  if (userData) {
    if (userData.role?.toLowerCase() === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
