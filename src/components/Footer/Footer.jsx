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

    // Memoized social links with deep link support
    const socialLinks = useMemo(() => [
        {
            icon: FaInstagram,
            appUrl: 'instagram://user?username=artecomkevin',
            webUrl: 'https://www.instagram.com/artecomkevin/',
            label: 'Instagram'
        },
        {
            icon: FaYoutube,
            appUrl: 'youtube://www.youtube.com/@artecomkevin',
            webUrl: 'https://www.youtube.com/@artecomkevin',
            label: 'YouTube'
        },
        {
            icon: FaTiktok,
            appUrl: 'snssdk1233://user/profile/artecomkevin',
            webUrl: 'https://www.tiktok.com/@artecomkevin',
            label: 'TikTok'
        },
    ], []);

    // Check if user is on mobile device (more robust detection)
    const isMobile = useCallback(() => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth <= 768;
        // Only consider mobile if it has mobile UA AND (touch OR small screen)
        return isMobileUA && (hasTouch || isSmallScreen);
    }, []);

    // Handle social link click with deep linking and analytics
    const handleSocialClick = useCallback((e, social) => {
        e.preventDefault();
        trackSocialClick(social.label);

        // Only try deep linking on mobile devices
        if (isMobile()) {
            // Try to open the app first
            const startTime = Date.now();
            window.location.href = social.appUrl;

            // If app doesn't open within 500ms, fallback to web URL
            setTimeout(() => {
                if (Date.now() - startTime < 1500) {
                    window.open(social.webUrl, '_blank', 'noopener,noreferrer');
                }
            }, 500);
        } else {
            // On desktop, open web URL directly
            window.open(social.webUrl, '_blank', 'noopener,noreferrer');
        }
    }, [isMobile]);

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
                                href={social.webUrl}
                                className="footer-social-link"
                                aria-label={social.label}
                                onClick={(e) => handleSocialClick(e, social)}
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

