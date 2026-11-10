
import { useContext } from "react";
import { StoreContext } from "./store";

export function useStore() {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error(
            "useStore harus digunakan di dalam StoreProvider"
        );
    }

    return context;
}
