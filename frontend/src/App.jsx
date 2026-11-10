
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useParams,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import { StoreProvider } from "./context/StoreContext.jsx";
import Transactions from "./pages/Transactions";
import "./App.css";
import Pelanggan from "./pages/Pelanggan";
import Supplier from "./pages/Supplier";
import Stok from "./pages/Stok";
import Laporan from "./pages/Laporan";
import Pengaturan from "./pages/Pengaturan";
import Profil from "./pages/Profil";
import Bantuan from "./pages/Bantuan";
import Notifikasi from "./pages/Notifikasi";

// ========================================
// HALAMAN SEMENTARA
// ========================================

function PlaceholderPage() {
    const { page } = useParams();

    const pageNames = {
        transaksi: "Transaksi",
        pelanggan: "Pelanggan",
        supplier: "Supplier",
        stok: "Stok Barang",
        laporan: "Laporan",
        pengaturan: "Pengaturan",
        profil: "Profil Saya",
        bantuan: "Pusat Bantuan",
        notifikasi: "Notifikasi",
    };

    return (
        <div className="content-page">
            <h2>{pageNames[page] || "Halaman"}</h2>

            <p>
                Halaman ini sedang dalam tahap pengembangan.
            </p>
        </div>
    );
}

// ========================================
// KOMPONEN UTAMA APLIKASI
// ========================================

function App() {
    return (
        <BrowserRouter>

            {/* StoreProvider membagikan data ke seluruh halaman */}
            <StoreProvider>

                {/* Navbar */}
                <Navbar />

                {/* Konten utama */}
                <main className="content">

                    <Routes>

                        {/* Halaman Dashboard */}
                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        {/* Halaman Produk */}
                        <Route
                            path="/produk"
                            element={<Products />}
                        />

                        {/* Halaman Kategori */}
                        <Route
                            path="/kategori"
                            element={<Categories />}
                        />

                        <Route
                            path="/transaksi"
                            element={<Transactions />}
/>
                        <Route 
                            path="/pelanggan" 
                            element={<Pelanggan />} />

                        <Route 
                            path="/supplier" 
                            element={<Supplier />} />

                        <Route 
                            path="/stok" 
                            element={<Stok />} />

                        <Route 
                            path="/laporan" 
                            element={<Laporan />} />

                        <Route 
                            path="/pengaturan" 
                            element={<Pengaturan />} />

                        <Route path="/profil" element={<Profil />} />

                        <Route path="/bantuan" element={<Bantuan />} />

                        <Route path="/notifikasi" element={<Notifikasi />} />

                        {/* Halaman sementara */}
                        <Route
                            path="/:page"
                            element={<PlaceholderPage />}
                        />

                        {/* Halaman tidak ditemukan */}
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />


                    </Routes>

                </main>

            </StoreProvider>

        </BrowserRouter>
    );
}

export default App;
