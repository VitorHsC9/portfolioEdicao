import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Manifesto.css';

const Manifesto = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section className="manifesto section" id="manifesto" ref={ref}>
            <div className="container">
                <motion.div
                    className="manifesto-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.span className="manifesto-eyebrow" variants={itemVariants}>
                        Manifesto
                    </motion.span>

                    <motion.h2 className="manifesto-title" variants={itemVariants}>
                        "A verdadeira edição não acelera o tempo — ela o sacraliza.
                        Cada frame é uma decisão estética, cada silêncio, uma afirmação artística."
                    </motion.h2>

                    <motion.p className="manifesto-text" variants={itemVariants}>
                        Em um mundo saturado de imagens fugazes e narrativas apressadas,
                        escolho o caminho oposto: a contemplação. Meu trabalho é um ato de
                        resistência contra a superficialidade, uma busca incessante pela
                        beleza que permanece.
                    </motion.p>

                    <motion.p className="manifesto-text" variants={itemVariants}>
                        Inspiro-me nos mestres clássicos — na iluminação de Caravaggio,
                        na composição de Rafael, no drama de Rembrandt. Cada projeto é
                        tratado como uma tela em branco, onde luz, sombra, ritmo e
                        silêncio dançam em harmonia.
                    </motion.p>

                    <motion.p className="manifesto-text" variants={itemVariants}>
                        Não edito vídeos. Componho experiências visuais que honram a
                        tradição enquanto abraçam a inovação. Arte que transcende o
                        efêmero e aspira à eternidade.
                    </motion.p>

                    <motion.div className="manifesto-signature" variants={itemVariants}>
                        <span className="manifesto-signature-line"></span>
                        <span className="manifesto-signature-name">O Artista</span>
                        <span className="manifesto-signature-role">Editor & Diretor de Arte Visual</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Manifesto;
