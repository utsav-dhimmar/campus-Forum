import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/User.context";

export default function GuestOnly() {
	const { data: userData } = useAuth();
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
