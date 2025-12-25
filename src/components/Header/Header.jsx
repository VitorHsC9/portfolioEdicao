import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { trackNavigation } from '../../utils/analytics';
import './Header.css';

/**
 * Header component with navigation, mobile menu, and theme toggle
 * Uses AppContext for menu state and theme management
 */
const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMenuOpen, setIsMenuOpen, closeMenu, theme, toggleTheme } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme on mount and when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Memoized scroll handler to prevent recreation on every render
  const scrollToSection = useCallback((id) => {
    trackNavigation(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  }, [closeMenu]);

  // Memoized navigation links array
  const navLinks = useMemo(() => [
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'obras', label: 'Obras' },
    { id: 'processo', label: 'Processo' },
    { id: 'contato', label: 'Contato' },
  ], []);

  // Memoized toggle handler
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, [setIsMenuOpen]);

  // Memoized scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="header-content">
        <a href="#" className="header-logo" onClick={scrollToTop}>
          Kevin Álex
        </a>

        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              className="header-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="header-actions">
          {/* Theme toggle button */}
          <button
            className="header-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          >
            {theme === 'dark' ? (
              <span className="theme-icon">☀</span>
            ) : (
              <span className="theme-icon">☾</span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="header-menu-btn"
            onClick={handleMenuToggle}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </motion.header>
  );
});

Header.displayName = 'Header';

export default Header;


