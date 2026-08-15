import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Bills() {
    const [bills, setBills] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        patient: "",
        appointment: "",
        amount: "",
        status: "unpaid",
    });

    const fetchData = async () => {
        try {
            setLoading(true);

            const [
                billsResponse,
                patientsResponse,
                appointmentsResponse,
            ] = await Promise.all([
                api.get("/bills/"),
                api.get("/patients/"),
                api.get("/appointments/"),
            ]);

            setBills(billsResponse.data);
            setPatients(patientsResponse.data);
            setAppointments(appointmentsResponse.data);

            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load bills data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setSuccess("");

            const data = {
                patient: Number(formData.patient),
                amount: Number(formData.amount),
                status: formData.status,
            };

            if (formData.appointment) {
                data.appointment =
                    Number(formData.appointment);
            }

            await api.post("/bills/", data);

            setFormData({
                patient: "",
                appointment: "",
                amount: "",
                status: "unpaid",
            });

            setSuccess(
                "Bill created successfully."
            );

            fetchData();
        } catch (err) {
            console.error(err);

            setError(
                "Failed to create bill."
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bill?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await api.delete(`/bills/${id}/`);

            setSuccess(
                "Bill deleted successfully."
            );

            fetchData();
        } catch (err) {
            console.error(err);

            setError(
                "Failed to delete bill."
            );
        }
    };

    const getPatientName = (patientId) => {
        const patient = patients.find(
            (item) =>
                item.id === patientId
        );

        if (!patient) {
            return `Patient #${patientId}`;
        }

        return (
            patient.user_name ||
            patient.username ||
            patient.name ||
            `Patient #${patientId}`
        );
    };

    /* =========================================
       SEARCH & FILTER
    ========================================= */

    const filteredBills = bills.filter(
        (bill) => {
            const patientName =
                getPatientName(
                    bill.patient
                ).toLowerCase();

            const billId =
                String(
                    bill.id || ""
                ).toLowerCase();

            const amount =
                String(
                    bill.amount || ""
                ).toLowerCase();

            const appointment =
                String(
                    bill.appointment || ""
                ).toLowerCase();

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                billId.includes(searchText) ||
                patientName.includes(searchText) ||
                amount.includes(searchText) ||
                appointment.includes(searchText);

            const matchesStatus =
                statusFilter === "" ||
                bill.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        }
    );

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
    };

    return (
        <>
            <Navbar />

            <div className="page-container">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="page-header">

                    <div>

                        <h1>
                            Bills
                        </h1>

                        <p>
                            Manage patient bills and payments
                        </p>

                    </div>

                </div>


                {/* =================================
                    MESSAGES
                ================================= */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success">
                        {success}
                    </div>
                )}


                {/* =================================
                    CREATE BILL
                ================================= */}

                <div className="form-card">

                    <h2>
                        Create Bill
                    </h2>

                    <form
                        className="bill-form"
                        onSubmit={handleSubmit}
                    >

                        <select
                            name="patient"
                            value={formData.patient}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Patient
                            </option>

                            {patients.map(
                                (patient) => (

                                    <option
                                        key={patient.id}
                                        value={patient.id}
                                    >
                                        {patient.user_name ||
                                            patient.username ||
                                            patient.name ||
                                            `Patient #${patient.id}`}
                                    </option>

                                )
                            )}

                        </select>


                        <select
                            name="appointment"
                            value={formData.appointment}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Appointment
                                (Optional)
                            </option>

                            {appointments.map(
                                (appointment) => (

                                    <option
                                        key={appointment.id}
                                        value={appointment.id}
                                    >
                                        Appointment #
                                        {appointment.id}
                                    </option>

                                )
                            )}

                        </select>


                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />


                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <option value="unpaid">
                                Unpaid
                            </option>

                            <option value="paid">
                                Paid
                            </option>

                        </select>


                        <button type="submit">
                            Create Bill
                        </button>

                    </form>

                </div>


                {/* =================================
                    SEARCH & FILTER
                ================================= */}

                <div className="filter-card">

                    <input
                        type="text"
                        placeholder="Search bill, patient, amount..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />


                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="paid">
                            Paid
                        </option>

                        <option value="unpaid">
                            Unpaid
                        </option>

                    </select>


                    <button
                        type="button"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                </div>


                {/* =================================
                    RESULT COUNT
                ================================= */}

                <div className="result-count">

                    Showing{" "}

                    <strong>
                        {filteredBills.length}
                    </strong>{" "}

                    of{" "}

                    <strong>
                        {bills.length}
                    </strong>{" "}

                    bills

                </div>


                {/* =================================
                    BILL LIST
                ================================= */}

                <div className="bill-section">

                    <h2>
                        Bill List
                    </h2>

                    {loading ? (

                        <div className="empty-box">
                            Loading bills...
                        </div>

                    ) : filteredBills.length === 0 ? (

                        <div className="empty-box">
                            No bills found.
                        </div>

                    ) : (

                        <div className="data-grid">

                            {filteredBills.map(
                                (bill) => (

                                    <div
                                        className="data-card"
                                        key={bill.id}
                                    >

                                        <div className="bill-icon">
                                            💰
                                        </div>

                                        <h3>
                                            Bill #
                                            {bill.id}
                                        </h3>

                                        <p>
                                            <strong>
                                                Patient:
                                            </strong>{" "}

                                            {getPatientName(
                                                bill.patient
                                            )}
                                        </p>

                                        {bill.appointment && (
                                            <p>
                                                <strong>
                                                    Appointment:
                                                </strong>{" "}

                                                #
                                                {
                                                    bill.appointment
                                                }
                                            </p>
                                        )}

                                        <p>
                                            <strong>
                                                Amount:
                                            </strong>{" "}

                                            ৳
                                            {bill.amount}
                                        </p>

                                        <p>
                                            <strong>
                                                Status:
                                            </strong>{" "}

                                            <span
                                                className={
                                                    bill.status ===
                                                    "paid"
                                                        ? "status-paid"
                                                        : "status-unpaid"
                                                }
                                            >
                                                {bill.status ===
                                                "paid"
                                                    ? "Paid"
                                                    : "Unpaid"}
                                            </span>
                                        </p>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    bill.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>
        </>
    );
}

export default Bills;