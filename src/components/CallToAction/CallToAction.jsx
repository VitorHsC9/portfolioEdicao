import { memo, useMemo, useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { trackFormSubmit } from '../../utils/analytics';
import './CallToAction.css';

/**
 * CallToAction section with functional contact form
 * Uses FormSubmit.co for email delivery (no backend required)
 * 
 * Setup: After first submission, verify your email with FormSubmit.co
 */
const CallToAction = memo(() => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        message: ''
    });

    // Form validation errors
    const [errors, setErrors] = useState({});

    // Submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Project type options
    const projectTypes = useMemo(() => [
        { value: '', label: 'Selecione o tipo de projeto' },
        { value: 'video-edit', label: 'Edição de Vídeo' },
        { value: 'color-grading', label: 'Correção de Cor' },
        { value: 'motion-graphics', label: 'Motion Graphics' },
        { value: 'full-production', label: 'Produção Completa' },
        { value: 'consultation', label: 'Consultoria Criativa' },
        { value: 'other', label: 'Outro' },
    ], []);

    // Animation variants
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    }), []);

    const messageVariants = useMemo(() => ({
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.3 }
        }
    }), []);

    // Validation function
    const validateForm = useCallback(() => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Project type validation
        if (!formData.projectType) {
            newErrors.projectType = 'Selecione um tipo de projeto';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Mensagem é obrigatória';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Input change handler
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    }, [errors]);

    // Form submission handler
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // FormSubmit.co endpoint - replace with your email
            const response = await fetch('https://formsubmit.co/ajax/kevinalexcarvalhodemoraes@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    projectType: projectTypes.find(p => p.value === formData.projectType)?.label || formData.projectType,
                    message: formData.message,
                    _subject: `Novo contato do Portfolio - ${formData.name}`,
                    _template: 'table'
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', projectType: '', message: '' });
                trackFormSubmit('contact', 'success');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            trackFormSubmit('contact', 'error');

            // Fallback: open mailto link
            setTimeout(() => {
                const selectedProject = projectTypes.find(p => p.value === formData.projectType)?.label || formData.projectType;
                const mailtoLink = `mailto:kevinalexcarvalhodemoraes@gmail.com?subject=Contato do Portfolio - ${formData.name}&body=${encodeURIComponent(
                    `Nome: ${formData.name}\nEmail: ${formData.email}\nTipo de Projeto: ${selectedProject}\n\nMensagem:\n${formData.message}`
                )}`;
                window.location.href = mailtoLink;
            }, 2000);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, projectTypes, validateForm]);

    // Reset form to try again
    const handleReset = useCallback(() => {
        setSubmitStatus(null);
        setErrors({});
    }, []);

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

                    <AnimatePresence mode="wait">
                        {submitStatus === 'success' ? (
                            <motion.div
                                key="success"
                                className="cta-message cta-success"
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <span className="cta-success-icon">✓</span>
                                <h3>Mensagem Enviada!</h3>
                                <p>Obrigado pelo contato. Retornarei em breve com todo o carinho que sua mensagem merece.</p>
                                <button
                                    type="button"
                                    className="cta-button cta-button-secondary"
                                    onClick={handleReset}
                                >
                                    Enviar outra mensagem
                                </button>
                            </motion.div>
                        ) : submitStatus === 'error' ? (
                            <motion.div
                                key="error"
                                className="cta-message cta-error"
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <span className="cta-error-icon">!</span>
                                <h3>Ops! Algo deu errado</h3>
                                <p>Não foi possível enviar sua mensagem. Estamos abrindo seu cliente de email como alternativa...</p>
                                <button
                                    type="button"
                                    className="cta-button"
                                    onClick={handleReset}
                                >
                                    Tentar novamente
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                className="cta-form"
                                variants={itemVariants}
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <div className="cta-form-row">
                                    <div className={`cta-form-group ${errors.name ? 'has-error' : ''}`}>
                                        <label htmlFor="name">Nome</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Seu nome"
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && (
                                            <span className="cta-form-error">{errors.name}</span>
                                        )}
                                    </div>
                                    <div className={`cta-form-group ${errors.email ? 'has-error' : ''}`}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="seu@email.com"
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <span className="cta-form-error">{errors.email}</span>
                                        )}
                                    </div>
                                </div>

                                <div className={`cta-form-group ${errors.projectType ? 'has-error' : ''}`}>
                                    <label htmlFor="projectType">Tipo de Projeto</label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    >
                                        {projectTypes.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.projectType && (
                                        <span className="cta-form-error">{errors.projectType}</span>
                                    )}
                                </div>

                                <div className={`cta-form-group ${errors.message ? 'has-error' : ''}`}>
                                    <label htmlFor="message">Mensagem</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Conte-me sobre seu projeto..."
                                        rows="5"
                                        disabled={isSubmitting}
                                    />
                                    {errors.message && (
                                        <span className="cta-form-error">{errors.message}</span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="cta-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="cta-button-spinner"></span>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar mensagem
                                            <span className="cta-button-arrow">→</span>
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;

