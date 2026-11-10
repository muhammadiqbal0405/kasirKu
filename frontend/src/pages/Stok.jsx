
import { useState } from "react";
import {
    FaSearch,
    FaBox,
    FaBoxes,
    FaExclamationTriangle,
    FaPlus,
    FaMinus,
    FaTimes,
} from "react-icons/fa";
import "./Stok.css";

const initialProducts = [
    { id: 1, name: "Indomie Goreng", category: "Makanan", stock: 120, minStock: 20 },
    { id: 2, name: "Air Mineral", category: "Minuman", stock: 95, minStock: 20 },
    { id: 3, name: "Kopi Sachet", category: "Minuman", stock: 80, minStock: 15 },
    { id: 4, name: "Beras 5 Kg", category: "Sembako", stock: 15, minStock: 20 },
    { id: 5, name: "Gula Pasir 1 Kg", category: "Sembako", stock: 8, minStock: 15 },
    { id: 6, name: "Minyak Goreng 1 L", category: "Sembako", stock: 0, minStock: 10 },
];

function Stok() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Semua");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [adjustment, setAdjustment] = useState("");
    const [adjustmentType, setAdjustmentType] = useState("tambah");

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (total, product) => total + product.stock,
        0
    );

    const lowStock = products.filter(
        (product) => product.stock > 0 && product.stock <= product.minStock
    ).length;

    const outOfStock = products.filter(
        (product) => product.stock === 0
    ).length;

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        let matchesFilter = true;

        if (filter === "Tersedia") {
            matchesFilter = product.stock > product.minStock;
        } else if (filter === "Menipis") {
            matchesFilter =
                product.stock > 0 && product.stock <= product.minStock;
        } else if (filter === "Habis") {
            matchesFilter = product.stock === 0;
        }

        return matchesSearch && matchesFilter;
    });

    const getStockStatus = (product) => {
        if (product.stock === 0) {
            return { label: "Habis", className: "out" };
        }

        if (product.stock <= product.minStock) {
            return { label: "Menipis", className: "low" };
        }

        return { label: "Tersedia", className: "available" };
    };

    const openAdjustment = (product, type) => {
        setSelectedProduct(product);
        setAdjustment("");
        setAdjustmentType(type);
    };

    const closeAdjustment = () => {
        setSelectedProduct(null);
        setAdjustment("");
    };

    const handleAdjustment = (e) => {
        e.preventDefault();

        const amount = Number(adjustment);

        if (!Number.isInteger(amount) || amount <= 0) {
            alert("Masukkan jumlah stok berupa bilangan bulat lebih dari 0.");
            return;
        }

        if (
            adjustmentType === "kurang" &&
            amount > selectedProduct.stock
        ) {
            alert("Jumlah pengurangan melebihi stok yang tersedia!");
            return;
        }

        setProducts((prev) =>
            prev.map((product) => {
                if (product.id !== selectedProduct.id) return product;

                return {
                    ...product,
                    stock:
                        adjustmentType === "tambah"
                            ? product.stock + amount
                            : product.stock - amount,
                };
            })
        );

        closeAdjustment();
    };

    return (
        <div className="stok-page">
            <div className="stok-header">
                <div>
                    <h1>Manajemen Stok Barang</h1>
                    <p>Pantau dan kelola persediaan barang toko Anda.</p>
                </div>
            </div>

            <div className="stok-statistics">
                <div className="stok-stat-card">
                    <div className="stok-stat-icon blue">
                        <FaBox />
                    </div>
                    <div>
                        <p>Total Produk</p>
                        <h2>{totalProducts}</h2>
                    </div>
                </div>

                <div className="stok-stat-card">
                    <div className="stok-stat-icon purple">
                        <FaBoxes />
                    </div>
                    <div>
                        <p>Total Stok Barang</p>
                        <h2>{totalStock}</h2>
                    </div>
                </div>

                <div className="stok-stat-card">
                    <div className="stok-stat-icon orange">
                        <FaExclamationTriangle />
                    </div>
                    <div>
                        <p>Stok Menipis</p>
                        <h2>{lowStock}</h2>
                    </div>
                </div>

                <div className="stok-stat-card">
                    <div className="stok-stat-icon red">
                        <FaTimes />
                    </div>
                    <div>
                        <p>Stok Habis</p>
                        <h2>{outOfStock}</h2>
                    </div>
                </div>
            </div>

            <div className="stok-content">
                <div className="stok-content-header">
                    <div>
                        <h3>Daftar Persediaan Barang</h3>
                        <p>Informasi jumlah dan kondisi stok produk.</p>
                    </div>

                    <div className="stok-filter-area">
                        <div className="stok-search">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Cari nama produk..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="Semua">Semua Stok</option>
                            <option value="Tersedia">Tersedia</option>
                            <option value="Menipis">Stok Menipis</option>
                            <option value="Habis">Stok Habis</option>
                        </select>
                    </div>
                </div>

                <div className="stok-table-wrapper">
                    <table className="stok-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Jumlah Stok</th>
                                <th>Minimal Stok</th>
                                <th>Kondisi</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => {
                                    const status = getStockStatus(product);

                                    return (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td className="stok-product-name">
                                                {product.name}
                                            </td>
                                            <td>{product.category}</td>
                                            <td>
                                                <strong>{product.stock}</strong>
                                            </td>
                                            <td>{product.minStock}</td>
                                            <td>
                                                <span
                                                    className={`stok-status ${status.className}`}
                                                >
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="stok-actions">
                                                    <button
                                                        className="stok-add-btn"
                                                        title="Tambah stok"
                                                        onClick={() =>
                                                            openAdjustment(
                                                                product,
                                                                "tambah"
                                                            )
                                                        }
                                                    >
                                                        <FaPlus />
                                                    </button>

                                                    <button
                                                        className="stok-reduce-btn"
                                                        title="Kurangi stok"
                                                        disabled={product.stock === 0}
                                                        onClick={() =>
                                                            openAdjustment(
                                                                product,
                                                                "kurang"
                                                            )
                                                        }
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="stok-empty">
                                        Produk tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedProduct && (
                <div className="stok-modal-overlay">
                    <div className="stok-modal">
                        <div className="stok-modal-header">
                            <div>
                                <h3>
                                    {adjustmentType === "tambah"
                                        ? "Tambah Stok Barang"
                                        : "Kurangi Stok Barang"}
                                </h3>
                                <p>{selectedProduct.name}</p>
                            </div>

                            <button
                                className="stok-close-btn"
                                onClick={closeAdjustment}
                                type="button"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleAdjustment}>
                            <div className="stok-current-info">
                                <span>Stok saat ini</span>
                                <strong>{selectedProduct.stock} unit</strong>
                            </div>

                            <div className="stok-form-group">
                                <label>Jumlah Barang</label>
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={adjustment}
                                    onChange={(e) =>
                                        setAdjustment(e.target.value)
                                    }
                                    placeholder="Masukkan jumlah barang"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="stok-modal-footer">
                                <button
                                    type="button"
                                    className="stok-cancel-btn"
                                    onClick={closeAdjustment}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="stok-confirm-btn"
                                >
                                    {adjustmentType === "tambah"
                                        ? "Tambah Stok"
                                        : "Kurangi Stok"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stok;
