import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './CallToAction.css';

const CallToAction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section className="cta section" id="contato" ref={ref}>
            <span className="cta-ornament top-left">❧</span>
            <span className="cta-ornament bottom-right">❧</span>

            <div className="container">
                <motion.div
                    className="cta-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.span className="cta-eyebrow" variants={itemVariants}>
                        Colaboração
                    </motion.span>

                    <motion.h2 className="cta-title" variants={itemVariants}>
                        Se sua obra exige respeito estético e atenção artesanal,
                        talvez possamos criar algo extraordinário juntos.
                    </motion.h2>

                    <motion.p className="cta-description" variants={itemVariants}>
                        Trabalho com projetos selecionados que compartilham a visão de
                        elevar o vídeo à categoria de arte. Cada colaboração é uma
                        parceria criativa única.
                    </motion.p>

                    <motion.a
                        href="mailto:contato@exemplo.com"
                        className="cta-button"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Entrar em contato
                        <span className="cta-button-arrow">→</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;
