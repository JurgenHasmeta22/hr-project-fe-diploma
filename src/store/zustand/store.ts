import { create } from "zustand";
import AppStoreState from "~/interfaces/IStore";

export const useStore = create<AppStoreState>(
    (set, get): AppStoreState => ({
        user: null,
        userDetailsLoggedIn: null,
        openSidebar: true,
        openSubMenu: false,
        setOpenSubMenu: (value) => {
            set({ openSubMenu: value });
        },
        setOpenSidebar: (value) => {
            set({ openSidebar: value });
        },
        setUser: (userData) => {
            set({ user: userData });
            localStorage.setItem("user", JSON.stringify(userData));
        },
        unsetUser: () => {
            set({ user: null });
            localStorage.removeItem("user");
        },
        setUserDetailsLoggedIn: (userData) => {
            set({ userDetailsLoggedIn: userData });
        },
        loadUserFromLocalStorage: () => {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                set({ user: JSON.parse(storedUser) });
            }
        },
    }),
);
