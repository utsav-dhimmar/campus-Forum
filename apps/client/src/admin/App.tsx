import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "../components";
import { useAuth } from "../context/User.context";
import adminService from "../services/admin.services";

import { useEffect, useState } from "react";

interface LogoutProps {
  onClick: () => Promise<void>;
}

function Logout({ onClick }: LogoutProps) {
  return (
    <Button type="button" onClick={onClick} className="btn-danger btn-sm">
      Logout
    </Button>
  );
}
export default function AdminApp() {
  const [message, setMessage] = useState("");
  const { login, logout } = useAuth();

  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await adminService.logout();
      if (res) {
        logout();
        return navigate("/", { replace: true });
      }
    } catch (error: any) {
      setMessage(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    if (user) {
      login(user);
    } else {
      logout();
    }
  }, [login, logout]);

  return (
    <>
      <main className="container">
        <h1>Admin Dashboard</h1>
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="d-flex gap-2">
          <Link to={"/admin"} className="btn btn-sm btn-outline-primary">
            Dashboard
          </Link>
          <Link to={"/admin/analytics"} className="btn btn-sm btn-outline-primary">
            Analytics Page
          </Link>
          <Logout onClick={handleClick} />
        </div>
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
