import { useEffect, useState } from 'react';

// useState that is saved in localStorage and survives a refresh
const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage can be blocked (private mode), the app still works for this visit
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
