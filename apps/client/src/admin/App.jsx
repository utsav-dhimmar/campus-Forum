import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "../components";
import { useAuth } from "../context/User.context";
import adminService from "../services/admin.services";

import { useEffect, useState } from "react";

function Logout({ onClick }) {
  return (
    <Button type="button" onClick={onClick} className="btn-danger">
      Logout
    </Button>
  );
}
export default function AdminApp() {
  const [message, setMessage] = useState("");
  const { login, logout, data } = useAuth();

  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await adminService.logout();
      if (res) {
        logout();
        return navigate("/", { replace: true });
      }
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")) ?? false;
    if (user) {
      login(user);
    } else {
      logout();
    }
  }, []);
  return (
    <>
      <main className="container">
        <h1>Admin Dashboard</h1>
        <div className="d-flex gap-2">
          <Link to={"/admin"} className="btn btn-sm btn-outline-primary">
            Dashboard
          </Link>
          <Link
            to={"/admin/analytics"}
            className="btn btn-sm btn-outline-primary"
          >
            Analytics Page
          </Link>
          <Logout
            onClick={handleClick}
            className="btn btn-sm btn-outline-danger"
          >
            Logout
          </Logout>
        </div>
        <Outlet />
      </main>
    </>
  );
}
