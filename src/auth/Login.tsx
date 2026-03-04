import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const loggedUser = localStorage.getItem("loggedInUser");

        if (loggedUser) {
            navigate("/dashboard");
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const validUser = users.find(
            (u: any) =>
                u.email === formData.email &&
                u.password === formData.password
        );

        if (!validUser) {
            alert("Invalid email or password");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        navigate("/dashboard");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>
                </form>

                <p>
                    New user?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;