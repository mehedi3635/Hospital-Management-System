import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";


function Dashboard() {

    const [stats, setStats] = useState({
        doctors: 0,
        patients: 0,
        appointments: 0,
        medicines: 0,
        prescriptions: 0,
        bills: 0,
    });


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    // =========================================
    // LOAD DASHBOARD DATA
    // =========================================

    useEffect(() => {

        fetchStats();

    }, []);


    // =========================================
    // FETCH STATS
    // =========================================

    const fetchStats = async () => {

        try {

            setLoading(true);

            setError("");


            const [
                doctorsResponse,
                patientsResponse,
                appointmentsResponse,
                medicinesResponse,
                prescriptionsResponse,
                billsResponse,
            ] = await Promise.all([

                api.get("/doctors/"),

                api.get("/patients/"),

                api.get("/appointments/"),

                api.get("/medicines/"),

                api.get("/prescriptions/"),

                api.get("/bills/"),

            ]);


            setStats({

                doctors:
                    getCount(
                        doctorsResponse.data
                    ),

                patients:
                    getCount(
                        patientsResponse.data
                    ),

                appointments:
                    getCount(
                        appointmentsResponse.data
                    ),

                medicines:
                    getCount(
                        medicinesResponse.data
                    ),

                prescriptions:
                    getCount(
                        prescriptionsResponse.data
                    ),

                bills:
                    getCount(
                        billsResponse.data
                    ),

            });


        } catch (err) {

            console.error(
                "Dashboard API Error:",
                err
            );


            console.error(
                "Backend Response:",
                err.response?.data
            );


            setError(
                "Failed to load dashboard statistics."
            );


        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // GET COUNT
    // =========================================

    const getCount = (data) => {

        // Normal array

        if (Array.isArray(data)) {

            return data.length;

        }


        // Django REST Framework pagination

        if (
            data &&
            typeof data.count === "number"
        ) {

            return data.count;

        }


        // Results array

        if (
            data &&
            Array.isArray(data.results)
        ) {

            return data.results.length;

        }


        return 0;
    };


    // =========================================
    // DASHBOARD
    // =========================================

    return (

        <div className="dashboard">


            {/* =================================
                HEADER
            ================================= */}

            <div className="dashboard-header">

                <h1>
                    Hospital Management Dashboard
                </h1>

                <p>
                    Welcome to Hospital Management System
                </p>

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (

                <div className="error">

                    {error}

                </div>

            )}


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="dashboard-grid">


                {/* =================================
                    DOCTORS
                ================================= */}

                <Link
                    to="/doctors"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <div className="dashboard-icon">
                            👨‍⚕️
                        </div>


                        <h3>
                            Doctors
                        </h3>


                        <div className="stat-number">

                            {loading
                                ? "..."
                                : stats.doctors}

                        </div>


                        <p>
                            Registered doctors
                        </p>


                        <span className="card-button">
                            View Doctors →
                        </span>

                    </div>

                </Link>


                {/* =================================
                    PATIENTS
                ================================= */}

                <Link
                    to="/patients"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <div className="dashboard-icon">
                            🧑‍🤝‍🧑
                        </div>


                        <h3>
                            Patients
                        </h3>


                        <div className="stat-number">

                            {loading
                                ? "..."
                                : stats.patients}

                        </div>


                        <p>
                            Registered patients
                        </p>


                        <span className="card-button">
                            View Patients →
                        </span>

                    </div>

                </Link>


                {/* =================================
                    APPOINTMENTS
                ================================= */}

                <Link
                    to="/appointments"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <div className="dashboard-icon">
                            📅
                        </div>


                        <h3>
                            Appointments
                        </h3>


                        <div className="stat-number">

                            {loading
                                ? "..."
                                : stats.appointments}

                        </div>


                        <p>
                            Total appointments
                        </p>


                        <span className="card-button">
                            View Appointments →
                        </span>

                    </div>

                </Link>


                {/* =================================
                    MEDICINES
                ================================= */}

                <Link
                    to="/medicines"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <div className="dashboard-icon">
                            💊
                        </div>


                        <h3>
                            Medicines
                        </h3>


                        <div className="stat-number">

                            {loading
                                ? "..."
                                : stats.medicines}

                        </div>


                        <p>
                            Available medicines
                        </p>


                        <span className="card-button">
                            View Medicines →
                        </span>

                    </div>

                </Link>


                {/* =================================
                    PRESCRIPTIONS
                ================================= */}

                <Link
                    to="/prescriptions"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <div className="dashboard-icon">
                            📋
                        </div>


                        <h3>
                            Prescriptions
                        </h3>


                        <div className="stat-number">

                            {loading
                                ? "..."
                                : stats.prescriptions}

                        </div>


                        <p>
                            Total prescriptions
                        </p>


                        <span className="card-button">
                            View Prescriptions →
                        </span>

                    </div>

                </Link>


                {/* =================================
                    BILLS
                ================================= */}

                <Link
                    to="/bills"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <div className="dashboard-icon">
                            💰
                        </div>


                        <h3>
                            Bills
                        </h3>


                        <div className="stat-number">

                            {loading
                                ? "..."
                                : stats.bills}

                        </div>


                        <p>
                            Total bills
                        </p>


                        <span className="card-button">
                            View Bills →
                        </span>

                    </div>

                </Link>


            </div>

        </div>

    );
}


export default Dashboard;