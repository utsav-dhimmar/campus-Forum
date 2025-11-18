import { Link } from "react-router";
import { useAuth } from "../context/User.context.js";
import authService from "../services/auth.services.js";
import Button from "./Button.jsx";

function Logout({ onClick }) {
	return (
		<Button
			type="button"
			onClick={onClick}
			className="btn btn-danger btn-sm"
		>
			Logout
		</Button>
	);
}

export default function Header() {
	const { data, logout } = useAuth();

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
		<header>
			<nav className="navbar bg-light shadow-sm rounded m-2 p-3">
				<div className="container-fluid d-flex flex-column flex-md-row justify-content-md-between align-items-center">
					{/* Brand and Moderator Badge */}
					<div className="d-flex align-items-center mb-3 mb-md-0">
						<Link
							to="/"
							className="navbar-brand fw-bold text-primary fs-4"
						>
							Campus Forum
						</Link>
						{data?.role === "MODERATOR" && (
							<span className="badge bg-info text-dark ms-2">
								{data.role}
							</span>
						)}
					</div>

					{/* Navigation Links */}
					<ul className="nav d-flex flex-column flex-md-row align-items-center gap-2">
						{navItems.map(
							item =>
								item.isActive && (
									<li className="nav-item" key={item.name}>
										<Link
											className="nav-link"
											to={item.path}
										>
											{item.name}
										</Link>
									</li>
								),
						)}
						{data && (
							<li className="nav-item mt-2 mt-md-0 ms-md-2">
								<Logout onClick={handleClick} />
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
}
