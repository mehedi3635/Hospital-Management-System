import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            {/* Logo / Brand */}

            <div className="navbar-brand">

                <Link to="/dashboard">
                    🏥 Hospital Management
                </Link>

            </div>


            {/* Navigation Links */}

            <div className="navbar-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/doctors">
                    Doctors
                </Link>

                <Link to="/patients">
                    Patients
                </Link>

                <Link to="/appointments">
                    Appointments
                </Link>

                <Link to="/medicines">
                    Medicines
                </Link>

                <Link to="/prescriptions">
                    Prescriptions
                </Link>

                <Link to="/bills">
                    Bills
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;