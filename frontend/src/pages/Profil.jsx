
import { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBriefcase,
    FaMapMarkerAlt,
    FaSave,
    FaCamera,
} from "react-icons/fa";
import "./Profil.css";

function Profil() {
    const [profile, setProfile] = useState({
        name: "Administrator",
        email: "admin@kasirku.com",
        phone: "081234567890",
        role: "Administrator",
        address: "Geudong, Aceh",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Profil berhasil diperbarui sementara!");
        console.log("Data profil:", profile);
    };

    const initials = profile.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="profil-page">
            <div className="profil-header">
                <h1>Profil Pengguna</h1>
                <p>Kelola informasi akun dan identitas pengguna Anda.</p>
            </div>

            <div className="profil-layout">
                <div className="profil-card">
                    <div className="profil-avatar">
                        <span>{initials || "U"}</span>
                        <div className="profil-camera">
                            <FaCamera />
                        </div>
                    </div>

                    <h2>{profile.name || "Nama Pengguna"}</h2>
                    <p className="profil-role">{profile.role}</p>

                    <div className="profil-divider"></div>

                    <div className="profil-info">
                        <div>
                            <FaEnvelope />
                            <span>{profile.email || "-"}</span>
                        </div>

                        <div>
                            <FaPhone />
                            <span>{profile.phone || "-"}</span>
                        </div>

                        <div>
                            <FaMapMarkerAlt />
                            <span>{profile.address || "-"}</span>
                        </div>
                    </div>
                </div>

                <div className="profil-form-card">
                    <div className="profil-form-header">
                        <div>
                            <h3>Informasi Pribadi</h3>
                            <p>Perbarui informasi akun Anda di bawah ini.</p>
                        </div>
                        <FaUser className="profil-header-icon" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="profil-form-grid">
                            <div className="profil-field">
                                <label>Nama Lengkap</label>
                                <div className="profil-input">
                                    <FaUser />
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="profil-field">
                                <label>Email</label>
                                <div className="profil-input">
                                    <FaEnvelope />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        placeholder="Masukkan email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="profil-field">
                                <label>Nomor Telepon</label>
                                <div className="profil-input">
                                    <FaPhone />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        placeholder="Masukkan nomor telepon"
                                    />
                                </div>
                            </div>

                            <div className="profil-field">
                                <label>Jabatan</label>
                                <div className="profil-input">
                                    <FaBriefcase />
                                    <input
                                        type="text"
                                        name="role"
                                        value={profile.role}
                                        onChange={handleChange}
                                        placeholder="Masukkan jabatan"
                                    />
                                </div>
                            </div>

                            <div className="profil-field full">
                                <label>Alamat</label>
                                <div className="profil-input">
                                    <FaMapMarkerAlt />
                                    <input
                                        type="text"
                                        name="address"
                                        value={profile.address}
                                        onChange={handleChange}
                                        placeholder="Masukkan alamat"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="profil-form-footer">
                            <button type="submit" className="profil-save-btn">
                                <FaSave />
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profil;
