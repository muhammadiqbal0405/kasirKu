
import { useState } from "react";
import {
    FaSearch,
    FaQuestionCircle,
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaChartBar,
    FaCog,
    FaChevronDown,
    FaEnvelope,
    FaPhone,
    FaBook,
} from "react-icons/fa";
import "./Bantuan.css";

const faqData = [
    {
        question: "Bagaimana cara menambahkan produk baru?",
        answer: "Buka menu Produk, kemudian klik tombol Tambah Produk. Isi nama produk, kategori, harga, dan jumlah stok. Setelah itu klik Simpan untuk menambahkan produk.",
    },
    {
        question: "Bagaimana cara mengubah data produk?",
        answer: "Buka menu Produk, cari produk yang ingin diubah, kemudian klik tombol Edit. Ubah informasi yang diperlukan dan klik Simpan Perubahan.",
    },
    {
        question: "Bagaimana cara mengelola kategori produk?",
        answer: "Masuk ke menu Kategori. Kamu dapat menambahkan kategori baru, mengubah nama kategori, dan menghapus kategori yang tidak digunakan.",
    },
    {
        question: "Bagaimana cara menambahkan pelanggan?",
        answer: "Buka menu Pelanggan, klik Tambah Pelanggan, lalu isi nama, nomor telepon, email, dan alamat pelanggan.",
    },
    {
        question: "Bagaimana cara mengelola stok barang?",
        answer: "Masuk ke menu Stok Barang. Gunakan tombol tambah untuk menambah stok dan tombol kurang untuk mengurangi stok. Sistem akan menampilkan kondisi stok barang.",
    },
    {
        question: "Bagaimana cara melihat laporan penjualan?",
        answer: "Buka menu Laporan. Kamu dapat melihat total pendapatan, jumlah transaksi, produk terjual, serta memfilter laporan berdasarkan periode.",
    },
    {
        question: "Bagaimana cara mengunduh laporan?",
        answer: "Masuk ke menu Laporan, tentukan periode yang diinginkan, kemudian klik tombol Ekspor Laporan. File laporan akan diunduh dalam format CSV.",
    },
    {
        question: "Bagaimana cara mengubah informasi toko?",
        answer: "Buka menu Pengaturan. Ubah nama toko, nomor telepon, email, atau alamat, kemudian klik Simpan Pengaturan.",
    },
];

const guideData = [
    {
        icon: FaShoppingCart,
        title: "Transaksi",
        description: "Panduan melakukan transaksi penjualan.",
        detail: "Gunakan menu Transaksi untuk memproses pembelian pelanggan. Pilih produk, tentukan jumlah barang, periksa total pembayaran, lalu selesaikan transaksi.",
    },
    {
        icon: FaBox,
        title: "Manajemen Produk",
        description: "Panduan mengelola data produk.",
        detail: "Gunakan menu Produk untuk menambah, mengubah, mencari, dan menghapus produk. Pastikan setiap produk memiliki kategori, harga, dan stok yang sesuai.",
    },
    {
        icon: FaUsers,
        title: "Pelanggan dan Supplier",
        description: "Panduan mengelola data pelanggan dan pemasok.",
        detail: "Gunakan menu Pelanggan untuk menyimpan informasi pembeli dan menu Supplier untuk menyimpan informasi pemasok barang.",
    },
    {
        icon: FaChartBar,
        title: "Laporan Penjualan",
        description: "Panduan melihat dan mengekspor laporan.",
        detail: "Buka menu Laporan untuk melihat statistik penjualan. Gunakan filter periode dan pencarian untuk menemukan transaksi tertentu.",
    },
    {
        icon: FaCog,
        title: "Pengaturan",
        description: "Panduan mengatur aplikasi dan informasi toko.",
        detail: "Gunakan menu Pengaturan untuk mengubah identitas toko, mata uang, notifikasi, dan preferensi struk.",
    },
];

function Bantuan() {
    const [search, setSearch] = useState("");
    const [openFaq, setOpenFaq] = useState(null);
    const [openGuide, setOpenGuide] = useState(null);

    const filteredFaq = faqData.filter((faq) =>
        `${faq.question} ${faq.answer}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="bantuan-page">
            <div className="bantuan-hero">
                <div className="bantuan-hero-icon">
                    <FaQuestionCircle />
                </div>

                <h1>Pusat Bantuan KasirKu</h1>
                <p>
                    Temukan panduan dan jawaban untuk membantu kamu menggunakan
                    aplikasi KasirKu.
                </p>

                <div className="bantuan-search">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Cari pertanyaan atau panduan..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setOpenFaq(null);
                        }}
                    />
                </div>
            </div>

            <div className="bantuan-section">
                <div className="bantuan-section-title">
                    <FaBook />
                    <div>
                        <h2>Panduan Penggunaan</h2>
                        <p>Pelajari cara menggunakan fitur KasirKu.</p>
                    </div>
                </div>

                <div className="bantuan-guide-grid">
                    {guideData.map((guide, index) => {
                        const Icon = guide.icon;
                        const isOpen = openGuide === index;

                        return (
                            <div className="bantuan-guide-card" key={guide.title}>
                                <div className="bantuan-guide-top">
                                    <div className="bantuan-guide-icon">
                                        <Icon />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenGuide(isOpen ? null : index)
                                        }
                                        aria-label="Tampilkan panduan"
                                    >
                                        <FaChevronDown
                                            className={isOpen ? "rotated" : ""}
                                        />
                                    </button>
                                </div>

                                <h3>{guide.title}</h3>
                                <p>{guide.description}</p>

                                {isOpen && (
                                    <div className="bantuan-guide-detail">
                                        {guide.detail}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bantuan-section">
                <div className="bantuan-section-title">
                    <FaQuestionCircle />
                    <div>
                        <h2>Pertanyaan yang Sering Diajukan</h2>
                        <p>Temukan jawaban dari pertanyaan pengguna.</p>
                    </div>
                </div>

                <div className="bantuan-faq-list">
                    {filteredFaq.length > 0 ? (
                        filteredFaq.map((faq, index) => (
                            <div className="bantuan-faq-item" key={faq.question}>
                                <button
                                    type="button"
                                    className="bantuan-faq-question"
                                    onClick={() =>
                                        setOpenFaq(
                                            openFaq === index ? null : index
                                        )
                                    }
                                >
                                    <span>{faq.question}</span>
                                    <FaChevronDown
                                        className={
                                            openFaq === index ? "rotated" : ""
                                        }
                                    />
                                </button>

                                {openFaq === index && (
                                    <div className="bantuan-faq-answer">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bantuan-no-result">
                            Tidak ditemukan pertanyaan yang sesuai.
                        </div>
                    )}
                </div>
            </div>

            <div className="bantuan-contact">
                <div className="bantuan-contact-icon">
                    <FaQuestionCircle />
                </div>

                <div className="bantuan-contact-info">
                    <h3>Masih Membutuhkan Bantuan?</h3>
                    <p>
                        Hubungi tim bantuan jika kamu masih mengalami kesulitan
                        menggunakan KasirKu.
                    </p>

                    <div className="bantuan-contact-links">
                        <a href="mailto:support@kasirku.com">
                            <FaEnvelope />
                            support@kasirku.com
                        </a>

                        <a href="tel:081234567890">
                            <FaPhone />
                            081234567890
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bantuan;
