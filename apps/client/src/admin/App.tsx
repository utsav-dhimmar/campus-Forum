import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "../components";
import adminService from "../services/admin.services";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

interface LogoutProps {
  onClick: () => Promise<void>;
}

function Logout({ onClick }: LogoutProps) {
  return (
    <Button type="button" onClick={onClick} className="btn-error btn-sm">
      Logout
    </Button>
  );
}
export default function AdminApp() {
  const [message, setMessage] = useState("");
  const { logout } = useAuthStore();

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

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <header className="bg-primary text-primary-content shadow-lg p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-black uppercase tracking-tighter">Admin Control Center</h1>
          <nav className="flex items-center gap-3">
            <Link to={"/admin"} className="btn btn-ghost btn-sm font-bold">
              Dashboard
            </Link>
            <Link to={"/admin/analytics"} className="btn btn-ghost btn-sm font-bold">
              Analytics
            </Link>
            <Logout onClick={handleClick} />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        {message && (
          <div className="alert alert-error shadow-lg mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
          </div>
        )}

        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
          <Outlet />
        </div>
      </main>

      <footer className="bg-neutral text-neutral-content p-4 text-center text-xs opacity-50">
        &copy; 2025 Campus Forum Admin Panel. Secure Session Active.
      </footer>
    </div>
  );
}
