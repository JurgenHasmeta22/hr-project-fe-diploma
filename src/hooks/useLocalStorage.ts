import { useState, useEffect, Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T | ((prevValue: T) => T)>>;

function useLocalStorage<T>(key: string): [T, SetValue<T>, () => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Error retrieving data from localStorage:", error);
            return null;
        }
    });

    useEffect(() => {
        try {
            const handleStorageChange = (event: StorageEvent) => {
                if (event.key === key) {
                    setStoredValue(event.newValue ? JSON.parse(event.newValue) : null);
                }
            };

            window.addEventListener("storage", handleStorageChange);

            return () => {
                window.removeEventListener("storage", handleStorageChange);
            };
        } catch (error) {
            console.error("Error setting up localStorage change listener:", error);
        }
    }, [key]);

    const setValue: SetValue<T> = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error setting data to localStorage:", error);
        }
    };

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
            // setStoredValue(generateRandomValue());
        } catch (error) {
            console.error("Error removing data from localStorage:", error);
        }
    };

    return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
