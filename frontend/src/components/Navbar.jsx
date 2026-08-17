import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();


    // =========================================
    // GET USER
    // =========================================

    const userData =
        localStorage.getItem("user");


    const user = userData
        ? JSON.parse(userData)
        : null;


    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "refresh_token"
        );

        localStorage.removeItem(
            "user"
        );


        // Go to login page

        navigate(
            "/login",
            {
                replace: true
            }
        );
    };


    // =========================================
    // DASHBOARD
    // =========================================

    const goDashboard = () => {

        navigate("/dashboard");

    };


    // =========================================
    // NAVBAR
    // =========================================

    return (

        <nav className="navbar">

            {/* BRAND */}

            <div
                className="navbar-brand"
                onClick={goDashboard}
            >

                <h2>
                    Hospital Management
                </h2>

            </div>


            {/* NAVIGATION */}

            <div className="navbar-menu">

                <button
                    type="button"
                    onClick={goDashboard}
                >
                    Dashboard
                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/doctors")
                    }
                >
                    Doctors
                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/patients")
                    }
                >
                    Patients
                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/appointments")
                    }
                >
                    Appointments
                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/prescriptions")
                    }
                >
                    Prescriptions
                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/medicines")
                    }
                >
                    Medicines
                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/bills")
                    }
                >
                    Bills
                </button>

            </div>


            {/* USER AREA */}

            <div className="navbar-user">

                {user && (

                    <div className="user-info">

                        <strong>
                            {user.first_name ||
                                user.username}
                        </strong>


                        <span>
                            {user.role}
                        </span>

                    </div>

                )}


                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}


export default Navbar;