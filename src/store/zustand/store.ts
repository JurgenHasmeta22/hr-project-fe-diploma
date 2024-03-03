import { create } from 'zustand';
import AppStoreState from '~/interfaces/IStore';

export const useStore = create<AppStoreState>(
    (set, get): AppStoreState => ({
        user: null,
        userDetailsLoggedIn: null,

        setUser: (userData) => {
            set({ user: userData });
            localStorage.setItem('user', JSON.stringify(userData));
        },
        setUserDetailsLoggedIn: (userData) => {
            set({ userDetailsLoggedIn: userData });
        },
        unsetUser: () => {
            set({ user: null });
            localStorage.removeItem('user');
        },
        loadUserFromLocalStorage: () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                set({ user: JSON.parse(storedUser) });
            }
        },
    }),
);
