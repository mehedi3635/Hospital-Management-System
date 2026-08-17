import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Doctors from "./pages/Doctors";


import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";


import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";


import "./App.css";


// =========================================
// PROTECTED LAYOUT
// =========================================

function ProtectedLayout({ children }) {

    return (

        <ProtectedRoute>

            <Navbar />

            <main className="main-content">

                {children}

            </main>

        </ProtectedRoute>

    );
}


// =========================================
// APP
// =========================================

function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* =================================
                    LOGIN
                ================================= */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* =================================
                    DASHBOARD
                ================================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedLayout>

                            <Dashboard />

                        </ProtectedLayout>
                    }
                />


                {/* =================================
                    DOCTORS
                ================================= */}

                <Route
    path="/doctors"
    element={
        <ProtectedLayout>

            <Doctors />

        </ProtectedLayout>
    }
/>


                {/* =================================
                    PATIENTS
                ================================= */}

                <Route
                    path="/patients"
                    element={
                        <ProtectedLayout>

                            <div>
                                <h1>
                                    Patients
                                </h1>

                                <p>
                                    Patients page coming soon.
                                </p>
                            </div>

                        </ProtectedLayout>
                    }
                />


                {/* =================================
                    APPOINTMENTS
                ================================= */}

                <Route
                    path="/appointments"
                    element={
                        <ProtectedLayout>

                            <div>
                                <h1>
                                    Appointments
                                </h1>

                                <p>
                                    Appointments page coming soon.
                                </p>
                            </div>

                        </ProtectedLayout>
                    }
                />


                {/* =================================
                    PRESCRIPTIONS
                ================================= */}

                <Route
                    path="/prescriptions"
                    element={
                        <ProtectedLayout>

                            <div>
                                <h1>
                                    Prescriptions
                                </h1>

                                <p>
                                    Prescriptions page coming soon.
                                </p>
                            </div>

                        </ProtectedLayout>
                    }
                />


                {/* =================================
                    MEDICINES
                ================================= */}

                <Route
                    path="/medicines"
                    element={
                        <ProtectedLayout>

                            <div>
                                <h1>
                                    Medicines
                                </h1>

                                <p>
                                    Medicines page coming soon.
                                </p>
                            </div>

                        </ProtectedLayout>
                    }
                />


                {/* =================================
                    BILLS
                ================================= */}

                <Route
                    path="/bills"
                    element={
                        <ProtectedLayout>

                            <div>
                                <h1>
                                    Bills
                                </h1>

                                <p>
                                    Bills page coming soon.
                                </p>
                            </div>

                        </ProtectedLayout>
                    }
                />


                {/* =================================
                    DEFAULT
                ================================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* =================================
                    404
                ================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


            </Routes>

        </BrowserRouter>

    );
}


export default App;