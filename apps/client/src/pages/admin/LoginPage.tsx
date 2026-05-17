import { useState, type ChangeEvent, type FormEvent } from "react";
import { AlertMessage, Button, Input } from "../../components";
import adminService from "../../services/admin.services";
import { Navigate } from "react-router";
import type { UserLogin } from "@repo/shared";
import { useAuthStore } from "@/store/useAuthStore";
export default function LoginPage() {
  const { login, data } = useAuthStore();

  const [userData, setUserData] = useState<UserLogin>({
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
    } else if (userData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const res = await adminService.login(userData);
      if (res) {
        console.log(res);
        login({ _id: "admin", username: res.email, role: "ADMIN" });
      }
    } catch (error: any) {
      console.log(error);
      setMessage(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  if (data?.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUserData((prevData) => ({ ...prevData, email }));

    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setUserData((prevData) => ({ ...prevData, password }));

    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="bg-primary text-primary-content p-6 text-center">
          <h2 className="text-3xl font-bold">Admin Portal</h2>
          <p className="opacity-80 text-sm mt-1">Authorized Access Only</p>
        </div>

        <div className="card-body p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="form-control flex flex-col">
              <Input
                label="Email"
                type="email"
                required
                autoComplete="email"
                value={userData.email}
                onChange={handleEmailChange}
              />
              {errors.email && <AlertMessage text={errors.email} />}
            </div>

            <div className="form-control flex flex-col">
              <Input
                label="Password"
                type="password"
                required
                autoComplete="current-password"
                value={userData.password}
                onChange={handlePasswordChange}
              />
              {errors.password && <AlertMessage text={errors.password} />}
            </div>

            <div className="card-actions mt-4">
              <Button className="btn-primary w-full btn-lg" type="submit">
                Access Dashboard
              </Button>
            </div>

            {message && <AlertMessage text={message} autoHide={false} />}
          </form>
        </div>

        <div className="p-4 bg-base-200 text-center text-xs opacity-60">
          <p>Personnel are responsible for maintaining confidentiality of credentials.</p>
        </div>
      </div>
    </div>
  );
}
