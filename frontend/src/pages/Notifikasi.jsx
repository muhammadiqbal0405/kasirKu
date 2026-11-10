
import { useState } from "react";
import {
    FaBell,
    FaBox,
    FaShoppingCart,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTrash,
    FaCheckDouble,
    FaInfoCircle,
} from "react-icons/fa";
import "./Notifikasi.css";

const initialNotifications = [
    {
        id: 1,
        title: "Stok Barang Menipis",
        message: "Stok Beras 5 Kg tersisa 15 unit. Segera lakukan pengadaan.",
        type: "warning",
        date: "08 November 2026",
        time: "09:30",
        read: false,
    },
    {
        id: 2,
        title: "Stok Barang Menipis",
        message: "Stok Gula Pasir 1 Kg tersisa 8 unit.",
        type: "warning",
        date: "08 November 2026",
        time: "09:15",
        read: false,
    },
    {
        id: 3,
        title: "Stok Barang Habis",
        message: "Stok Minyak Goreng 1 L sudah habis.",
        type: "danger",
        date: "08 November 2026",
        time: "08:45",
        read: false,
    },
    {
        id: 4,
        title: "Transaksi Berhasil",
        message: "Transaksi TRX-001 berhasil diselesaikan sebesar Rp125.000.",
        type: "success",
        date: "08 November 2026",
        time: "08:30",
        read: true,
    },
    {
        id: 5,
        title: "Transaksi Berhasil",
        message: "Transaksi TRX-002 berhasil diselesaikan sebesar Rp85.000.",
        type: "success",
        date: "08 November 2026",
        time: "08:10",
        read: true,
    },
    {
        id: 6,
        title: "Informasi Sistem",
        message: "Selamat datang di aplikasi KasirKu. Selamat bekerja!",
        type: "info",
        date: "07 November 2026",
        time: "10:00",
        read: true,
    },
];

function Notifikasi() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState("semua");

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const filteredNotifications = notifications.filter((notification) => {
        if (filter === "belum-dibaca") {
            return !notification.read;
        }

        if (filter === "sudah-dibaca") {
            return notification.read;
        }

        return true;
    });

    const getNotificationIcon = (type) => {
        switch (type) {
            case "warning":
                return <FaExclamationTriangle />;

            case "danger":
                return <FaBox />;

            case "success":
                return <FaShoppingCart />;

            default:
                return <FaInfoCircle />;
        }
    };

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    };

    const clearAllNotifications = () => {
        if (notifications.length === 0) return;

        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus semua notifikasi?"
        );

        if (confirmed) {
            setNotifications([]);
        }
    };

    return (
        <div className="notifikasi-page">
            <div className="notifikasi-header">
                <div>
                    <h1>Notifikasi</h1>
                    <p>
                        Lihat informasi dan aktivitas terbaru aplikasi KasirKu.
                    </p>
                </div>

                <div className="notifikasi-header-actions">
                    <button
                        className="notifikasi-read-all"
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                    >
                        <FaCheckDouble />
                        Tandai Semua Dibaca
                    </button>

                    <button
                        className="notifikasi-delete-all"
                        onClick={clearAllNotifications}
                        disabled={notifications.length === 0}
                    >
                        <FaTrash />
                        Hapus Semua
                    </button>
                </div>
            </div>

            <div className="notifikasi-summary">
                <div className="notifikasi-summary-card">
                    <div className="notifikasi-summary-icon blue">
                        <FaBell />
                    </div>
                    <div>
                        <p>Total Notifikasi</p>
                        <h2>{notifications.length}</h2>
                    </div>
                </div>

                <div className="notifikasi-summary-card">
                    <div className="notifikasi-summary-icon orange">
                        <FaInfoCircle />
                    </div>
                    <div>
                        <p>Belum Dibaca</p>
                        <h2>{unreadCount}</h2>
                    </div>
                </div>

                <div className="notifikasi-summary-card">
                    <div className="notifikasi-summary-icon green">
                        <FaCheckCircle />
                    </div>
                    <div>
                        <p>Sudah Dibaca</p>
                        <h2>{notifications.length - unreadCount}</h2>
                    </div>
                </div>
            </div>

            <div className="notifikasi-content">
                <div className="notifikasi-content-header">
                    <div>
                        <h3>Semua Pemberitahuan</h3>
                        <p>Kelola pemberitahuan aktivitas toko Anda.</p>
                    </div>

                    <div className="notifikasi-filter">
                        <button
                            className={filter === "semua" ? "active" : ""}
                            onClick={() => setFilter("semua")}
                        >
                            Semua
                        </button>

                        <button
                            className={
                                filter === "belum-dibaca" ? "active" : ""
                            }
                            onClick={() => setFilter("belum-dibaca")}
                        >
                            Belum Dibaca
                        </button>

                        <button
                            className={
                                filter === "sudah-dibaca" ? "active" : ""
                            }
                            onClick={() => setFilter("sudah-dibaca")}
                        >
                            Sudah Dibaca
                        </button>
                    </div>
                </div>

                <div className="notifikasi-list">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notifikasi-item ${
                                    notification.read ? "read" : "unread"
                                }`}
                            >
                                <div
                                    className={`notifikasi-item-icon ${notification.type}`}
                                >
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="notifikasi-item-body">
                                    <div className="notifikasi-item-heading">
                                        <h4>{notification.title}</h4>

                                        {!notification.read && (
                                            <span className="notifikasi-dot" />
                                        )}
                                    </div>

                                    <p>{notification.message}</p>

                                    <span className="notifikasi-date">
                                        {notification.date} · {notification.time}
                                    </span>
                                </div>

                                <div className="notifikasi-item-actions">
                                    {!notification.read && (
                                        <button
                                            className="notifikasi-mark-btn"
                                            title="Tandai sudah dibaca"
                                            onClick={() =>
                                                markAsRead(notification.id)
                                            }
                                        >
                                            <FaCheckCircle />
                                        </button>
                                    )}

                                    <button
                                        className="notifikasi-remove-btn"
                                        title="Hapus notifikasi"
                                        onClick={() =>
                                            deleteNotification(notification.id)
                                        }
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="notifikasi-empty">
                            <div className="notifikasi-empty-icon">
                                <FaBell />
                            </div>
                            <h3>Tidak Ada Notifikasi</h3>
                            <p>
                                {filter === "belum-dibaca"
                                    ? "Semua notifikasi sudah dibaca."
                                    : filter === "sudah-dibaca"
                                    ? "Belum ada notifikasi yang dibaca."
                                    : "Belum ada pemberitahuan untuk ditampilkan."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notifikasi;
