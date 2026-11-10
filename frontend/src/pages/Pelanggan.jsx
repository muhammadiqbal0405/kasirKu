
import { useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaUsers,
    FaTimes
} from "react-icons/fa";

import "./Pelanggan.css";

const initialCustomers = [
    {
        id: 1,
        name: "Andi Saputra",
        phone: "081234567890",
        email: "andi@gmail.com",
        address: "Geudong, Aceh Utara",
        status: "Aktif",
    },
    {
        id: 2,
        name: "Siti Rahma",
        phone: "082345678901",
        email: "siti@gmail.com",
        address: "Lhokseumawe",
        status: "Aktif",
    },
    {
        id: 3,
        name: "Budi Santoso",
        phone: "085678901234",
        email: "budi@gmail.com",
        address: "Aceh Utara",
        status: "Aktif",
    },
];

function Pelanggan() {
    const [customers, setCustomers] = useState(initialCustomers);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        status: "Aktif",
    });

    const filteredCustomers = customers.filter((customer) =>
        `${customer.name} ${customer.phone}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const activeCustomers = customers.filter(
        (customer) => customer.status === "Aktif"
    ).length;

    const handleAdd = () => {
        setEditId(null);
        setForm({
            name: "",
            phone: "",
            email: "",
            address: "",
            status: "Aktif",
        });
        setShowModal(true);
    };

    const handleEdit = (customer) => {
        setEditId(customer.id);
        setForm({ ...customer });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !form.name.trim() ||
            !form.phone.trim() ||
            !form.address.trim()
        ) {
            alert("Mohon lengkapi nama, nomor telepon, dan alamat.");
            return;
        }

        if (!/^[0-9+\-\s]{8,20}$/.test(form.phone.trim())) {
            alert("Nomor telepon tidak valid.");
            return;
        }

        if (
            form.email.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ) {
            alert("Format email tidak valid.");
            return;
        }

        const customerData = {
            ...form,
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            address: form.address.trim(),
        };

        if (editId !== null) {
            setCustomers((previous) =>
                previous.map((customer) =>
                    customer.id === editId
                        ? { ...customer, ...customerData }
                        : customer
                )
            );
        } else {
            setCustomers((previous) => [
                ...previous,
                {
                    id: Date.now(),
                    ...customerData,
                },
            ]);
        }

        setShowModal(false);
    };

    const handleDelete = (id) => {
        const confirmation = window.confirm(
            "Apakah kamu yakin ingin menghapus pelanggan ini?"
        );

        if (confirmation) {
            setCustomers((previous) =>
                previous.filter((customer) => customer.id !== id)
            );
        }
    };

    return (
        <div className="customers-container">

            <div className="customers-header">
                <div>
                    <h1>Manajemen Pelanggan</h1>
                    <p>Kelola informasi dan data pelanggan toko.</p>
                </div>

                <button className="add-customer-btn" onClick={handleAdd}>
                    <FaPlus />
                    Tambah Pelanggan
                </button>
            </div>

            <div className="customer-statistics">
                <div className="customer-stat-card">
                    <div className="customer-stat-icon blue">
                        <FaUsers />
                    </div>
                    <div>
                        <p>Total Pelanggan</p>
                        <h2>{customers.length}</h2>
                    </div>
                </div>

                <div className="customer-stat-card">
                    <div className="customer-stat-icon green">
                        <FaUsers />
                    </div>
                    <div>
                        <p>Pelanggan Aktif</p>
                        <h2>{activeCustomers}</h2>
                    </div>
                </div>
            </div>

            <div className="customers-card">

                <div className="customers-toolbar">
                    <div>
                        <h3>Daftar Pelanggan</h3>
                        <p>Informasi seluruh pelanggan toko.</p>
                    </div>

                    <div className="customer-search">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Cari nama atau telepon..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="customers-table-wrapper">
                    <table className="customers-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nama Pelanggan</th>
                                <th>Nomor Telepon</th>
                                <th>Email</th>
                                <th>Alamat</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer, index) => (
                                    <tr key={customer.id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <div className="customer-name">
                                                <div className="customer-avatar">
                                                    <FaUsers />
                                                </div>
                                                <strong>{customer.name}</strong>
                                            </div>
                                        </td>

                                        <td>{customer.phone}</td>
                                        <td>{customer.email || "-"}</td>
                                        <td>{customer.address}</td>

                                        <td>
                                            <span className="customer-status">
                                                {customer.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="customer-actions">
                                                <button
                                                    className="edit-customer-btn"
                                                    title="Edit pelanggan"
                                                    onClick={() => handleEdit(customer)}
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    className="delete-customer-btn"
                                                    title="Hapus pelanggan"
                                                    onClick={() => handleDelete(customer.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="empty-customers">
                                        Pelanggan tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="customers-footer">
                    Menampilkan {filteredCustomers.length} dari {customers.length} pelanggan
                </div>
            </div>

            {showModal && (
                <div className="customer-modal-overlay">
                    <div className="customer-modal">

                        <div className="customer-modal-header">
                            <div>
                                <h3>
                                    {editId !== null
                                        ? "Edit Pelanggan"
                                        : "Tambah Pelanggan"}
                                </h3>
                                <p>Lengkapi informasi pelanggan berikut.</p>
                            </div>

                            <button
                                type="button"
                                className="close-customer-modal"
                                onClick={() => setShowModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="customer-form-group">
                                <label>Nama Pelanggan</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Masukkan nama pelanggan"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="customer-form-group">
                                <label>Nomor Telepon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Contoh: 081234567890"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="customer-form-group">
                                <label>Email (Opsional)</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Contoh: nama@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="customer-form-group">
                                <label>Alamat</label>
                                <textarea
                                    name="address"
                                    placeholder="Masukkan alamat pelanggan"
                                    value={form.address}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="customer-form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                            </div>

                            <div className="customer-modal-actions">
                                <button
                                    type="button"
                                    className="cancel-customer-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Batal
                                </button>

                                <button type="submit" className="save-customer-btn">
                                    {editId !== null
                                        ? "Simpan Perubahan"
                                        : "Simpan Pelanggan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pelanggan;
