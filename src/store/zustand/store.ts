import { create } from 'zustand';
import AppStoreState from '~/interfaces/IStore';

export const useStore = create<AppStoreState>(
    (set, get): AppStoreState => ({
        user: null,
        userDetailsLoggedIn: null,
        setUser: (data) => {
            set({ user: data });
            localStorage.setItem('user', JSON.stringify(data));
        },
        setUserDetailsLoggedIn: (data) => {
            set({ userDetailsLoggedIn: data });
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
