import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await API.post(
                "token/",
                formData
            );

            localStorage.setItem(
                "access_token",
                response.data.access
            );

            localStorage.setItem(
                "refresh_token",
                response.data.refresh
            );

            navigate("/dashboard");

        } catch (error) {

            setError(
                "Username অথবা password ভুল!"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h2>Hospital Management System</h2>

                <h3>Login</h3>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

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
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p>
                    Don't have an account?
                    {" "}
                    <a href="/register">
                        Register
                    </a>
                </p>

            </div>

        </div>
    );
}

export default Login;