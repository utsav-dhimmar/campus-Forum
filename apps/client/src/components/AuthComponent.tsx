import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthComponent() {
  const { pathname } = useLocation();
  const { data: userData } = useAuthStore();

  const isAuthenticate = !!userData;

  if (isAuthenticate && userData?.role?.toLowerCase() === "admin") {
    return <Navigate to={"/admin"} replace />;
  }
  if (!isAuthenticate && pathname !== "/login" && pathname !== "/signup") {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticate && (pathname === "/login" || pathname === "/signup")) {
    console.log("redirect");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
