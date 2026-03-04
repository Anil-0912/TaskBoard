import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const userExists = users.find(
            (u: any) => u.email === formData.email
        );

        if (userExists) {
            alert("User already registered");
            return;
        }

        users.push({
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful");

        navigate("/");
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