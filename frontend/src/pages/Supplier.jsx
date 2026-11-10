
import { useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTruck,
    FaUsers,
    FaTimes,
    FaSave,
    FaBuilding,
} from "react-icons/fa";
import "./Supplier.css";

const initialSuppliers = [
    {
        id: 1,
        name: "PT Sumber Makmur",
        contact: "Andi Saputra",
        phone: "081234567890",
        email: "sumbermakmur@gmail.com",
        address: "Banda Aceh",
        status: "Aktif",
    },
    {
        id: 2,
        name: "CV Berkah Jaya",
        contact: "Budi Santoso",
        phone: "082345678901",
        email: "berkahjaya@gmail.com",
        address: "Lhokseumawe",
        status: "Aktif",
    },
    {
        id: 3,
        name: "UD Mitra Sejahtera",
        contact: "Siti Rahma",
        phone: "085678901234",
        email: "mitrasejahtera@gmail.com",
        address: "Takengon",
        status: "Tidak Aktif",
    },
];

const emptyForm = {
    name: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    status: "Aktif",
};

function Supplier() {
    const [suppliers, setSuppliers] = useState(initialSuppliers);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const activeSuppliers = suppliers.filter(
        (supplier) => supplier.status === "Aktif"
    ).length;

    const filteredSuppliers = suppliers.filter((supplier) =>
        `${supplier.name} ${supplier.contact} ${supplier.phone}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const openAddModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEditModal = (supplier) => {
        setEditingId(supplier.id);
        setForm({
            name: supplier.name,
            contact: supplier.contact,
            phone: supplier.phone,
            email: supplier.email,
            address: supplier.address,
            status: supplier.status,
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !form.name.trim() ||
            !form.contact.trim() ||
            !form.phone.trim()
        ) {
            alert("Nama supplier, kontak, dan nomor telepon wajib diisi!");
            return;
        }

        if (editingId) {
            setSuppliers((prev) =>
                prev.map((supplier) =>
                    supplier.id === editingId
                        ? { ...form, id: editingId }
                        : supplier
                )
            );
        } else {
            const newSupplier = {
                ...form,
                id: Date.now(),
            };

            setSuppliers((prev) => [...prev, newSupplier]);
        }

        setShowModal(false);
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus supplier ini?"
        );

        if (confirmed) {
            setSuppliers((prev) =>
                prev.filter((supplier) => supplier.id !== id)
            );
        }
    };

    return (
        <div className="supplier-page">
            <div className="supplier-header">
                <div>
                    <h1>Data Supplier</h1>
                    <p>Kelola informasi pemasok barang toko Anda.</p>
                </div>

                <button className="supplier-add-btn" onClick={openAddModal}>
                    <FaPlus /> Tambah Supplier
                </button>
            </div>

            <div className="supplier-stats">
                <div className="supplier-stat-card">
                    <div className="supplier-stat-icon blue">
                        <FaTruck />
                    </div>
                    <div>
                        <p>Total Supplier</p>
                        <h2>{suppliers.length}</h2>
                    </div>
                </div>

                <div className="supplier-stat-card">
                    <div className="supplier-stat-icon green">
                        <FaUsers />
                    </div>
                    <div>
                        <p>Supplier Aktif</p>
                        <h2>{activeSuppliers}</h2>
                    </div>
                </div>

                <div className="supplier-stat-card">
                    <div className="supplier-stat-icon orange">
                        <FaBuilding />
                    </div>
                    <div>
                        <p>Supplier Tidak Aktif</p>
                        <h2>{suppliers.length - activeSuppliers}</h2>
                    </div>
                </div>
            </div>

            <div className="supplier-content">
                <div className="supplier-content-header">
                    <div>
                        <h3>Daftar Supplier</h3>
                        <p>Informasi seluruh pemasok barang.</p>
                    </div>

                    <div className="supplier-search">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Cari supplier..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="supplier-table-wrapper">
                    <table className="supplier-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Supplier</th>
                                <th>Kontak Person</th>
                                <th>Telepon</th>
                                <th>Email</th>
                                <th>Alamat</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredSuppliers.length > 0 ? (
                                filteredSuppliers.map((supplier, index) => (
                                    <tr key={supplier.id}>
                                        <td>{index + 1}</td>
                                        <td className="supplier-name">
                                            {supplier.name}
                                        </td>
                                        <td>{supplier.contact}</td>
                                        <td>{supplier.phone}</td>
                                        <td>{supplier.email || "-"}</td>
                                        <td>{supplier.address || "-"}</td>
                                        <td>
                                            <span
                                                className={`supplier-status ${
                                                    supplier.status === "Aktif"
                                                        ? "active"
                                                        : "inactive"
                                                }`}
                                            >
                                                {supplier.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="supplier-actions">
                                                <button
                                                    className="supplier-edit-btn"
                                                    onClick={() =>
                                                        openEditModal(supplier)
                                                    }
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    className="supplier-delete-btn"
                                                    onClick={() =>
                                                        handleDelete(supplier.id)
                                                    }
                                                    title="Hapus"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="supplier-empty">
                                        Data supplier tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="supplier-modal-overlay">
                    <div className="supplier-modal">
                        <div className="supplier-modal-header">
                            <div>
                                <h3>
                                    {editingId
                                        ? "Edit Supplier"
                                        : "Tambah Supplier"}
                                </h3>
                                <p>Lengkapi informasi supplier berikut.</p>
                            </div>

                            <button
                                className="supplier-close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="supplier-form-grid">
                                <div className="supplier-form-group">
                                    <label>Nama Supplier *</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama perusahaan"
                                        required
                                    />
                                </div>

                                <div className="supplier-form-group">
                                    <label>Kontak Person *</label>
                                    <input
                                        name="contact"
                                        value={form.contact}
                                        onChange={handleChange}
                                        placeholder="Nama penanggung jawab"
                                        required
                                    />
                                </div>

                                <div className="supplier-form-group">
                                    <label>Nomor Telepon *</label>
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="Masukkan nomor telepon"
                                        required
                                    />
                                </div>

                                <div className="supplier-form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="contoh@email.com"
                                    />
                                </div>

                                <div className="supplier-form-group full">
                                    <label>Alamat</label>
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Masukkan alamat supplier"
                                        rows="3"
                                    />
                                </div>

                                <div className="supplier-form-group full">
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Tidak Aktif">
                                            Tidak Aktif
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="supplier-modal-footer">
                                <button
                                    type="button"
                                    className="supplier-cancel-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="supplier-save-btn"
                                >
                                    <FaSave />
                                    {editingId ? "Simpan Perubahan" : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Supplier;
