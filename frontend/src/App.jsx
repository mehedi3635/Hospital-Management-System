import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";

import ProtectedRoute from "./components/ProtectedRoute";
import Medicines from "./pages/Medicines";
import Prescriptions from "./pages/Prescriptions";
import Bills from "./pages/Bills";
import Profile from "./pages/Profile";

import "./App.css";


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* =========================
                    LOGIN
                ========================== */}

                <Route
                    path="/"
                    element={<Login />}
                />


                {/* =========================
                    REGISTER
                ========================== */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    DASHBOARD
                ========================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    DOCTORS
                ========================== */}

                <Route
                    path="/doctors"
                    element={
                        <ProtectedRoute>
                            <Doctors />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    PATIENTS
                ========================== */}

                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute>
                            <Patients />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    APPOINTMENTS
                ========================== */}

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/prescriptions"
    element={
        <ProtectedRoute>
            <Prescriptions />
        </ProtectedRoute>
    }
/>
<Route
    path="/bills"
    element={
        <ProtectedRoute>
            <Bills />
        </ProtectedRoute>
    }
/>
<Route
    path="/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>

                <Route
                  path="/medicines"
                  element={
                      <ProtectedRoute>
                          <Medicines />
                      </ProtectedRoute>
                  }
              />


                {/* =========================
                    404 PAGE
                ========================== */}

                <Route
                    path="*"
                    element={
                        <div className="not-found">

                            <h1>
                                404
                            </h1>

                            <p>
                                Page Not Found
                            </p>

                        </div>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;