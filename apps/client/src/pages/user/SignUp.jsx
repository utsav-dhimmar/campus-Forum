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
      newErrors.username =
        "Username can only contain letters, numbers, underscores, and hyphens";
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
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(userData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(userData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (
      !/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(userData.password)
    ) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.email && !newErrors.password;
  };

  const handleUsernameChnage = (e) => {
    const username = e.target.value;
    setUserData((prevData) => ({ ...prevData, username }));

    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
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

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
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
        error.message || "An unexpected error occurred. Please try again."
      );
      // alert(error.message);
    }
  };

  return (
    <div>
      <AuthNavigation value={"Register"} />
      <form onSubmit={handleSubmit}>
        <Input
          label="username"
          type="text"
          required
          autoComplete="username"
          value={userData.username}
          onChange={handleUsernameChnage}
        />
        {errors.username && <AlertMessage text={errors.username} />}

        {/* <AlertMessage /> */}

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
          autoComplete="new-password"
          required
          value={userData.password}
          onChange={handlePasswordChange}
        />

        {errors.password && (
          <AlertMessage text={errors.password} autoHide={false} />
        )}

        <div
          style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.5rem" }}
        >
          <p>Password must contain:</p>
          <ul style={{ paddingLeft: "1rem", margin: "0.25rem 0" }}>
            <li>At least 8 characters</li>
            <li>One lowercase letter</li>
            <li>One uppercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
        </div>

        <Button type="submit" className="btn-primary">
          Register
        </Button>

        {message && <AlertMessage text={message} />}
      </form>
    </div>
  );
}
