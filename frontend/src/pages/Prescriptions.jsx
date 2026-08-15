import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPrescriptions = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/prescriptions/"
            );

            setPrescriptions(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load prescriptions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const filteredPrescriptions =
        prescriptions.filter((prescription) => {

            const searchText =
                search.toLowerCase();

            const notes =
                (
                    prescription.notes || ""
                ).toLowerCase();

            const doctor =
                String(
                    prescription.doctor || ""
                ).toLowerCase();

            const patient =
                String(
                    prescription.patient || ""
                ).toLowerCase();

            const id =
                String(
                    prescription.id || ""
                ).toLowerCase();

            return (
                notes.includes(searchText) ||
                doctor.includes(searchText) ||
                patient.includes(searchText) ||
                id.includes(searchText)
            );
        });

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <>
            <Navbar />

            <div className="page-container">

                {/* Header */}

                <div className="page-header">

                    <div>
                        <h1>
                            Prescriptions
                        </h1>

                        <p>
                            Search and manage patient prescriptions
                        </p>
                    </div>

                </div>


                {/* Search */}

                <div className="filter-card">

                    <input
                        type="text"
                        placeholder="Search by prescription ID, doctor, patient..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <button
                        type="button"
                        onClick={clearSearch}
                    >
                        Clear
                    </button>

                </div>


                {/* Result Count */}

                <div className="result-count">

                    Showing{" "}
                    <strong>
                        {filteredPrescriptions.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {prescriptions.length}
                    </strong>{" "}
                    prescriptions

                </div>


                {/* Error */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                {/* Prescription List */}

                {loading ? (

                    <div className="empty-box">
                        Loading prescriptions...
                    </div>

                ) : filteredPrescriptions.length === 0 ? (

                    <div className="empty-box">
                        No prescriptions found.
                    </div>

                ) : (

                    <div className="data-grid">

                        {filteredPrescriptions.map(
                            (prescription) => (

                                <div
                                    className="data-card"
                                    key={prescription.id}
                                >

                                    <div className="prescription-icon">
                                        📋
                                    </div>

                                    <h3>
                                        Prescription #
                                        {prescription.id}
                                    </h3>

                                    <p>
                                        <strong>
                                            Doctor:
                                        </strong>{" "}

                                        {prescription.doctor_name ||
                                            prescription.doctor ||
                                            "N/A"}
                                    </p>

                                    <p>
                                        <strong>
                                            Patient:
                                        </strong>{" "}

                                        {prescription.patient_name ||
                                            prescription.patient ||
                                            "N/A"}
                                    </p>

                                    {prescription.appointment && (
                                        <p>
                                            <strong>
                                                Appointment:
                                            </strong>{" "}

                                            #
                                            {
                                                prescription.appointment
                                            }
                                        </p>
                                    )}

                                    <p>
                                        <strong>
                                            Notes:
                                        </strong>{" "}

                                        {prescription.notes ||
                                            "No notes"}
                                    </p>

                                    <p>
                                        <strong>
                                            Created:
                                        </strong>{" "}

                                        {prescription.created_at
                                            ? new Date(
                                                  prescription.created_at
                                              ).toLocaleString()
                                            : "N/A"}
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

export default Prescriptions;