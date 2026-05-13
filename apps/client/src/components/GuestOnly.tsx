import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function GuestOnly() {
  const { data: userData } = useAuthStore();
  if (!userData) {
    <Navigate to="/login" />;
    return;
  }

  if (userData) {
    <Navigate to="/" replace />;
    return;
  }
  // @ts-ignore
  if (userData?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
