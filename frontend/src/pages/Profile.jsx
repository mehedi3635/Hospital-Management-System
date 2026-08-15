import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/profile/");

            setProfile(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="page-container">
                    <div className="empty-box">
                        Loading profile...
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="page-container">

                <div className="page-header">
                    <div>
                        <h1>My Profile</h1>

                        <p>
                            View your account information
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {profile && (
                    <div className="profile-card">

                        <div className="profile-avatar">
                            👤
                        </div>

                        <h2>
                            {profile.username ||
                                profile.first_name ||
                                "User"}
                        </h2>

                        <div className="profile-info">

                            <div className="profile-row">
                                <strong>
                                    Username
                                </strong>

                                <span>
                                    {profile.username || "N/A"}
                                </span>
                            </div>

                            <div className="profile-row">
                                <strong>
                                    First Name
                                </strong>

                                <span>
                                    {profile.first_name || "N/A"}
                                </span>
                            </div>

                            <div className="profile-row">
                                <strong>
                                    Last Name
                                </strong>

                                <span>
                                    {profile.last_name || "N/A"}
                                </span>
                            </div>

                            <div className="profile-row">
                                <strong>
                                    Email
                                </strong>

                                <span>
                                    {profile.email || "N/A"}
                                </span>
                            </div>

                            <div className="profile-row">
                                <strong>
                                    Role
                                </strong>

                                <span>
                                    {profile.role || "N/A"}
                                </span>
                            </div>

                            <div className="profile-row">
                                <strong>
                                    Phone
                                </strong>

                                <span>
                                    {profile.phone || "N/A"}
                                </span>
                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>
    );
}

export default Profile;