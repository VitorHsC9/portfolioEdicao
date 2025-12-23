import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Testimonial.css';

const Testimonial = () => {
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
        <section className="testimonial section" ref={ref}>
            <div className="container">
                <motion.div
                    className="testimonial-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.span className="testimonial-quote-mark open" variants={itemVariants}>
                        "
                    </motion.span>

                    <motion.blockquote className="testimonial-quote" variants={itemVariants}>
                        A beleza salvará o mundo.
                    </motion.blockquote>

                    <motion.div className="testimonial-ornament" variants={itemVariants}>
                        <span className="testimonial-ornament-line"></span>
                        <span className="testimonial-ornament-symbol">✦</span>
                        <span className="testimonial-ornament-line"></span>
                    </motion.div>

                    <motion.div className="testimonial-author" variants={itemVariants}>
                        <span className="testimonial-author-name">Fiodor Dostoevsky</span>
                    </motion.div>

                    <motion.span className="testimonial-quote-mark close" variants={itemVariants}>
                        "
                    </motion.span>

                    <span className="testimonial-side-ornament left">❧</span>
                    <span className="testimonial-side-ornament right">❧</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonial;
