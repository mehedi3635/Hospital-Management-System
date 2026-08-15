import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDoctors = async () => {
        try {
            setLoading(true);

            const response = await api.get("/doctors/");

            setDoctors(response.data);

            setError("");
        } catch (err) {
            console.error(err);

            setError("Failed to load doctors.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await api.get(
                "/departments/"
            );

            setDepartments(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDoctors();
        fetchDepartments();
    }, []);

    const getDoctorName = (doctor) => {
        if (doctor.user_name) {
            return doctor.user_name;
        }

        if (doctor.username) {
            return doctor.username;
        }

        if (doctor.name) {
            return doctor.name;
        }

        if (doctor.user) {
            return `Doctor #${doctor.user}`;
        }

        return `Doctor #${doctor.id}`;
    };

    const getDepartmentName = (doctor) => {
        if (doctor.department_name) {
            return doctor.department_name;
        }

        const department = departments.find(
            (item) =>
                item.id === doctor.department
        );

        return department
            ? department.name
            : "N/A";
    };

    const filteredDoctors = doctors.filter(
        (doctor) => {
            const doctorName =
                getDoctorName(doctor).toLowerCase();

            const specialization =
                (
                    doctor.specialization || ""
                ).toLowerCase();

            const departmentName =
                getDepartmentName(
                    doctor
                ).toLowerCase();

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                doctorName.includes(searchText) ||
                specialization.includes(searchText) ||
                departmentName.includes(searchText);

            const matchesDepartment =
                departmentFilter === "" ||
                String(doctor.department) ===
                    String(departmentFilter);

            return (
                matchesSearch &&
                matchesDepartment
            );
        }
    );

    return (
        <>
            <Navbar />

            <div className="page-container">

                {/* Header */}

                <div className="page-header">

                    <div>
                        <h1>
                            Doctors
                        </h1>

                        <p>
                            Search and manage hospital doctors
                        </p>
                    </div>

                </div>


                {/* Search & Filter */}

                <div className="filter-card">

                    <input
                        type="text"
                        placeholder="Search doctor, specialization..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={departmentFilter}
                        onChange={(e) =>
                            setDepartmentFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Departments
                        </option>

                        {departments.map(
                            (department) => (
                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name}
                                </option>
                            )
                        )}

                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setDepartmentFilter("");
                        }}
                    >
                        Clear
                    </button>

                </div>


                {/* Result Count */}

                <div className="result-count">

                    Showing{" "}
                    <strong>
                        {filteredDoctors.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {doctors.length}
                    </strong>{" "}
                    doctors

                </div>


                {/* Error */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                {/* Doctors */}

                {loading ? (

                    <div className="empty-box">
                        Loading doctors...
                    </div>

                ) : filteredDoctors.length === 0 ? (

                    <div className="empty-box">
                        No doctors found.
                    </div>

                ) : (

                    <div className="data-grid">

                        {filteredDoctors.map(
                            (doctor) => (

                                <div
                                    className="data-card"
                                    key={doctor.id}
                                >

                                    <div className="doctor-icon">
                                        👨‍⚕️
                                    </div>

                                    <h3>
                                        {getDoctorName(
                                            doctor
                                        )}
                                    </h3>

                                    <p>
                                        <strong>
                                            Specialization:
                                        </strong>{" "}

                                        {doctor.specialization ||
                                            "N/A"}
                                    </p>

                                    <p>
                                        <strong>
                                            Department:
                                        </strong>{" "}

                                        {getDepartmentName(
                                            doctor
                                        )}
                                    </p>

                                    <p>
                                        <strong>
                                            Phone:
                                        </strong>{" "}

                                        {doctor.phone ||
                                            "N/A"}
                                    </p>

                                    <p>
                                        <strong>
                                            Availability:
                                        </strong>{" "}

                                        {doctor.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>
        </>
    );
}

export default Doctors;
