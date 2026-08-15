import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Medicines() {
    const [medicines, setMedicines] = useState([]);

    const [search, setSearch] = useState("");
    const [stockFilter, setStockFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMedicines = async () => {
        try {
            setLoading(true);

            const response = await api.get("/medicines/");

            setMedicines(response.data);

            setError("");
        } catch (err) {
            console.error(err);

            setError("Failed to load medicines.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const filteredMedicines = medicines.filter(
        (medicine) => {
            const name =
                (medicine.name || "").toLowerCase();

            const description =
                (medicine.description || "").toLowerCase();

            const searchText =
                search.toLowerCase();

            const stock =
                Number(medicine.stock || 0);

            const matchesSearch =
                name.includes(searchText) ||
                description.includes(searchText);

            let matchesStock = true;

            if (stockFilter === "available") {
                matchesStock = stock > 0;
            }

            if (stockFilter === "out") {
                matchesStock = stock === 0;
            }

            if (stockFilter === "low") {
                matchesStock =
                    stock > 0 && stock <= 10;
            }

            return (
                matchesSearch &&
                matchesStock
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
                            Medicines
                        </h1>

                        <p>
                            Search and manage hospital medicines
                        </p>
                    </div>

                </div>


                {/* Search & Filter */}

                <div className="filter-card">

                    <input
                        type="text"
                        placeholder="Search medicine..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={stockFilter}
                        onChange={(e) =>
                            setStockFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Medicines
                        </option>

                        <option value="available">
                            Available
                        </option>

                        <option value="low">
                            Low Stock
                        </option>

                        <option value="out">
                            Out of Stock
                        </option>

                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setStockFilter("");
                        }}
                    >
                        Clear
                    </button>

                </div>


                {/* Result Count */}

                <div className="result-count">

                    Showing{" "}
                    <strong>
                        {filteredMedicines.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {medicines.length}
                    </strong>{" "}
                    medicines

                </div>


                {/* Error */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                {/* Medicine List */}

                {loading ? (

                    <div className="empty-box">
                        Loading medicines...
                    </div>

                ) : filteredMedicines.length === 0 ? (

                    <div className="empty-box">
                        No medicines found.
                    </div>

                ) : (

                    <div className="data-grid">

                        {filteredMedicines.map(
                            (medicine) => {

                                const stock =
                                    Number(
                                        medicine.stock || 0
                                    );

                                return (
                                    <div
                                        className="data-card"
                                        key={medicine.id}
                                    >

                                        <div className="medicine-icon">
                                            💊
                                        </div>

                                        <h3>
                                            {medicine.name}
                                        </h3>

                                        <p>
                                            <strong>
                                                Description:
                                            </strong>{" "}

                                            {medicine.description ||
                                                "N/A"}
                                        </p>

                                        <p>
                                            <strong>
                                                Price:
                                            </strong>{" "}

                                            ৳
                                            {medicine.price}
                                        </p>

                                        <p>
                                            <strong>
                                                Stock:
                                            </strong>{" "}

                                            <span
                                                className={
                                                    stock === 0
                                                        ? "stock-out"
                                                        : stock <= 10
                                                        ? "stock-low"
                                                        : "stock-available"
                                                }
                                            >
                                                {stock}
                                            </span>
                                        </p>

                                        <p>
                                            <strong>
                                                Status:
                                            </strong>{" "}

                                            {stock === 0
                                                ? "Out of Stock"
                                                : stock <= 10
                                                ? "Low Stock"
                                                : "Available"}
                                        </p>

                                    </div>
                                );
                            }
                        )}

                    </div>

                )}

            </div>
        </>
    );
}

export default Medicines;