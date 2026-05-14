import { useState } from "react";
import { AlertMessage, AuthNavigation, Button, Input } from "../../components";
import authService from "../../services/auth.services";
import { useNavigate } from "react-router";

export default function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const usernameRegex = /^[a-zA-Z_-]{3,20}$/;

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!userData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (userData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    } else if (userData.username.length > 20) {
      newErrors.username = "Username must not exceed 20 characters";
    } else if (!usernameRegex.test(userData.username)) {
      newErrors.username = "Username can only contain letters, numbers, underscores, and hyphens";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (userData.password.length > 128) {
      newErrors.password = "Password must not exceed 128 characters";
    } else if (!/(?=.*[a-z])/.test(userData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(userData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(userData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(userData.password)) {
      newErrors.password = "Password must contain at least one special character";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.email && !newErrors.password;
  };

  const handleUsernameChnage = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const username = e.target.value;
    setUserData((prevData) => ({ ...prevData, username }));

    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const res = await authService.signup(userData);
      if (res) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.log(error);
      setMessage(
        (error instanceof Error && error.message) ||
          "An unexpected error occurred. Please try again.",
      );
      // alert(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-4">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              label="Username"
              type="text"
              required
              autoComplete="username"
              value={userData.username}
              onChange={handleUsernameChnage}
            />
            {errors.username && <AlertMessage text={errors.username} />}

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
              autoComplete="new-password"
              required
              value={userData.password}
              onChange={handlePasswordChange}
            />
            {errors.password && <AlertMessage text={errors.password} autoHide={false} />}

            <div className="bg-base-200 p-4 rounded-lg mt-2 text-xs opacity-70">
              <p className="font-bold mb-1">Password requirements:</p>
              <ul className="grid grid-cols-2 gap-x-4 list-disc pl-4">
                <li>At least 8 chars</li>
                <li>Lowercase letter</li>
                <li>Uppercase letter</li>
                <li>One number</li>
                <li>Special character</li>
              </ul>
            </div>

            <div className="card-actions mt-6">
              <Button type="submit" className="btn-primary w-full">
                Register
              </Button>
            </div>

            {message && <AlertMessage text={message} autoHide={false} />}
          </form>
          <AuthNavigation value={"Register"} />
        </div>
      </div>
    </div>
  );
}
