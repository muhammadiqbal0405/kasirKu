
import { useState } from "react";
import {
    FaStore,
    FaBell,
    FaReceipt,
    FaSave,
    FaCog,
} from "react-icons/fa";
import "./Pengaturan.css";

function Pengaturan() {
    const [store, setStore] = useState({
        name: "KasirKu Store",
        phone: "081234567890",
        email: "kasirku@gmail.com",
        address: "Geudong, Aceh",
    });

    const [preferences, setPreferences] = useState({
        currency: "IDR",
        lowStockNotification: true,
        transactionNotification: true,
        printReceipt: true,
        showStoreAddress: true,
    });

    const handleStoreChange = (e) => {
        const { name, value } = e.target;

        setStore((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePreferenceChange = (e) => {
        const { name, value, type, checked } = e.target;

        setPreferences((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();

        alert("Pengaturan berhasil disimpan sementara!");
        console.log("Informasi toko:", store);
        console.log("Preferensi aplikasi:", preferences);
    };

    return (
        <div className="pengaturan-page">
            <div className="pengaturan-header">
                <div>
                    <h1>Pengaturan</h1>
                    <p>Kelola informasi toko dan preferensi aplikasi.</p>
                </div>
            </div>

            <form onSubmit={handleSave}>
                <div className="pengaturan-section">
                    <div className="pengaturan-section-header">
                        <div className="pengaturan-icon blue">
                            <FaStore />
                        </div>
                        <div>
                            <h3>Informasi Toko</h3>
                            <p>Atur informasi identitas toko Anda.</p>
                        </div>
                    </div>

                    <div className="pengaturan-grid">
                        <div className="pengaturan-field">
                            <label>Nama Toko</label>
                            <input
                                type="text"
                                name="name"
                                value={store.name}
                                onChange={handleStoreChange}
                                placeholder="Masukkan nama toko"
                                required
                            />
                        </div>

                        <div className="pengaturan-field">
                            <label>Nomor Telepon</label>
                            <input
                                type="tel"
                                name="phone"
                                value={store.phone}
                                onChange={handleStoreChange}
                                placeholder="Masukkan nomor telepon"
                            />
                        </div>

                        <div className="pengaturan-field">
                            <label>Email Toko</label>
                            <input
                                type="email"
                                name="email"
                                value={store.email}
                                onChange={handleStoreChange}
                                placeholder="Masukkan email toko"
                            />
                        </div>

                        <div className="pengaturan-field">
                            <label>Alamat Toko</label>
                            <input
                                type="text"
                                name="address"
                                value={store.address}
                                onChange={handleStoreChange}
                                placeholder="Masukkan alamat toko"
                            />
                        </div>
                    </div>
                </div>

                <div className="pengaturan-section">
                    <div className="pengaturan-section-header">
                        <div className="pengaturan-icon purple">
                            <FaCog />
                        </div>
                        <div>
                            <h3>Preferensi Aplikasi</h3>
                            <p>Atur preferensi penggunaan aplikasi KasirKu.</p>
                        </div>
                    </div>

                    <div className="pengaturan-field currency-field">
                        <label>Mata Uang</label>
                        <select
                            name="currency"
                            value={preferences.currency}
                            onChange={handlePreferenceChange}
                        >
                            <option value="IDR">Rupiah (IDR)</option>
                            <option value="USD">Dollar Amerika (USD)</option>
                        </select>
                    </div>
                </div>

                <div className="pengaturan-section">
                    <div className="pengaturan-section-header">
                        <div className="pengaturan-icon orange">
                            <FaBell />
                        </div>
                        <div>
                            <h3>Notifikasi</h3>
                            <p>Atur pemberitahuan yang ingin ditampilkan.</p>
                        </div>
                    </div>

                    <div className="pengaturan-options">
                        <label className="pengaturan-option">
                            <div>
                                <strong>Notifikasi stok menipis</strong>
                                <p>Berikan pemberitahuan ketika stok hampir habis.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="lowStockNotification"
                                checked={preferences.lowStockNotification}
                                onChange={handlePreferenceChange}
                            />
                        </label>

                        <label className="pengaturan-option">
                            <div>
                                <strong>Notifikasi transaksi</strong>
                                <p>Berikan pemberitahuan ketika transaksi selesai.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="transactionNotification"
                                checked={preferences.transactionNotification}
                                onChange={handlePreferenceChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="pengaturan-section">
                    <div className="pengaturan-section-header">
                        <div className="pengaturan-icon green">
                            <FaReceipt />
                        </div>
                        <div>
                            <h3>Pengaturan Struk</h3>
                            <p>Atur informasi yang ditampilkan pada struk transaksi.</p>
                        </div>
                    </div>

                    <div className="pengaturan-options">
                        <label className="pengaturan-option">
                            <div>
                                <strong>Cetak struk otomatis</strong>
                                <p>Aktifkan preferensi pencetakan struk otomatis.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="printReceipt"
                                checked={preferences.printReceipt}
                                onChange={handlePreferenceChange}
                            />
                        </label>

                        <label className="pengaturan-option">
                            <div>
                                <strong>Tampilkan alamat toko</strong>
                                <p>Tampilkan alamat toko pada struk.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="showStoreAddress"
                                checked={preferences.showStoreAddress}
                                onChange={handlePreferenceChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="pengaturan-actions">
                    <button type="submit" className="pengaturan-save-btn">
                        <FaSave />
                        Simpan Pengaturan
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Pengaturan;
