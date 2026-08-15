import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "patient",
        phone: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            await API.post(
                "register/",
                formData
            );

            setSuccess(
                "Registration successful! এখন Login করুন।"
            );

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {

            if (error.response?.data) {

                setError(
                    JSON.stringify(
                        error.response.data
                    )
                );

            } else {

                setError(
                    "Registration failed!"
                );

            }
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h2>Hospital Management System</h2>

                <h3>Create Account</h3>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="success">
                        {success}
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
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
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
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="patient">
                            Patient
                        </option>

                        <option value="doctor">
                            Doctor
                        </option>

                        <option value="receptionist">
                            Receptionist
                        </option>
                    </select>

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?
                    {" "}
                    <a href="/">
                        Login
                    </a>
                </p>

            </div>

        </div>
    );
}

export default Register;