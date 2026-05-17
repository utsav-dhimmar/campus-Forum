import AdminApp from "../admin/App";
import Dashboard from "../pages/admin/Dashboard";
import {
  LoginPage as AdminLogin,
  Analytics as AnalyticsPage,
  PostDetails,
  UserDetails,
} from "../pages/admin";
import { Navigate, Outlet, Route, useLocation } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminProtected() {
  const { pathname } = useLocation();
  const { data: userData } = useAuthStore();

  const isAuthenticate = !!userData;

  if (!isAuthenticate) {
    return <Navigate to="/" replace />;
  }

  if (userData?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (pathname === "/admin-login") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export const adminRoutes = (
  <>
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminApp />}>
      <Route element={<AdminProtected />}>
        <Route index element={<Dashboard />} />
        <Route path="user/:userId" element={<UserDetails />} />
        <Route path="post/:postId" element={<PostDetails />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Route>
  </>
);
