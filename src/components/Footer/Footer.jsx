import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { id: 'manifesto', label: 'Manifesto' },
        { id: 'obras', label: 'Obras' },
        { id: 'processo', label: 'Processo' },
        { id: 'contato', label: 'Contato' },
    ];

    const socialLinks = [
        { icon: FaInstagram, href: 'https://www.instagram.com/artecomkevin/', label: 'Instagram' },
        { icon: FaYoutube, href: 'https://www.youtube.com/@artecomkevin', label: 'YouTube' },
        { icon: FaTiktok, href: 'https://www.tiktok.com/@artecomkevin', label: 'TikTok' },
    ];

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
};

export default Footer;
