import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "./login.css";


function Login() {

    const navigate = useNavigate();


    const [username, setUsername] =
        useState("");


    const [password, setPassword] =
        useState("");


    const [error, setError] =
        useState("");


    const [loading, setLoading] =
        useState(false);


    // =========================================
    // LOGIN
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            // =================================
            // LOGIN API
            // =================================

            const response =
                await api.post(
                    "/login/",
                    {
                        username,
                        password,
                    }
                );


            console.log(
                "Login response:",
                response.data
            );


            // =================================
            // GET ACCESS TOKEN
            // =================================

            const accessToken =
                response.data.access;


            const refreshToken =
                response.data.refresh;


            if (!accessToken) {

                throw new Error(
                    "Access token was not received."
                );

            }


            // =================================
            // SAVE ACCESS TOKEN
            // =================================

            localStorage.setItem(
                "access_token",
                accessToken
            );


            // =================================
            // SAVE REFRESH TOKEN
            // =================================

            if (refreshToken) {

                localStorage.setItem(
                    "refresh_token",
                    refreshToken
                );

            }


            // =================================
            // SAVE USER
            // =================================

            if (response.data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.user
                    )
                );

            }


            // =================================
            // SET AXIOS TOKEN
            // =================================

            api.defaults.headers.common[
                "Authorization"
            ] =
                `Bearer ${accessToken}`;


            console.log(
                "Access token saved successfully."
            );


            // =================================
            // GO TO DASHBOARD
            // =================================

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );


        } catch (err) {

            console.error(
                "Login error:",
                err
            );


            // =================================
            // BACKEND ERROR
            // =================================

            if (
                err.response &&
                err.response.data
            ) {

                console.error(
                    "Backend response:",
                    err.response.data
                );

            }


            // =================================
            // ERROR MESSAGE
            // =================================

            if (
                err.response?.status === 401
            ) {

                setError(
                    "Invalid username or password."
                );

            } else if (
                err.response?.status === 400
            ) {

                setError(
                    "Please enter a valid username and password."
                );

            } else {

                setError(
                    "Login failed. Please try again."
                );

            }


        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // UI
    // =========================================

    return (

        <div className="login-page">

            <div className="login-card">


                {/* =================================
                    TITLE
                ================================= */}

                <h1>
                    Hospital Management
                </h1>


                <p>
                    Login to your account
                </p>


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="error">

                        {error}

                    </div>

                )}


                {/* =================================
                    LOGIN FORM
                ================================= */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* USERNAME */}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        disabled={loading}
                        required
                    />


                    {/* PASSWORD */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        disabled={loading}
                        required
                    />


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>


                </form>


            </div>

        </div>

    );
}


export default Login;