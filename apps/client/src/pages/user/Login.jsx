import { useState } from "react";
import { Input, Button, AlertMessage, AuthNavigation } from "../../components";
import { useAuth } from "../../context/User.context";
import authService from "../../services/auth.services";

export default function LoginPage() {
  const { login } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      await authService
        .login(userData)
        .then((data) =>
          login({ _id: data._id, username: data.username, role: data.role })
        )
        .then(() => navigate("/"))
        .catch((reason) => setMessage(reason.message));
    } catch (error) {
      console.log(error);
      setMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
      // alert(error.message);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserData((prevData) => ({ ...prevData, email }));

    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUserData((prevData) => ({ ...prevData, password }));

    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div>
      <AuthNavigation value={"login"} />
      <form onSubmit={handleSubmit}>
        <Input
          label="email"
          type="email"
          required
          autoComplete="email"
          value={userData.email}
          onChange={handleEmailChange}
        />
        {errors.email && <AlertMessage text={errors.email} />}

        <Input
          label="password"
          type="password"
          required
          autoComplete="current-password"
          value={userData.password}
          onChange={handlePasswordChange}
        />

        {errors.password && <AlertMessage text={errors.password} />}
        <Button className="btn-primary" type="submit">
          Login !!
        </Button>

        {message && <AlertMessage text={message} />}
      </form>
    </div>
  );
}
