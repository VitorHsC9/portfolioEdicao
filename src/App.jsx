import { lazy, Suspense } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import './styles/index.css';

// Lazy load heavy components for better initial load performance
const Manifesto = lazy(() => import('./components/Manifesto/Manifesto'));
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'));
const Process = lazy(() => import('./components/Process/Process'));
const Testimonial = lazy(() => import('./components/Testimonial/Testimonial'));
const CallToAction = lazy(() => import('./components/CallToAction/CallToAction'));

/**
 * Main App component
 * Header, Hero, and Footer load immediately for fast first paint
 * Other sections are lazy loaded as user scrolls
 */
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <div className="section-divider" />

        <Suspense fallback={<LoadingSpinner />}>
          <Manifesto />
        </Suspense>

        <div className="section-divider" />

        <Suspense fallback={<LoadingSpinner />}>
          <Portfolio />
        </Suspense>

        <div className="section-divider" />

        <Suspense fallback={<LoadingSpinner />}>
          <Process />
        </Suspense>

        <div className="section-divider" />

        <Suspense fallback={<LoadingSpinner />}>
          <Testimonial />
        </Suspense>

        <div className="section-divider" />

        <Suspense fallback={<LoadingSpinner />}>
          <CallToAction />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;

