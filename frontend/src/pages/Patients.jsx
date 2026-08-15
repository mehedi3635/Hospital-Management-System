import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Patients() {
    const [patients, setPatients] = useState([]);

    const [search, setSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPatients = async () => {
        try {
            setLoading(true);

            const response = await api.get("/patients/");

            setPatients(response.data);

            setError("");
        } catch (err) {
            console.error(err);

            setError("Failed to load patients.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const getPatientName = (patient) => {
        if (patient.user_name) {
            return patient.user_name;
        }

        if (patient.username) {
            return patient.username;
        }

        if (patient.name) {
            return patient.name;
        }

        if (patient.user) {
            return `Patient #${patient.user}`;
        }

        return `Patient #${patient.id}`;
    };

    const filteredPatients = patients.filter(
        (patient) => {
            const name =
                getPatientName(patient).toLowerCase();

            const phone =
                (patient.phone || "").toLowerCase();

            const gender =
                (patient.gender || "").toLowerCase();

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                name.includes(searchText) ||
                phone.includes(searchText) ||
                gender.includes(searchText);

            const matchesGender =
                genderFilter === "" ||
                gender === genderFilter.toLowerCase();

            return (
                matchesSearch &&
                matchesGender
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
                            Patients
                        </h1>

                        <p>
                            Search and manage hospital patients
                        </p>
                    </div>

                </div>


                {/* Search & Filter */}

                <div className="filter-card">

                    <input
                        type="text"
                        placeholder="Search patient, phone..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={genderFilter}
                        onChange={(e) =>
                            setGenderFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Genders
                        </option>

                        <option value="male">
                            Male
                        </option>

                        <option value="female">
                            Female
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setGenderFilter("");
                        }}
                    >
                        Clear
                    </button>

                </div>


                {/* Result Count */}

                <div className="result-count">

                    Showing{" "}
                    <strong>
                        {filteredPatients.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {patients.length}
                    </strong>{" "}
                    patients

                </div>


                {/* Error */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                {/* Patient List */}

                {loading ? (

                    <div className="empty-box">
                        Loading patients...
                    </div>

                ) : filteredPatients.length === 0 ? (

                    <div className="empty-box">
                        No patients found.
                    </div>

                ) : (

                    <div className="data-grid">

                        {filteredPatients.map(
                            (patient) => (

                                <div
                                    className="data-card"
                                    key={patient.id}
                                >

                                    <div className="patient-icon">
                                        🧑‍🤝‍🧑
                                    </div>

                                    <h3>
                                        {getPatientName(
                                            patient
                                        )}
                                    </h3>

                                    <p>
                                        <strong>
                                            Gender:
                                        </strong>{" "}

                                        {patient.gender ||
                                            "N/A"}
                                    </p>

                                    <p>
                                        <strong>
                                            Date of Birth:
                                        </strong>{" "}

                                        {patient.date_of_birth ||
                                            "N/A"}
                                    </p>

                                    <p>
                                        <strong>
                                            Phone:
                                        </strong>{" "}

                                        {patient.phone ||
                                            "N/A"}
                                    </p>

                                    <p>
                                        <strong>
                                            Address:
                                        </strong>{" "}

                                        {patient.address ||
                                            "N/A"}
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

export default Patients;