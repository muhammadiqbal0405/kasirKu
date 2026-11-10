
import {
    FaMoneyBillWave,
    FaShoppingCart,
    FaBox,
    FaUsers,
    FaArrowUp,
    FaEye
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {

    // ==================================
    // 1. DATA STATISTIK DASHBOARD
    // ==================================

    const statistics = [
        {
            title: "Total Pendapatan",
            value: "Rp 15.500.000",
            percentage: "12.5%",
            icon: <FaMoneyBillWave />,
            color: "green"
        },
        {
            title: "Total Transaksi",
            value: "250",
            percentage: "8.2%",
            icon: <FaShoppingCart />,
            color: "blue"
        },
        {
            title: "Total Produk",
            value: "120",
            percentage: "5.4%",
            icon: <FaBox />,
            color: "orange"
        },
        {
            title: "Total Pelanggan",
            value: "85",
            percentage: "10.2%",
            icon: <FaUsers />,
            color: "purple"
        }
    ];


    // ==================================
    // 2. DATA GRAFIK PENJUALAN
    // ==================================

    const sales = [
        { day: "Sen", amount: 450000 },
        { day: "Sel", amount: 700000 },
        { day: "Rab", amount: 550000 },
        { day: "Kam", amount: 900000 },
        { day: "Jum", amount: 650000 },
        { day: "Sab", amount: 800000 },
        { day: "Min", amount: 1000000 }
    ];

    // Penjualan tertinggi untuk menghitung tinggi batang grafik
    const maxSales = Math.max(
        ...sales.map((item) => item.amount)
    );

    // Format angka menjadi Rupiah
    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(value);
    };

    // Menghitung seluruh penjualan selama 7 hari
    const totalSales = sales.reduce(
        (total, item) => total + item.amount,
        0
    );


    // ==================================
    // 3. DATA PRODUK TERLARIS
    // ==================================

    const bestProducts = [
        {
            name: "Indomie Goreng",
            sold: 120,
            revenue: "Rp 360.000"
        },
        {
            name: "Air Mineral",
            sold: 95,
            revenue: "Rp 190.000"
        },
        {
            name: "Kopi Sachet",
            sold: 80,
            revenue: "Rp 160.000"
        },
        {
            name: "Beras 5 Kg",
            sold: 65,
            revenue: "Rp 975.000"
        }
    ];


    // ==================================
    // 4. DATA TRANSAKSI TERBARU
    // ==================================

    const transactions = [
        {
            id: "TRX001",
            customer: "Andi Saputra",
            date: "07 Nov 2026",
            time: "09:15",
            payment: "Tunai",
            total: "Rp 250.000",
            status: "Selesai"
        },
        {
            id: "TRX002",
            customer: "Budi Santoso",
            date: "07 Nov 2026",
            time: "09:30",
            payment: "QRIS",
            total: "Rp 150.000",
            status: "Selesai"
        },
        {
            id: "TRX003",
            customer: "Siti Aminah",
            date: "07 Nov 2026",
            time: "10:05",
            payment: "Transfer",
            total: "Rp 350.000",
            status: "Pending"
        },
        {
            id: "TRX004",
            customer: "Rina Amelia",
            date: "07 Nov 2026",
            time: "10:20",
            payment: "Tunai",
            total: "Rp 175.000",
            status: "Selesai"
        }
    ];


    // ==================================
    // 5. FUNGSI DETAIL TRANSAKSI
    // ==================================

    const handleDetail = (item) => {
        alert(
            `DETAIL TRANSAKSI\n\n` +
            `ID: ${item.id}\n` +
            `Pelanggan: ${item.customer}\n` +
            `Tanggal: ${item.date}\n` +
            `Waktu: ${item.time}\n` +
            `Pembayaran: ${item.payment}\n` +
            `Total: ${item.total}\n` +
            `Status: ${item.status}`
        );
    };


    // ==================================
    // 6. TAMPILAN DASHBOARD
    // ==================================

    return (
        <div className="dashboard-container">

            {/* HEADER DASHBOARD */}
            <div className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>
                    <p>Selamat datang kembali di KasirKu!</p>
                </div>

                <div className="dashboard-date">
                    07 November 2026
                </div>

            </div>


            {/* KARTU STATISTIK */}
            <div className="statistics-grid">

                {statistics.map((item, index) => (

                    <div className="stat-card" key={index}>

                        <div className="stat-info">

                            <p>{item.title}</p>

                            <h2>{item.value}</h2>

                            <span className="stat-percentage">
                                <FaArrowUp />
                                {item.percentage}
                                <small> dari bulan lalu</small>
                            </span>

                        </div>

                        <div className={`stat-icon ${item.color}`}>
                            {item.icon}
                        </div>

                    </div>

                ))}

            </div>


            {/* GRAFIK DAN PRODUK TERLARIS */}
            <div className="dashboard-content-grid">


                {/* GRAFIK PENJUALAN */}
                <div className="dashboard-card sales-card">

                    <div className="sales-header">

                        <div>
                            <h3>Grafik Penjualan</h3>
                            <p>Ringkasan pendapatan selama 7 hari terakhir</p>
                        </div>

                        <div className="sales-total">
                            <small>Total penjualan</small>
                            <h2>{formatRupiah(totalSales)}</h2>
                        </div>

                    </div>


                    <div className="chart-container">

                        {/* LABEL SUMBU Y */}
                        <div className="chart-y-axis">
                            <span>Rp 1 jt</span>
                            <span>Rp 750 rb</span>
                            <span>Rp 500 rb</span>
                            <span>Rp 250 rb</span>
                            <span>Rp 0</span>
                        </div>


                        {/* AREA GRAFIK */}
                        <div className="chart-main">

                            {/* GARIS BANTU */}
                            <div className="chart-grid">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>


                            {/* BATANG GRAFIK */}
                            <div className="chart-bars">

                                {sales.map((item, index) => (

                                    <div
                                        className="chart-column"
                                        key={item.day}
                                    >

                                        <div
                                            className="chart-bar"
                                            style={{
                                                height: `${(item.amount / maxSales) * 100}%`,
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                            title={`${item.day}: ${formatRupiah(item.amount)}`}
                                        >

                                            <span className="bar-tooltip">
                                                {formatRupiah(item.amount)}
                                            </span>

                                        </div>

                                        <span className="chart-day">
                                            {item.day}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>


                {/* PRODUK TERLARIS */}
                <div className="dashboard-card">

                    <h3>Produk Terlaris</h3>

                    <p>Produk dengan penjualan tertinggi</p>

                    {bestProducts.map((product, index) => (

                        <div
                            className="best-product"
                            key={index}
                        >

                            <div>
                                <strong>{product.name}</strong>
                                <small>{product.sold} terjual</small>
                            </div>

                            <strong>{product.revenue}</strong>

                        </div>

                    ))}

                </div>

            </div>


            {/* ==================================
                TABEL TRANSAKSI TERBARU
            ================================== */}

            <div className="dashboard-card transaction-card">

                {/* HEADER TRANSAKSI */}
                <div className="transaction-header">

                    <div>
                        <h3>Transaksi Terbaru</h3>
                        <p>Daftar transaksi yang baru dilakukan</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            alert("Halaman semua transaksi akan dibuat selanjutnya.");
                        }}
                    >
                        Lihat Semua
                    </button>

                </div>


                {/* TABEL */}
                <div className="table-wrapper">

                    <table className="transaction-table">

                        <thead>
                            <tr>
                                <th>ID Transaksi</th>
                                <th>Pelanggan</th>
                                <th>Tanggal & Waktu</th>
                                <th>Pembayaran</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>


                        <tbody>

                            {transactions.map((item) => (

                                <tr key={item.id}>

                                    {/* ID TRANSAKSI */}
                                    <td className="transaction-id">
                                        {item.id}
                                    </td>


                                    {/* INFORMASI PELANGGAN */}
                                    <td>

                                        <div className="customer-info">

                                            <div className="customer-avatar">
                                                {item.customer.charAt(0)}
                                            </div>

                                            <strong>{item.customer}</strong>

                                        </div>

                                    </td>


                                    {/* TANGGAL DAN WAKTU */}
                                    <td>

                                        <div className="date-info">
                                            <strong>{item.date}</strong>
                                            <small>{item.time}</small>
                                        </div>

                                    </td>


                                    {/* METODE PEMBAYARAN */}
                                    <td>

                                        <span
                                            className={`payment-method ${item.payment.toLowerCase()}`}
                                        >
                                            {item.payment}
                                        </span>

                                    </td>


                                    {/* TOTAL PEMBAYARAN */}
                                    <td className="transaction-total">
                                        {item.total}
                                    </td>


                                    {/* STATUS TRANSAKSI */}
                                    <td>

                                        <span
                                            className={`status ${item.status.toLowerCase()}`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>


                                    {/* TOMBOL DETAIL */}
                                    <td>

                                        <button
                                            className="detail-btn"
                                            type="button"
                                            title="Lihat detail transaksi"
                                            onClick={() => handleDetail(item)}
                                        >
                                            <FaEye />
                                            Detail
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
