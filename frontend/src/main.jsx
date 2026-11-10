
import React from "react"; // Mengimpor React
import ReactDOM from "react-dom/client"; // Mengimpor React DOM
import App from "./App"; // Mengimpor komponen App

// Membuat root React pada elemen dengan id root
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App /> {/* Menampilkan aplikasi */}
    </React.StrictMode>
);
