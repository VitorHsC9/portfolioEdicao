/**
 * AppContext - Centralized state management for the portfolio
 * 
 * Provides:
 * - Menu open/close state for mobile navigation
 * - Theme state for dark/light mode (Phase 5)
 */
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Theme state (prepared for Phase 5)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // Toggle menu with useCallback to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Close menu (useful for navigation clicks)
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Toggle theme (for Phase 5)
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      return newTheme;
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    closeMenu,
    theme,
    toggleTheme,
  }), [isMenuOpen, toggleMenu, closeMenu, theme, toggleTheme]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Hook to access app context
 * @throws {Error} if used outside of AppProvider
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
