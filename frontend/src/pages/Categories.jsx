
import { useState } from "react";


import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTags,
    FaTimes,
} from "react-icons/fa";

import { useStore } from "../context/useStore";

import "./Categories.css";

function Categories() {
    const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
} = useStore();

    // State pencarian
    const [search, setSearch] = useState("");

    // State modal tambah dan edit
    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    // State form kategori
    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    // Filter kategori berdasarkan pencarian
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    // Membuka modal tambah kategori
    const openAddModal = () => {
        setEditId(null);

        setForm({
            name: "",
            description: "",
        });

        setModalOpen(true);
    };

    // Membuka modal edit kategori
    const openEditModal = (category) => {
        setEditId(category.id);

        setForm({
            name: category.name,
            description: category.description || "",
        });

        setModalOpen(true);
    };

    // Menyimpan kategori baru atau perubahan kategori
    
const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryName = form.name.trim();
    const categoryDescription = form.description.trim();

    if (!categoryName) {
        alert("Nama kategori wajib diisi!");
        return;
    }

    const duplicate = categories.some(
        (category) =>
            category.name.toLowerCase() === categoryName.toLowerCase() &&
            category.id !== editId
    );

    if (duplicate) {
        alert("Nama kategori sudah tersedia!");
        return;
    }

    try {
        if (editId !== null) {
            await updateCategory(editId, {
                name: categoryName,
                description: categoryDescription,
            });

            alert("Kategori berhasil diperbarui!");
        } else {
            await addCategory({
                name: categoryName,
                description: categoryDescription,
            });

            alert("Kategori berhasil ditambahkan!");
        }

        setModalOpen(false);
        setForm({ name: "", description: "" });
        setEditId(null);

    } catch (error) {
        alert(error.message);
    }
};


    // Menghapus kategori
    
const handleDelete = async (id) => {
    const category = categories.find(
        (item) => item.id === id
    );

    if (!category) {
        alert("Kategori tidak ditemukan!");
        return;
    }

    const usedByProducts = products.some(
        (product) => product.categoryId === id
    );

    if (usedByProducts) {
        alert(
            `Kategori "${category.name}" masih digunakan oleh produk. Ubah kategori produk terlebih dahulu.`
        );
        return;
    }

    const confirmed = window.confirm(
        `Apakah kamu yakin ingin menghapus kategori "${category.name}"?`
    );

    if (!confirmed) return;

    try {
        await deleteCategory(id);
        alert("Kategori berhasil dihapus!");
    } catch (error) {
        alert(error.message);
    }
};

    // Menghitung total produk
    const totalProducts = products.length;

    return (
        <div className="categories-page">

            {/* HEADER */}
            <div className="categories-header">
                <div>
                    <h1>Manajemen Kategori</h1>
                    <p>
                        Kelola kategori untuk mengelompokkan produk.
                    </p>
                </div>

                <button
                    className="add-category-btn"
                    onClick={openAddModal}
                >
                    <FaPlus />
                    Tambah Kategori
                </button>
            </div>

            {/* STATISTIK KATEGORI */}
            <div className="category-stats">

                <div className="category-stat-card">
                    <div className="category-stat-icon">
                        <FaTags />
                    </div>

                    <div>
                        <span>Total Kategori</span>
                        <h2>{categories.length}</h2>
                    </div>
                </div>

                <div className="category-stat-card">
                    <div className="category-stat-icon">
                        <FaTags />
                    </div>

                    <div>
                        <span>Total Produk</span>
                        <h2>{totalProducts}</h2>
                    </div>
                </div>

            </div>

            {/* DAFTAR KATEGORI */}
            <div className="category-content">

                {/* TOOLBAR */}
                <div className="category-toolbar">

                    <h3>Daftar Kategori</h3>

                    <div className="category-search">
                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Cari kategori..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />
                    </div>

                </div>

                {/* TABEL KATEGORI */}
                <div className="category-table-wrapper">

                    <table className="category-table">

                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nama Kategori</th>
                                <th>Deskripsi</th>
                                <th>Jumlah Produk</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredCategories.length > 0 ? (

                                filteredCategories.map((category, index) => (

                                    <tr key={category.id}>

                                        <td>{index + 1}</td>

                                        <td>
                                            <div className="category-name">

                                                <span className="category-row-icon">
                                                    <FaTags />
                                                </span>

                                                <strong>
                                                    {category.name}
                                                </strong>

                                            </div>
                                        </td>

                                        <td>
                                            {category.description || "-"}
                                        </td>

                                        <td>
                                            {products.filter(
                                                (product) => product.categoryId === category.id
                                            ).length} produk
                                        </td>

                                        <td>
                                            <div className="category-actions">

                                                {/* TOMBOL EDIT */}
                                                <button
                                                    className="edit-category-btn"
                                                    onClick={() =>
                                                        openEditModal(category)
                                                    }
                                                    aria-label="Edit kategori"
                                                    title="Edit kategori"
                                                >
                                                    <FaEdit />
                                                </button>

                                                {/* TOMBOL HAPUS */}
                                                <button
                                                    className="delete-category-btn"
                                                    onClick={() =>
                                                        handleDelete(category.id)
                                                    }
                                                    aria-label="Hapus kategori"
                                                    title="Hapus kategori"
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="empty-category"
                                    >
                                        Kategori tidak ditemukan.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* MODAL TAMBAH DAN EDIT KATEGORI */}
            {modalOpen && (

                <div className="category-modal-overlay">

                    <div className="category-modal">

                        {/* HEADER MODAL */}
                        <div className="category-modal-header">

                            <h3>
                                {editId !== null
                                    ? "Edit Kategori"
                                    : "Tambah Kategori"}
                            </h3>

                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                aria-label="Tutup modal"
                            >
                                <FaTimes />
                            </button>

                        </div>

                        {/* FORM KATEGORI */}
                        <form onSubmit={handleSubmit}>

                            {/* NAMA KATEGORI */}
                            <div className="category-form-group">

                                <label>Nama Kategori</label>

                                <input
                                    type="text"
                                    placeholder="Contoh: Makanan"
                                    value={form.name}
                                    onChange={(event) =>
                                        setForm((previous) => ({
                                            ...previous,
                                            name: event.target.value,
                                        }))
                                    }
                                    required
                                />

                            </div>

                            {/* DESKRIPSI KATEGORI */}
                            <div className="category-form-group">

                                <label>Deskripsi</label>

                                <textarea
                                    placeholder="Masukkan deskripsi kategori..."
                                    value={form.description}
                                    onChange={(event) =>
                                        setForm((previous) => ({
                                            ...previous,
                                            description: event.target.value,
                                        }))
                                    }
                                />

                            </div>

                            {/* TOMBOL FORM */}
                            <div className="category-modal-actions">

                                <button
                                    type="button"
                                    className="cancel-category-btn"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="save-category-btn"
                                >
                                    {editId !== null
                                        ? "Simpan Perubahan"
                                        : "Simpan Kategori"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Categories;
