/**
 * Analytics utility for tracking user interactions
 * 
 * Uses Google Analytics gtag if available.
 * Falls back silently if gtag is not loaded.
 * 
 * Setup: Add your GA Measurement ID to index.html:
 * <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
 * <script>
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'GA_MEASUREMENT_ID');
 * </script>
 */

// Your Google Analytics Measurement ID (replace with your actual ID)
const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID';

/**
 * Track a custom event
 * @param {string} category - Event category (e.g., 'Portfolio', 'CTA', 'Navigation')
 * @param {string} action - Event action (e.g., 'click', 'submit', 'scroll')
 * @param {string} label - Event label (e.g., work title, button name)
 */
export const trackEvent = (category, action, label) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
        });
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Event: ${category} / ${action} / ${label}`);
    }
};

/**
 * Track a page view
 * @param {string} path - The page path to track
 */
export const trackPageView = (path) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: path,
        });
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Page view: ${path}`);
    }
};

/**
 * Track section scroll into view
 * @param {string} sectionId - The section ID that came into view
 */
export const trackSectionView = (sectionId) => {
    trackEvent('Navigation', 'scroll_into_view', sectionId);
};

/**
 * Track social link click
 * @param {string} platform - Social platform name (e.g., 'Instagram', 'YouTube')
 */
export const trackSocialClick = (platform) => {
    trackEvent('Social', 'click', platform);
};

/**
 * Track portfolio item click
 * @param {string} workTitle - Title of the clicked work
 */
export const trackPortfolioClick = (workTitle) => {
    trackEvent('Portfolio', 'click', workTitle);
};

/**
 * Track form events
 * @param {string} formName - Name of the form
 * @param {string} status - Status of form submission ('success', 'error', 'validation_error')
 */
export const trackFormSubmit = (formName, status) => {
    trackEvent('Form', status, formName);
};

/**
 * Track CTA button click
 * @param {string} ctaName - Name of the CTA button
 */
export const trackCTAClick = (ctaName) => {
    trackEvent('CTA', 'click', ctaName);
};

/**
 * Track navigation click
 * @param {string} destination - Where the user is navigating to
 */
export const trackNavigation = (destination) => {
    trackEvent('Navigation', 'click', destination);
};

export default {
    trackEvent,
    trackPageView,
    trackSectionView,
    trackSocialClick,
    trackPortfolioClick,
    trackFormSubmit,
    trackCTAClick,
    trackNavigation,
};
