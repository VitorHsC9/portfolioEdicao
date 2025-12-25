import './LoadingSpinner.css';

/**
 * Elegant loading spinner component
 * Matches the classical design aesthetic of the portfolio
 */
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="loading-spinner-content">
                <span className="loading-spinner-ornament">✦</span>
                <p className="loading-spinner-text">Carregando...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
