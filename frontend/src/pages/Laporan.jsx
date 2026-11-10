
import { useMemo, useState } from "react";
import {
    FaChartLine,
    FaReceipt,
    FaShoppingBag,
    FaMoneyBillWave,
    FaSearch,
    FaDownload,
} from "react-icons/fa";
import "./Laporan.css";

const salesData = [
    {
        id: "TRX-001",
        date: "2026-11-08",
        customer: "Andi Saputra",
        items: 5,
        total: 125000,
        payment: "Tunai",
        status: "Selesai",
    },
    {
        id: "TRX-002",
        date: "2026-11-08",
        customer: "Siti Rahma",
        items: 3,
        total: 85000,
        payment: "Transfer",
        status: "Selesai",
    },
    {
        id: "TRX-003",
        date: "2026-11-07",
        customer: "Budi Santoso",
        items: 8,
        total: 210000,
        payment: "Tunai",
        status: "Selesai",
    },
    {
        id: "TRX-004",
        date: "2026-11-06",
        customer: "Dewi Lestari",
        items: 2,
        total: 50000,
        payment: "QRIS",
        status: "Selesai",
    },
    {
        id: "TRX-005",
        date: "2026-11-05",
        customer: "Rizky Maulana",
        items: 6,
        total: 175000,
        payment: "Transfer",
        status: "Selesai",
    },
    {
        id: "TRX-006",
        date: "2026-10-30",
        customer: "Rina Amelia",
        items: 4,
        total: 95000,
        payment: "Tunai",
        status: "Selesai",
    },
];

const formatRupiah = (amount) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(amount);

const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

function Laporan() {
    const [sales] = useState(salesData);
    const [search, setSearch] = useState("");
    const [period, setPeriod] = useState("semua");

    const filteredSales = useMemo(() => {
        const today = new Date("2026-11-08T00:00:00");

        return sales.filter((sale) => {
            const matchesSearch = `${sale.id} ${sale.customer}`
                .toLowerCase()
                .includes(search.toLowerCase());

            const saleDate = new Date(`${sale.date}T00:00:00`);
            const difference = Math.floor(
                (today - saleDate) / (1000 * 60 * 60 * 24)
            );

            let matchesPeriod = true;

            if (period === "hari-ini") {
                matchesPeriod = difference === 0;
            } else if (period === "7-hari") {
                matchesPeriod = difference >= 0 && difference < 7;
            } else if (period === "30-hari") {
                matchesPeriod = difference >= 0 && difference < 30;
            }

            return matchesSearch && matchesPeriod;
        });
    }, [sales, search, period]);

    const totalRevenue = filteredSales.reduce(
        (total, sale) => total + sale.total,
        0
    );

    const totalItems = filteredSales.reduce(
        (total, sale) => total + sale.items,
        0
    );

    const averageTransaction =
        filteredSales.length > 0
            ? totalRevenue / filteredSales.length
            : 0;

    const exportCSV = () => {
        const headers = [
            "ID Transaksi",
            "Tanggal",
            "Pelanggan",
            "Jumlah Produk",
            "Total",
            "Pembayaran",
            "Status",
        ];

        const rows = filteredSales.map((sale) => [
            sale.id,
            sale.date,
            sale.customer,
            sale.items,
            sale.total,
            sale.payment,
            sale.status,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) =>
                row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
            ),
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "laporan-penjualan-kasirku.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="laporan-page">
            <div className="laporan-header">
                <div>
                    <h1>Laporan Penjualan</h1>
                    <p>Pantau ringkasan dan riwayat penjualan toko Anda.</p>
                </div>

                <button
                    className="laporan-export-btn"
                    onClick={exportCSV}
                    disabled={filteredSales.length === 0}
                >
                    <FaDownload />
                    Ekspor Laporan
                </button>
            </div>

            <div className="laporan-statistics">
                <div className="laporan-stat-card">
                    <div className="laporan-stat-icon green">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <p>Total Pendapatan</p>
                        <h2>{formatRupiah(totalRevenue)}</h2>
                    </div>
                </div>

                <div className="laporan-stat-card">
                    <div className="laporan-stat-icon blue">
                        <FaReceipt />
                    </div>
                    <div>
                        <p>Total Transaksi</p>
                        <h2>{filteredSales.length}</h2>
                    </div>
                </div>

                <div className="laporan-stat-card">
                    <div className="laporan-stat-icon purple">
                        <FaShoppingBag />
                    </div>
                    <div>
                        <p>Produk Terjual</p>
                        <h2>{totalItems}</h2>
                    </div>
                </div>

                <div className="laporan-stat-card">
                    <div className="laporan-stat-icon orange">
                        <FaChartLine />
                    </div>
                    <div>
                        <p>Rata-rata Transaksi</p>
                        <h2>{formatRupiah(averageTransaction)}</h2>
                    </div>
                </div>
            </div>

            <div className="laporan-content">
                <div className="laporan-content-header">
                    <div>
                        <h3>Riwayat Penjualan</h3>
                        <p>Daftar transaksi berdasarkan periode laporan.</p>
                    </div>

                    <div className="laporan-filters">
                        <div className="laporan-search">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Cari transaksi atau pelanggan..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                        >
                            <option value="semua">Semua Periode</option>
                            <option value="hari-ini">Hari Ini</option>
                            <option value="7-hari">7 Hari Terakhir</option>
                            <option value="30-hari">30 Hari Terakhir</option>
                        </select>
                    </div>
                </div>

                <div className="laporan-table-wrapper">
                    <table className="laporan-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>ID Transaksi</th>
                                <th>Tanggal</th>
                                <th>Pelanggan</th>
                                <th>Jumlah Produk</th>
                                <th>Total Penjualan</th>
                                <th>Pembayaran</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredSales.length > 0 ? (
                                filteredSales.map((sale, index) => (
                                    <tr key={sale.id}>
                                        <td>{index + 1}</td>
                                        <td className="laporan-id">{sale.id}</td>
                                        <td>{formatDate(sale.date)}</td>
                                        <td>{sale.customer}</td>
                                        <td>{sale.items} produk</td>
                                        <td className="laporan-total">
                                            {formatRupiah(sale.total)}
                                        </td>
                                        <td>{sale.payment}</td>
                                        <td>
                                            <span className="laporan-status">
                                                {sale.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="laporan-empty">
                                        Tidak ada data transaksi ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="laporan-footer">
                    Menampilkan {filteredSales.length} dari {sales.length} transaksi
                </div>
            </div>
        </div>
    );
}

export default Laporan;
