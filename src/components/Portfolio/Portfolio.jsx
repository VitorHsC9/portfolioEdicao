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
            title: 'O Silêncio das Sombras',
            category: 'Curta-metragem',
            description: 'Uma meditação visual sobre luz e escuridão',
            image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=750&fit=crop',
        },
        {
            id: 2,
            title: 'Vestígios do Sagrado',
            category: 'Documentário',
            description: 'Explorando a arte sacra contemporânea',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop',
        },
        {
            id: 3,
            title: 'Natureza Morta',
            category: 'Vídeo Arte',
            description: 'Composições inspiradas em mestres flamengos',
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=750&fit=crop',
        },
        {
            id: 4,
            title: 'A Última Luz',
            category: 'Comercial',
            description: 'Campanha para marca de luxo artesanal',
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=750&fit=crop',
        },
        {
            id: 5,
            title: 'Memórias do Tempo',
            category: 'Experimental',
            description: 'Fragmentos visuais da passagem temporal',
            image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&h=750&fit=crop',
        },
        {
            id: 6,
            title: 'O Retrato Interior',
            category: 'Perfil',
            description: 'Documentário intimista sobre artistas',
            image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=750&fit=crop',
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
                        Uma curadoria de trabalhos que honram a tradição visual
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
