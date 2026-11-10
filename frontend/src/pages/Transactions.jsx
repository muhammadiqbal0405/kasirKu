
import { useState } from "react";

import {
    FaSearch,
    FaPlus,
    FaMinus,
    FaTrash,
    FaShoppingCart,
    FaMoneyBillWave,
    FaCreditCard,
    FaQrcode
} from "react-icons/fa";

import { useStore } from "../context/useStore";
import "./Transactions.css";

function Transactions() {
    const { products, setProducts } = useStore();

    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("Tunai");
    const [amountPaid, setAmountPaid] = useState("");

    // Format angka menjadi Rupiah
    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(value);
    };

    // Mencari produk
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Menghitung total barang di keranjang
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Menghitung total pembayaran
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const paid = Number(amountPaid) || 0;
    const change = paid - totalPrice;

    // Menambahkan produk ke keranjang
    const addToCart = (product) => {
        const cartItem = cart.find((item) => item.id === product.id);

        const currentQuantity = cartItem ? cartItem.quantity : 0;

        if (currentQuantity >= product.stock) {
            alert("Stok produk tidak mencukupi.");
            return;
        }

        if (cartItem) {
            setCart((previous) =>
                previous.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart((previous) => [
                ...previous,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                }
            ]);
        }
    };

    // Mengurangi jumlah produk
    const decreaseQuantity = (id) => {
        setCart((previous) =>
            previous
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Menghapus produk dari keranjang
    const removeFromCart = (id) => {
        setCart((previous) =>
            previous.filter((item) => item.id !== id)
        );
    };

    // Memproses pembayaran
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Keranjang masih kosong.");
            return;
        }

        if (paymentMethod === "Tunai" && paid < totalPrice) {
            alert("Uang pembayaran masih kurang.");
            return;
        }

        const stockInsufficient = cart.some((item) => {
            const product = products.find(
                (product) => product.id === item.id
            );

            return !product || product.stock < item.quantity;
        });

        if (stockInsufficient) {
            alert("Stok salah satu produk tidak mencukupi.");
            return;
        }

        // Mengurangi stok produk setelah pembayaran
        setProducts((previous) =>
            previous.map((product) => {
                const cartItem = cart.find(
                    (item) => item.id === product.id
                );

                return cartItem
                    ? {
                        ...product,
                        stock: product.stock - cartItem.quantity
                    }
                    : product;
            })
        );

        const receipt = cart
            .map((item) =>
                `${item.name} x${item.quantity} = ${formatRupiah(item.price * item.quantity)}`
            )
            .join("\n");

        alert(
            `TRANSAKSI BERHASIL!\n\n` +
            `${receipt}\n\n` +
            `Total: ${formatRupiah(totalPrice)}\n` +
            `Metode: ${paymentMethod}\n` +
            `Bayar: ${formatRupiah(paymentMethod === "Tunai" ? paid : totalPrice)}\n` +
            `Kembalian: ${formatRupiah(paymentMethod === "Tunai" ? change : 0)}`
        );

        setCart([]);
        setAmountPaid("");
        setPaymentMethod("Tunai");
    };

    return (
        <div className="transactions-container">

            {/* HEADER */}
            <div className="transactions-header">
                <div>
                    <h1>Transaksi Kasir</h1>
                    <p>Pilih produk dan proses pembayaran pelanggan.</p>
                </div>
            </div>

            <div className="transaction-layout">

                {/* BAGIAN DAFTAR PRODUK */}
                <div className="transaction-products">

                    <div className="transaction-section-header">
                        <div>
                            <h3>Daftar Produk</h3>
                            <p>Pilih produk untuk ditambahkan ke keranjang.</p>
                        </div>
                    </div>

                    <div className="transaction-search">
                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Cari nama produk..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="transaction-product-grid">

                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (

                                <div className="transaction-product-card" key={product.id}>

                                    <div className="transaction-product-icon">
                                        <FaShoppingCart />
                                    </div>

                                    <div className="transaction-product-info">
                                        <h4>{product.name}</h4>
                                        <p>{product.category}</p>
                                        <strong>{formatRupiah(product.price)}</strong>
                                        <small>Stok: {product.stock}</small>
                                    </div>

                                    <button
                                        type="button"
                                        className="transaction-add-btn"
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock <= 0}
                                        title="Tambah ke keranjang"
                                    >
                                        <FaPlus />
                                    </button>

                                </div>

                            ))
                        ) : (
                            <div className="transaction-empty">
                                Produk tidak ditemukan.
                            </div>
                        )}

                    </div>

                </div>

                {/* BAGIAN KERANJANG */}
                <div className="transaction-cart">

                    <div className="transaction-cart-header">
                        <div>
                            <h3>
                                <FaShoppingCart /> Keranjang
                            </h3>
                            <p>{totalItems} barang dipilih</p>
                        </div>
                    </div>

                    <div className="transaction-cart-items">

                        {cart.length > 0 ? (
                            cart.map((item) => (

                                <div className="transaction-cart-item" key={item.id}>

                                    <div className="cart-item-info">
                                        <strong>{item.name}</strong>
                                        <span>{formatRupiah(item.price)}</span>
                                    </div>

                                    <div className="cart-item-controls">

                                        <button
                                            type="button"
                                            onClick={() => decreaseQuantity(item.id)}
                                            title="Kurangi jumlah"
                                        >
                                            <FaMinus />
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const product = products.find(
                                                    (product) => product.id === item.id
                                                );

                                                if (product) addToCart(product);
                                            }}
                                            title="Tambah jumlah"
                                        >
                                            <FaPlus />
                                        </button>

                                        <button
                                            type="button"
                                            className="cart-delete-btn"
                                            onClick={() => removeFromCart(item.id)}
                                            title="Hapus produk"
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>

                                    <strong className="cart-item-subtotal">
                                        {formatRupiah(item.price * item.quantity)}
                                    </strong>

                                </div>

                            ))
                        ) : (
                            <div className="transaction-cart-empty">
                                <FaShoppingCart />
                                <p>Keranjang masih kosong</p>
                                <small>Pilih produk untuk memulai transaksi.</small>
                            </div>
                        )}

                    </div>

                    {/* RINGKASAN PEMBAYARAN */}
                    <div className="transaction-summary">

                        <div className="summary-row">
                            <span>Total Barang</span>
                            <strong>{totalItems}</strong>
                        </div>

                        <div className="summary-row summary-total">
                            <span>Total Pembayaran</span>
                            <strong>{formatRupiah(totalPrice)}</strong>
                        </div>

                        <div className="payment-method">
                            <label>Metode Pembayaran</label>

                            <div className="payment-options">

                                <button
                                    type="button"
                                    className={paymentMethod === "Tunai" ? "payment-option active" : "payment-option"}
                                    onClick={() => setPaymentMethod("Tunai")}
                                >
                                    <FaMoneyBillWave />
                                    Tunai
                                </button>

                                <button
                                    type="button"
                                    className={paymentMethod === "Debit" ? "payment-option active" : "payment-option"}
                                    onClick={() => setPaymentMethod("Debit")}
                                >
                                    <FaCreditCard />
                                    Debit
                                </button>

                                <button
                                    type="button"
                                    className={paymentMethod === "QRIS" ? "payment-option active" : "payment-option"}
                                    onClick={() => setPaymentMethod("QRIS")}
                                >
                                    <FaQrcode />
                                    QRIS
                                </button>

                            </div>
                        </div>

                        {paymentMethod === "Tunai" && (
                            <>
                                <div className="payment-input">
                                    <label>Uang Dibayarkan (Rp)</label>

                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Masukkan nominal uang"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(e.target.value)}
                                    />
                                </div>

                                <div className="summary-row">
                                    <span>Kembalian</span>
                                    <strong className={change < 0 ? "change-negative" : "change-positive"}>
                                        {formatRupiah(Math.max(0, change))}
                                    </strong>
                                </div>
                            </>
                        )}

                        <button
                            type="button"
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                        >
                            Proses Pembayaran
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Transactions;
