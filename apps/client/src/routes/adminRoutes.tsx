import AdminApp from "../admin/App";
import Dashboard from "../pages/admin/Dashboard";
import {
  LoginPage as AdminLogin,
  Analytics as AnalyticsPage,
  PostDetails,
  UserDetails,
} from "../pages/admin";
import { Outlet, Route, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminProtected() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: userData } = useAuthStore();

  const isAuthenticate = !!userData;

  useEffect(() => {
    if (!isAuthenticate) {
      navigate("/", { replace: true });
    } else if (isAuthenticate && userData?.role?.toLowerCase() !== "admin") {
      navigate("/", { replace: true });
    } else if (isAuthenticate && pathname === "/admin-login") {
      navigate("/admin", { replace: true });
    }
  }, [userData, pathname, navigate]);

  // console.log(userData, isAuthenticate);
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
