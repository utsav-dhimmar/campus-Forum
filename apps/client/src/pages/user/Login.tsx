import { useState } from "react";
import { Input, Button, AlertMessage, AuthNavigation } from "../../components";
import authService from "../../services/auth.services";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      await authService
        .login(userData)
        .then((data) => login({ _id: data._id, username: data.username, role: data.role }))
        .then(() => navigate("/"))
        .catch((reason) => setMessage(reason.message));
    } catch (error) {
      console.log(error);
      setMessage(
        (error instanceof Error && error.message) ||
          "An unexpected error occurred. Please try again.",
      );
      // alert(error.message);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const email = e.target.value;
    setUserData((prevData) => ({ ...prevData, email }));

    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const password = e.target.value;
    setUserData((prevData) => ({ ...prevData, password }));

    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              required
              autoComplete="email"
              value={userData.email}
              onChange={handleEmailChange}
            />
            {errors.email && <AlertMessage text={errors.email} />}

            <Input
              label="Password"
              type="password"
              required
              autoComplete="current-password"
              value={userData.password}
              onChange={handlePasswordChange}
            />
            {errors.password && <AlertMessage text={errors.password} />}

            <div className="card-actions mt-4">
              <Button className="btn-primary w-full" type="submit">
                Login
              </Button>
            </div>

            {message && <AlertMessage text={message} autoHide={false} />}
          </form>
          <AuthNavigation value={"login"} />
        </div>
      </div>
    </div>
  );
}
