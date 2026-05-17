import authService from "@/services/auth.services.ts";
import { Link } from "react-router";
import Button from "./Button.tsx";
import { useAuthStore } from "@/store/useAuthStore.ts";

type LogoutProps = { onClick: () => void };

function Logout({ onClick }: LogoutProps) {
  return (
    <Button type="button" onClick={onClick} className="btn btn-error btn-sm">
      Logout
    </Button>
  );
}

export default function Header() {
  const { data, logout } = useAuthStore();

  const handleClick = () => {
    authService
      .logout()
      .then(() => logout())
      .catch(() => {});
  };

  const navItems = [
    { name: "Raise Query", path: "raise-query", isActive: data },
    { name: "My Answer", path: "my-answer", isActive: data },
    { name: "My Post", path: "my-post", isActive: data },
    { name: "Profile", path: "get-info", isActive: data },
    { name: "Login", path: "/login", isActive: !data },
    { name: "Register", path: "/signup", isActive: !data },
    { name: "Admin Login", path: "/admin-login", isActive: !data },
  ];

  return (
    <header className="p-2">
      <nav className="navbar bg-base-100 shadow-md rounded-box px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold text-primary normal-case">
            Campus Forum
          </Link>
          {data?.role === "MODERATOR" && (
            <span className="badge badge-info gap-2 ml-2">{data.role}</span>
          )}
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-2 items-center">
            {navItems.map(
              (item) =>
                item.isActive && (
                  <li key={item.name}>
                    <Link to={item.path} className="rounded-lg">
                      {item.name}
                    </Link>
                  </li>
                ),
            )}
            {data && (
              <li>
                <Logout onClick={handleClick} />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
