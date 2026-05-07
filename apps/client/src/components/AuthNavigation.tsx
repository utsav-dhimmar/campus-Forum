import { Link } from "react-router";

type AuthNavigationProps = {
	value: "login" | "Register";
};

export default function AuthNavigation({ value }: AuthNavigationProps) {
	const isLoginPage = value === "login";

	return (
		<div className="text-center mt-4 p-3 border-top">
			<div className="auth-navigation">
				{isLoginPage ? (
					<div>
						<p className="text-muted mb-1">
							New user?{" "}
							<Link
								to="/signup"
								className="text-primary text-decoration-none fw-semibold"
							>
								Register Now
							</Link>
						</p>
					</div>
				) : (
					<div>
						<p className="text-muted mb-1">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-success text-decoration-none fw-semibold"
							>
								Login Now
							</Link>
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
