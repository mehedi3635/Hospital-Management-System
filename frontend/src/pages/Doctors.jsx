import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";


function Doctors() {

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [saving, setSaving] = useState(false);


    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        department: "",
        specialization: "",
        availability: "",
        phone: "",
    });


    // =========================================
    // FETCH DOCTORS
    // =========================================

    useEffect(() => {

        fetchDoctors();

    }, []);


    const fetchDoctors = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await api.get("/doctors/");


            const data = response.data;


            if (
                data &&
                Array.isArray(data.results)
            ) {

                setDoctors(data.results);

            } else if (
                Array.isArray(data)
            ) {

                setDoctors(data);

            } else {

                setDoctors([]);

            }

        } catch (err) {

            console.error(
                "Doctors API Error:",
                err
            );

            console.error(
                "Backend Response:",
                err.response?.data
            );

            setError(
                "Failed to load doctors."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData({
            ...formData,
            [name]: value
        });

    };


    // =========================================
    // ADD DOCTOR
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        setError("");


        try {

            await api.post(
                "/doctors/",
                formData
            );


            // Close form

            setShowForm(false);


            // Reset form

            setFormData({
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                department: "",
                specialization: "",
                availability: "",
                phone: "",
            });


            // Reload doctors

            await fetchDoctors();


        } catch (err) {

            console.error(
                "Create Doctor Error:",
                err
            );

            console.error(
                "Backend Response:",
                err.response?.data
            );


            const backendError =
                err.response?.data;


            if (
                backendError &&
                typeof backendError === "object"
            ) {

                const firstError =
                    Object.values(
                        backendError
                    )[0];


                if (
                    Array.isArray(firstError)
                ) {

                    setError(
                        firstError[0]
                    );

                } else {

                    setError(
                        String(firstError)
                    );

                }

            } else {

                setError(
                    "Failed to create doctor."
                );

            }

        } finally {

            setSaving(false);

        }
    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="page-container">

                <h1>
                    Doctors
                </h1>

                <p>
                    Loading doctors...
                </p>

            </div>

        );

    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="page-container">


            {/* =================================
                HEADER
            ================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Doctors
                    </h1>

                    <p>
                        Manage hospital doctors
                    </p>

                </div>


                <button
                    className="primary-btn"
                    onClick={() =>
                        setShowForm(
                            !showForm
                        )
                    }
                >

                    {showForm
                        ? "Close"
                        : "+ Add Doctor"}

                </button>

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
                ADD DOCTOR FORM
            ================================= */}

            {showForm && (

                <div className="form-card">

                    <h2>
                        Add New Doctor
                    </h2>


                    <form
                        onSubmit={handleSubmit}
                        className="doctor-form"
                    >


                        {/* USERNAME */}

                        <div className="form-group">

                            <label>
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={
                                    formData.username
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                minLength="6"
                                required
                            />

                        </div>


                        {/* FIRST NAME */}

                        <div className="form-group">

                            <label>
                                First Name
                            </label>

                            <input
                                type="text"
                                name="first_name"
                                value={
                                    formData.first_name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* LAST NAME */}

                        <div className="form-group">

                            <label>
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="last_name"
                                value={
                                    formData.last_name
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* DEPARTMENT */}

                        <div className="form-group">

                            <label>
                                Department ID
                            </label>

                            <input
                                type="number"
                                name="department"
                                value={
                                    formData.department
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: 1"
                                required
                            />

                        </div>


                        {/* SPECIALIZATION */}

                        <div className="form-group">

                            <label>
                                Specialization
                            </label>

                            <input
                                type="text"
                                name="specialization"
                                value={
                                    formData.specialization
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: Cardiology"
                                required
                            />

                        </div>


                        {/* AVAILABILITY */}

                        <div className="form-group">

                            <label>
                                Availability
                            </label>

                            <input
                                type="text"
                                name="availability"
                                value={
                                    formData.availability
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: 9 AM - 5 PM"
                            />

                        </div>


                        {/* PHONE */}

                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* BUTTON */}

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-btn"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Doctor"}

                            </button>


                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                Cancel
                            </button>

                        </div>


                    </form>

                </div>

            )}


            {/* =================================
                EMPTY STATE
            ================================= */}

            {!error &&
                doctors.length === 0 && (

                    <div className="empty-state">

                        <h3>
                            No doctors found
                        </h3>

                        <p>
                            There are no doctors
                            registered yet.
                        </p>

                    </div>

                )}


            {/* =================================
                DOCTOR GRID
            ================================= */}

            {doctors.length > 0 && (

                <div className="doctor-grid">

                    {doctors.map(
                        (doctor) => (

                            <div
                                className="doctor-card"
                                key={doctor.id}
                            >

                                <div className="doctor-icon">
                                    👨‍⚕️
                                </div>


                                <h3>

                                    {doctor.user_name ||
                                        doctor.username ||
                                        doctor.user?.username ||
                                        "Doctor"}

                                </h3>


                                <p>

                                    <strong>
                                        Specialization:
                                    </strong>{" "}

                                    {doctor.specialization ||
                                        "Not specified"}

                                </p>


                                <p>

                                    <strong>
                                        Department:
                                    </strong>{" "}

                                    {doctor.department_name ||
                                        doctor.department ||
                                        "Not specified"}

                                </p>


                                <p>

                                    <strong>
                                        Phone:
                                    </strong>{" "}

                                    {doctor.phone ||
                                        "Not available"}

                                </p>


                                <div className="doctor-actions">

                                    <Link
                                        to={`/doctors/${doctor.id}`}
                                        className="view-btn"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );
}


export default Doctors;