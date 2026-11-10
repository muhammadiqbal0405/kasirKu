
import { useState, useEffect } from "react";
import { StoreContext } from "./store";

const API_URL = "http://localhost:8000/api";

export function StoreProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // MENGAMBIL DATA KATEGORI DAN PRODUK DARI LARAVEL
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const [categoryResponse, productResponse] =
                    await Promise.all([
                        fetch(`${API_URL}/categories`),
                        fetch(`${API_URL}/products`),
                    ]);

                if (!categoryResponse.ok || !productResponse.ok) {
                    throw new Error("Gagal mengambil data dari Laravel");
                }

                const categoryResult = await categoryResponse.json();
                const productResult = await productResponse.json();

                setCategories(categoryResult.data);

                const formattedProducts = productResult.data.map(
                    (product) => ({
                        id: product.id,
                        name: product.name,
                        category: product.category?.name ?? "",
                        categoryId: product.category_id,
                        price: Number(product.price),
                        stock: Number(product.stock),
                    })
                );

                setProducts(formattedProducts);

            } catch (err) {
                console.error("API Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

   
    // MENAMBAHKAN KATEGORI KE DATABASE
    const addCategory = async (data) => {
        const response = await fetch(`${API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: data.name.trim(),
                description: data.description.trim(),
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal menambahkan kategori."
            );
        }

        setCategories((previous) => [...previous, result.data]);

        return result.data;
    };

    // MENGEDIT KATEGORI DI DATABASE
    const updateCategory = async (id, data) => {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: data.name.trim(),
                description: data.description.trim(),
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal memperbarui kategori."
            );
        }

        const oldCategory = categories.find(
            (item) => item.id === id
        );

        setCategories((previous) =>
            previous.map((item) =>
                item.id === id ? result.data : item
            )
        );

        if (oldCategory) {
            setProducts((previous) =>
                previous.map((product) =>
                    product.categoryId === id
                        ? {
                            ...product,
                            category: result.data.name,
                        }
                        : product
                )
            );
        }

        return result.data;
    };

    // MENGHAPUS KATEGORI DARI DATABASE
    const deleteCategory = async (id) => {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal menghapus kategori."
            );
        }

        setCategories((previous) =>
            previous.filter((item) => item.id !== id)
        );

        return true;
    };


    // MENAMBAHKAN PRODUK (SEMENTARA LOKAL)
    
    // MENAMBAHKAN PRODUK KE DATABASE
    const addProduct = async (data) => {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                category_id: Number(data.categoryId),
                name: data.name.trim(),
                price: Number(data.price),
                stock: Number(data.stock),
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal menambahkan produk."
            );
        }

        const newProduct = {
            id: result.data.id,
            name: result.data.name,
            category: result.data.category?.name ??
                categories.find(
                    (item) => item.id === result.data.category_id
                )?.name ?? "",
            categoryId: result.data.category_id,
            price: Number(result.data.price),
            stock: Number(result.data.stock),
        };

        setProducts((previous) => [...previous, newProduct]);

        return newProduct;
    };

    // MENGEDIT PRODUK DI DATABASE
    const updateProduct = async (id, data) => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                category_id: Number(data.categoryId),
                name: data.name.trim(),
                price: Number(data.price),
                stock: Number(data.stock),
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal memperbarui produk."
            );
        }

        const updatedProduct = {
            id: result.data.id,
            name: result.data.name,
            category: result.data.category?.name ??
                categories.find(
                    (item) => item.id === result.data.category_id
                )?.name ?? "",
            categoryId: result.data.category_id,
            price: Number(result.data.price),
            stock: Number(result.data.stock),
        };

        setProducts((previous) =>
            previous.map((product) =>
                product.id === id ? updatedProduct : product
            )
        );

        return updatedProduct;
    };

    // MENGHAPUS PRODUK DARI DATABASE
    const deleteProduct = async (id) => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal menghapus produk."
            );
        }

        setProducts((previous) =>
            previous.filter((product) => product.id !== id)
        );

        return true;
    };


    // MENGHITUNG JUMLAH PRODUK PER KATEGORI
    const getProductCount = (categoryName) =>
        products.filter(
            (product) => product.category === categoryName
        ).length;

    return (
        <StoreContext.Provider
            value={{
                categories,
                setCategories,
                products,
                setProducts,
                addCategory,
                updateCategory,
                deleteCategory,
                addProduct,
                updateProduct,
                deleteProduct,
                getProductCount,
                loading,
                error,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}
