import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Portfolio.css';

const Portfolio = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const works = [
        {
            id: 1,
            title: 'Obra I',
            category: 'Edição de Vídeo',
            description: 'Uma composição visual única',
            image: '/assets/portfolio/1.jpg',
            videoUrl: 'https://www.instagram.com/reel/DRdKFVXgEQE/',
        },
        {
            id: 2,
            title: 'Obra II',
            category: 'Edição de Vídeo',
            description: 'Arte em movimento',
            image: '/assets/portfolio/2.jpg',
            videoUrl: 'https://www.instagram.com/reel/DPRU_yBAIkm/',
        },
        {
            id: 3,
            title: 'Obra III',
            category: 'Edição de Vídeo',
            description: 'Narrativa visual contemplativa',
            image: '/assets/portfolio/3.jpg',
            videoUrl: 'https://www.instagram.com/reel/DSNm9FmAJE7/',
        },
        {
            id: 4,
            title: 'Obra IV',
            category: 'Edição de Vídeo',
            description: 'Luz e sombra em harmonia',
            image: '/assets/portfolio/4.jpg',
            videoUrl: 'https://www.instagram.com/reel/DQ_wBjdAK0d/',
        },
        {
            id: 5,
            title: 'Obra V',
            category: 'Edição de Vídeo',
            description: 'Composição cinematográfica',
            image: '/assets/portfolio/5.jpg',
            videoUrl: 'https://www.instagram.com/reel/DRk3LuwiP_k/',
        },
        {
            id: 6,
            title: 'Obra VI',
            category: 'Edição de Vídeo',
            description: 'Expressão artística digital',
            image: '/assets/portfolio/6.jpg',
            videoUrl: 'https://www.instagram.com/reel/DPWNtHBgILy/',
        },
    ];

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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    const handleWorkClick = (videoUrl) => {
        window.open(videoUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="portfolio section" id="obras" ref={ref}>
            <div className="container">
                <motion.div
                    className="portfolio-header"
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <span className="portfolio-eyebrow">Portfólio</span>
                    <h2 className="portfolio-title">Obras Selecionadas</h2>
                    <p className="portfolio-subtitle">
                        Clique para assistir cada obra
                    </p>
                </motion.div>

                <motion.div
                    className="portfolio-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {works.map((work) => (
                        <motion.article
                            key={work.id}
                            className="portfolio-card"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            onClick={() => handleWorkClick(work.videoUrl)}
                        >
                            <img
                                src={work.image}
                                alt={work.title}
                                className="portfolio-card-image"
                                loading="lazy"
                            />
                            <div className="portfolio-card-overlay">
                                <div className="portfolio-card-content">
                                    <span className="portfolio-card-category">{work.category}</span>
                                    <h3 className="portfolio-card-title">{work.title}</h3>
                                    <p className="portfolio-card-description">{work.description}</p>
                                    <span className="portfolio-card-play">▶ Assistir</span>
                                </div>
                            </div>
                            <span className="portfolio-card-ornament">✦</span>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
