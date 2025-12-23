import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import './CallToAction.css';

const CallToAction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Usando Formspree para enviar o email
        try {
            const response = await fetch('https://formspree.io/f/kevinalexcarvalhodemoraes@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _replyto: formData.email,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            // Fallback: abre o email do cliente
            const mailtoLink = `mailto:kevinalexcarvalhodemoraes@gmail.com?subject=Contato do Site - ${formData.name}&body=${encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`)}`;
            window.location.href = mailtoLink;
        }

        setIsSubmitting(false);
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
                        Contato
                    </motion.span>

                    <motion.h2 className="cta-title" variants={itemVariants}>
                        Vamos criar algo extraordinário juntos?
                    </motion.h2>

                    <motion.p className="cta-description" variants={itemVariants}>
                        Entre em contato para discutir seu projeto.
                        Cada colaboração é uma parceria criativa única.
                    </motion.p>

                    {submitted ? (
                        <motion.div
                            className="cta-success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <span className="cta-success-icon">✓</span>
                            <p>Mensagem enviada com sucesso! Entrarei em contato em breve.</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            className="cta-form"
                            variants={itemVariants}
                            onSubmit={handleSubmit}
                        >
                            <div className="cta-form-row">
                                <div className="cta-form-group">
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div className="cta-form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>
                            <div className="cta-form-group">
                                <label htmlFor="message">Mensagem</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Conte-me sobre seu projeto..."
                                    rows="5"
                                />
                            </div>
                            <button
                                type="submit"
                                className="cta-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                                <span className="cta-button-arrow">→</span>
                            </button>
                        </motion.form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;
