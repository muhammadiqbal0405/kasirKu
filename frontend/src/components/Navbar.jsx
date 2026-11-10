
import { NavLink } from "react-router-dom";
import { useState } from "react"; // Mengambil hook useState dari React

import {
    FaCashRegister,       // Icon logo kasir
    FaHome,               // Icon dashboard
    FaShoppingCart,       // Icon transaksi
    FaBox,                // Icon produk
    FaTags,               // Icon kategori
    FaUsers,              // Icon pelanggan
    FaTruck,              // Icon supplier
    FaWarehouse,          // Icon stok barang
    FaChartBar,           // Icon laporan
    FaCog,                // Icon pengaturan
    FaSearch,             // Icon pencarian
    FaBell,               // Icon notifikasi
    FaUserCircle,         // Icon profil
    FaChevronDown,        // Icon panah dropdown
    FaBars,               // Icon hamburger
    FaTimes,              // Icon tutup menu
    FaSignOutAlt,         // Icon logout
    FaUser,               // Icon akun
    FaQuestionCircle      // Icon bantuan
} from "react-icons/fa";

import "./Navbar.css"; // Menghubungkan file CSS navbar

function Navbar() {

    // Menyimpan kondisi menu mobile, awalnya tertutup
    const [menuOpen, setMenuOpen] = useState(false);

    // Menyimpan kondisi dropdown profil
    const [profileOpen, setProfileOpen] = useState(false);

    // Menyimpan kondisi dropdown notifikasi
    const [notificationOpen, setNotificationOpen] = useState(false);

    // Data seluruh menu navigasi
    const menus = [
        { name: "Dashboard", icon: <FaHome />, path: "/" },
        { name: "Transaksi", icon: <FaShoppingCart />, path: "/transaksi" },
        { name: "Produk", icon: <FaBox />, path: "/produk" },
        { name: "Kategori", icon: <FaTags />, path: "/kategori" },
        { name: "Pelanggan", icon: <FaUsers />, path: "/pelanggan" },
        { name: "Supplier", icon: <FaTruck />, path: "/supplier" },
        { name: "Stok Barang", icon: <FaWarehouse />, path: "/stok" },
        { name: "Laporan", icon: <FaChartBar />, path: "/laporan" },
        { name: "Pengaturan", icon: <FaCog />, path: "/pengaturan" }
    ];

    // Fungsi untuk memilih menu navigasi
   const handleMenuClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    setNotificationOpen(false);
};
    // Fungsi untuk membuka dropdown profil
    const toggleProfile = () => {
        setProfileOpen(!profileOpen);       // Membalik kondisi profil
        setNotificationOpen(false);         // Menutup notifikasi
    };

    // Fungsi untuk membuka notifikasi
    const toggleNotification = () => {
        setNotificationOpen(!notificationOpen); // Membalik kondisi notifikasi
        setProfileOpen(false);                  // Menutup profil
    };

    return (
        <header className="navbar">

            {/* BAGIAN LOGO */}
            <div className="navbar-logo">

                <div className="logo-icon">
                    <FaCashRegister /> {/* Icon aplikasi kasir */}
                </div>

                <div className="logo-text">
                    <h2>Kasir<span>Ku</span></h2>
                    <small>Point of Sale System</small>
                </div>

            </div>

            {/* BAGIAN MENU NAVIGASI */}
            <nav className={`nav-menu ${menuOpen ? "show" : ""}`}>

                {/* Mengulang data menus menggunakan map */}
                {menus.map((menu) => (
    <NavLink
        key={menu.path}
        to={menu.path}
        className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
        }
        onClick={handleMenuClick}
    >
        <span className="nav-icon">
            {menu.icon}
        </span>

        <span>{menu.name}</span>
    </NavLink>
))}

                {/* Bagian informasi tambahan pada mobile */}
                <div className="mobile-info">
                    <span>KasirKu v1.0</span>
                    <span>© 2026</span>
                </div>

            </nav>

            {/* BAGIAN KANAN NAVBAR */}
            <div className="navbar-right">

                {/* KOLOM PENCARIAN */}
                <div className="search-box">

                    <FaSearch /> {/* Icon search */}

                    <input
                        type="text"
                        placeholder="Cari produk..."
                        aria-label="Cari produk"
                    />

                    <span className="search-shortcut">⌕</span>

                </div>

                {/* BAGIAN NOTIFIKASI */}
                <div className="nav-dropdown">

                    <button
                        className="notification-btn"
                        onClick={toggleNotification}
                        aria-label="Notifikasi"
                        aria-expanded={notificationOpen}
                    >
                        <FaBell /> {/* Icon lonceng */}

                        <span className="notification-badge">
                            3
                        </span> {/* Jumlah notifikasi */}
                    </button>

                    {/* Dropdown notifikasi */}
                    {notificationOpen && (
                        <div className="notification-dropdown">

                            <div className="dropdown-header">
                                <strong>Notifikasi</strong>
                                <span>3 Baru</span>
                            </div>

                            <div className="notification-item">
                                <FaWarehouse />
                                <div>
                                    <strong>Stok menipis</strong>
                                    <small>Ada produk yang hampir habis</small>
                                </div>
                            </div>

                            <div className="notification-item">
                                <FaShoppingCart />
                                <div>
                                    <strong>Transaksi baru</strong>
                                    <small>Transaksi berhasil dilakukan</small>
                                </div>
                            </div>

                            <div className="notification-item">
                                <FaBox />
                                <div>
                                    <strong>Produk baru</strong>
                                    <small>Produk baru telah ditambahkan</small>
                                </div>
                            </div>

                            <a href="/notifikasi" className="view-all">
                                Lihat semua notifikasi
                            </a>

                        </div>
                    )}

                </div>

                {/* BAGIAN PROFIL PENGGUNA */}
                <div className="nav-dropdown profile-container">

                    <button
                        className="profile-btn"
                        onClick={toggleProfile}
                        aria-expanded={profileOpen}
                    >

                        <div className="profile-avatar">
                            <FaUserCircle /> {/* Icon profil */}
                        </div>

                        <div className="profile-info">
                            <strong>Admin Kasir</strong>
                            <small>Administrator</small>
                        </div>

                        <FaChevronDown className="profile-arrow" />

                    </button>

                    {/* Dropdown profil */}
                    {profileOpen && (
                        <div className="profile-dropdown">

                            <div className="profile-dropdown-header">
                                <FaUserCircle />
                                <div>
                                    <strong>Admin Kasir</strong>
                                    <small>admin@kasirku.com</small>
                                </div>
                            </div>

                            <a href="/profil">
                                <FaUser />
                                Profil Saya
                            </a>

                            <a href="/pengaturan">
                                <FaCog />
                                Pengaturan Akun
                            </a>

                            <a href="/bantuan">
                                <FaQuestionCircle />
                                Pusat Bantuan
                            </a>

                            <hr />

                            <a href="/logout" className="logout-link">
                                <FaSignOutAlt />
                                Logout
                            </a>

                        </div>
                    )}

                </div>

                {/* TOMBOL HAMBURGER MOBILE */}
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                    {/* Icon berubah ketika menu dibuka */}
                </button>

            </div>

        </header>
    );
}

// Mengekspor komponen agar bisa digunakan di App.jsx
export default Navbar;
