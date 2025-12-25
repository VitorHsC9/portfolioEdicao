import { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { trackSocialClick, trackNavigation } from '../../utils/analytics';
import './Footer.css';

/**
 * Footer component with navigation and social links
 * Memoized to prevent unnecessary re-renders
 */
const Footer = memo(() => {
    const currentYear = new Date().getFullYear();

    // Memoized scroll handler with analytics tracking
    const scrollToSection = useCallback((id) => {
        trackNavigation(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Memoized navigation links
    const navLinks = useMemo(() => [
        { id: 'manifesto', label: 'Manifesto' },
        { id: 'obras', label: 'Obras' },
        { id: 'processo', label: 'Processo' },
        { id: 'contato', label: 'Contato' },
    ], []);

    // Memoized social links
    const socialLinks = useMemo(() => [
        { icon: FaInstagram, href: 'https://www.instagram.com/artecomkevin/', label: 'Instagram' },
        { icon: FaYoutube, href: 'https://www.youtube.com/@artecomkevin', label: 'YouTube' },
        { icon: FaTiktok, href: 'https://www.tiktok.com/@artecomkevin', label: 'TikTok' },
    ], []);

    // Handle social link click with analytics
    const handleSocialClick = useCallback((label) => {
        trackSocialClick(label);
    }, []);

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="container">
                <div className="footer-content">
                    <a
                        href="#"
                        className="footer-logo"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Kevin Álex
                    </a>

                    <nav className="footer-nav">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                className="footer-nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.id);
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="footer-social">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className="footer-social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                onClick={() => handleSocialClick(social.label)}
                            >
                                <social.icon />
                            </a>
                        ))}
                    </div>

                    <div className="footer-ornament">
                        <span className="footer-ornament-line"></span>
                        <span>✦</span>
                        <span className="footer-ornament-line"></span>
                    </div>

                    <p className="footer-copyright">
                        <span className="footer-copyright-year">{currentYear}</span> —
                        Todos os direitos reservados. Feito com reverência à arte.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;

