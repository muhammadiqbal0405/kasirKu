import { useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaBox,
    FaTimes,
} from "react-icons/fa";
import { useStore } from "../context/useStore";
import "./Products.css";

function Products() {
    const {
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
    } = useStore();

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Semua");
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "",
        categoryId: "",
        price: "",
        stock: "",
    });

    const formatRupiah = (value) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(Number(value) || 0);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesCategory =
            categoryFilter === "Semua" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleAdd = () => {
        setEditId(null);
        setForm({
            name: "",
            categoryId: categories[0]?.id ? String(categories[0].id) : "",
            price: "",
            stock: "",
        });
        setShowModal(true);
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setForm({
            name: product.name,
            categoryId: String(product.categoryId ?? ""),
            price: String(product.price),
            stock: String(product.stock),
        });
        setShowModal(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim() || !form.categoryId || form.price === "" || form.stock === "") {
            alert("Mohon lengkapi semua data produk.");
            return;
        }

        if (
            !Number.isFinite(Number(form.price)) ||
            !Number.isFinite(Number(form.stock)) ||
            Number(form.price) < 0 ||
            Number(form.stock) < 0
        ) {
            alert("Harga dan stok harus berupa angka yang valid dan tidak boleh negatif.");
            return;
        }

        const productData = {
            name: form.name.trim(),
            categoryId: Number(form.categoryId),
            price: Number(form.price),
            stock: Number(form.stock),
        };

        try {
            setSaving(true);
            if (editId !== null) {
                await updateProduct(editId, productData);
                alert("Produk berhasil diperbarui!");
            } else {
                await addProduct(productData);
                alert("Produk berhasil ditambahkan!");
            }
            setShowModal(false);
            setEditId(null);
            setForm({
                name: "",
                categoryId: categories[0]?.id ? String(categories[0].id) : "",
                price: "",
                stock: "",
            });
        } catch (error) {
            alert(error.message || "Terjadi kesalahan saat menyimpan produk.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const product = products.find((item) => item.id === id);
        if (!product) {
            alert("Produk tidak ditemukan.");
            return;
        }

        const confirmation = window.confirm(
            `Apakah kamu yakin ingin menghapus produk "${product.name}"?`
        );
        if (!confirmation) return;

        try {
            await deleteProduct(id);
            alert("Produk berhasil dihapus!");
        } catch (error) {
            alert(error.message || "Gagal menghapus produk.");
        }
    };

    const totalProducts = products.length;
    const lowStock = products.filter((product) => Number(product.stock) <= 10).length;

    return (
        <div className="products-container">
            <div className="products-header">
                <div>
                    <h1>Manajemen Produk</h1>
                    <p>Kelola seluruh produk yang tersedia di toko.</p>
                </div>
                <button
                    type="button"
                    className="add-product-btn"
                    onClick={handleAdd}
                    disabled={loading || categories.length === 0}
                    title={categories.length === 0 ? "Tambahkan kategori terlebih dahulu" : "Tambah produk"}
                >
                    <FaPlus />
                    Tambah Produk
                </button>
            </div>

            <div className="product-statistics">
                <div className="product-stat-card">
                    <div className="product-stat-icon blue"><FaBox /></div>
                    <div>
                        <p>Total Produk</p>
                        <h2>{totalProducts}</h2>
                    </div>
                </div>
                <div className="product-stat-card">
                    <div className="product-stat-icon orange"><FaBox /></div>
                    <div>
                        <p>Stok Menipis</p>
                        <h2>{lowStock}</h2>
                    </div>
                </div>
            </div>

            <div className="products-card">
                <div className="products-toolbar">
                    <div>
                        <h3>Daftar Produk</h3>
                        <p>Informasi seluruh produk toko</p>
                    </div>
                    <div className="product-filters">
                        <div className="product-search">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Cari nama produk..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(event) => setCategoryFilter(event.target.value)}
                        >
                            <option value="Semua">Semua Kategori</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="products-table-wrapper">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Harga</th>
                                <th>Stok</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" className="empty-products">Memuat data produk...</td></tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="product-name">
                                                <div className="product-avatar"><FaBox /></div>
                                                <strong>{product.name}</strong>
                                            </div>
                                        </td>
                                        <td>{product.category}</td>
                                        <td className="product-price">{formatRupiah(product.price)}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <span className={Number(product.stock) <= 10 ? "stock-status low" : "stock-status available"}>
                                                {Number(product.stock) <= 10 ? "Stok Menipis" : "Tersedia"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="product-actions">
                                                <button type="button" className="edit-product-btn" title="Edit produk" onClick={() => handleEdit(product)}>
                                                    <FaEdit />
                                                </button>
                                                <button type="button" className="delete-product-btn" title="Hapus produk" onClick={() => handleDelete(product.id)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="7" className="empty-products">Produk tidak ditemukan.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="products-footer">
                    Menampilkan {filteredProducts.length} dari {totalProducts} produk
                </div>
            </div>

            {showModal && (
                <div className="product-modal-overlay">
                    <div className="product-modal">
                        <div className="product-modal-header">
                            <div>
                                <h3>{editId !== null ? "Edit Produk" : "Tambah Produk"}</h3>
                                <p>Lengkapi informasi produk berikut.</p>
                            </div>
                            <button type="button" className="close-modal-btn" onClick={() => setShowModal(false)} aria-label="Tutup modal">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="product-form-group">
                                <label htmlFor="product-name">Nama Produk</label>
                                <input
                                    id="product-name"
                                    type="text"
                                    name="name"
                                    placeholder="Masukkan nama produk"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="product-form-group">
                                <label htmlFor="product-category">Kategori</label>
                                <select
                                    id="product-category"
                                    name="categoryId"
                                    value={form.categoryId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Pilih kategori</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="product-form-row">
                                <div className="product-form-group">
                                    <label htmlFor="product-price">Harga (Rp)</label>
                                    <input
                                        id="product-price"
                                        type="number"
                                        name="price"
                                        placeholder="Contoh: 10000"
                                        min="0"
                                        value={form.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="product-form-group">
                                    <label htmlFor="product-stock">Stok</label>
                                    <input
                                        id="product-stock"
                                        type="number"
                                        name="stock"
                                        placeholder="Jumlah stok"
                                        min="0"
                                        value={form.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="product-modal-actions">
                                <button type="button" className="cancel-product-btn" onClick={() => setShowModal(false)} disabled={saving}>
                                    Batal
                                </button>
                                <button type="submit" className="save-product-btn" disabled={saving || categories.length === 0}>
                                    {saving ? "Menyimpan..." : editId !== null ? "Simpan Perubahan" : "Simpan Produk"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
