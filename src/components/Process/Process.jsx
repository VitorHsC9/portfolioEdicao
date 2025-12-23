import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Process.css';

const Process = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const steps = [
        {
            number: 'I',
            title: 'Imersão & Pesquisa',
            description:
                'Estudo profundo do material bruto, buscando referências clássicas e contemporâneas que ressoem com a essência do projeto.',
        },
        {
            number: 'II',
            title: 'Composição Narrativa',
            description:
                'Construção da estrutura dramática, definindo ritmo, pausas e pontos de inflexão como em uma sinfonia visual.',
        },
        {
            number: 'III',
            title: 'Luz & Atmosfera',
            description:
                'Tratamento de cor e luz inspirado nos mestres da pintura, criando uma paleta que evoca emoção e transcendência.',
        },
        {
            number: 'IV',
            title: 'Refinamento Final',
            description:
                'Polimento obsessivo de cada detalhe, onde milissegundos fazem diferença e a perfeição é o único padrão aceitável.',
        },
    ];

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
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
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
        <section className="process section" id="processo" ref={ref}>
            <div className="container">
                <motion.div
                    className="process-header"
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <span className="process-eyebrow">Metodologia</span>
                    <h2 className="process-title">Processo Criativo</h2>
                    <p className="process-subtitle">
                        Uma abordagem artesanal onde cada etapa é tratada com reverência
                    </p>
                </motion.div>

                <motion.div
                    className="process-timeline"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="process-item"
                            variants={itemVariants}
                        >
                            <div className="process-item-number">{step.number}</div>
                            <div className="process-item-content">
                                <h3 className="process-item-title">{step.title}</h3>
                                <p className="process-item-description">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Process;
