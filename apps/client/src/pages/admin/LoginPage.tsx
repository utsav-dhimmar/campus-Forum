import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertMessage, Button, Input } from "../../components";
import { useAuth } from "../../context/User.context";
import adminService from "../../services/admin.services";
import { useNavigate } from "react-router";
import type { UserLogin } from "@repo/shared";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, data } = useAuth();

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

  useEffect(() => {
    if (data?.role === "ADMIN") {
      navigate("/admin", { replace: true });
    }
  }, [data, navigate]);

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
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-primary text-white text-center py-3">
                <h3 className="mb-0">Admin Login</h3>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <Input
                      label="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={userData.email}
                      onChange={handleEmailChange}
                    />
                    {errors.email && <AlertMessage text={errors.email} />}
                  </div>

                  <div className="mb-3">
                    <Input
                      label="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={userData.password}
                      onChange={handlePasswordChange}
                    />
                    {errors.password && <AlertMessage text={errors.password} />}
                  </div>

                  <Button className="btn-primary w-100 mb-3" type="submit">
                    Login !!
                  </Button>

                  {message && <AlertMessage text={message} />}
                </form>
              </div>

              <div className="card-footer text-center py-2">
                <small className="text-muted">For authorized personnel only</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
