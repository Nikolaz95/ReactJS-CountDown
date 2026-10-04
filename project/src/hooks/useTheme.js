import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

// index.html already set data-theme before React loaded
const getInitialTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

const useTheme = () => {
    const [theme, setTheme] = useLocalStorage('theme', getInitialTheme());

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    const toggleTheme = () => setTheme(current => current === 'dark' ? 'light' : 'dark');

    return { theme, isDark: theme === 'dark', toggleTheme };
};

export default useTheme;
