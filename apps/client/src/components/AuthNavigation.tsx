import { Link } from "react-router";

type AuthNavigationProps = {
  value: "login" | "Register";
};

export default function AuthNavigation({ value }: AuthNavigationProps) {
  const isLoginPage = value === "login";

  return (
    <div className="text-center mt-6 p-4 border-t border-base-300">
      <div className="auth-navigation">
        {isLoginPage ? (
          <div>
            <p className="opacity-60 mb-2">
              New user?{" "}
              <Link
                to="/signup"
                className="link link-primary font-semibold no-underline hover:underline"
              >
                Register Now
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <p className="opacity-60 mb-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-secondary font-semibold no-underline hover:underline"
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
