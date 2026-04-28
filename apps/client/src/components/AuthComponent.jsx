import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/User.context";

export default function AuthComponent() {
  const { pathname } = useLocation();
  const { data: userData } = useAuth();

  const isAuthenticate = !!userData;

  if (isAuthenticate && userData?.role === "admin") {
    return <Navigate to={"/admin"} replace />;
  }
  if (!isAuthenticate && pathname !== "/login" && pathname !== "/register") {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticate && (pathname === "/login" || pathname === "/register")) {
    console.log("redirect");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
