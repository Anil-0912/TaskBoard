import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/taskApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    console.log(formData);
    alert("Registration successful");

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    

    navigate("/");

  } catch (error: any) {

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Registration failed");
    }

  }
};

  return (
    <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Register</button>
                </form>

                <p>
                    Already registered?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
  );
};

export default Register;