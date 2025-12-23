import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-content">
                <motion.div
                    className="hero-ornament"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <span className="hero-ornament-line"></span>
                    <span className="hero-ornament-symbol">✦</span>
                    <span className="hero-ornament-line"></span>
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Edição de vídeo
                    <span className="hero-title-highlight">como forma de arte</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    Onde cada corte é uma pincelada, cada transição uma pausa contemplativa,
                    e cada obra, um legado visual que transcende o tempo.
                </motion.p>

                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    <button
                        className="btn"
                        onClick={() => scrollToSection('obras')}
                    >
                        Ver obras
                    </button>
                </motion.div>
            </div>

            <motion.div
                className="hero-scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <span>Scroll</span>
                <span className="hero-scroll-line"></span>
            </motion.div>
        </section>
    );
};

export default Hero;
