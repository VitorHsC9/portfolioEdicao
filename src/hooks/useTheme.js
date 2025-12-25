import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing theme (dark/light mode)
 * Persists preference to localStorage and applies to document
 * 
 * @returns {Object} { theme, toggleTheme, setTheme }
 */
export const useTheme = () => {
    // Initialize theme from localStorage or default to 'dark'
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('portfolio-theme');
            return savedTheme || 'dark';
        }
        return 'dark';
    });

    // Apply theme to document and persist to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
        }
    }, [theme]);

    // Toggle between dark and light themes
    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    return { theme, toggleTheme, setTheme };
};

export default useTheme;
