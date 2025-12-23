import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Manifesto from './components/Manifesto/Manifesto';
import Portfolio from './components/Portfolio/Portfolio';
import Process from './components/Process/Process';
import Testimonial from './components/Testimonial/Testimonial';
import CallToAction from './components/CallToAction/CallToAction';
import Footer from './components/Footer/Footer';
import './styles/index.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <div className="section-divider" />

        <Manifesto />

        <div className="section-divider" />

        <Portfolio />

        <div className="section-divider" />

        <Process />

        <div className="section-divider" />

        <Testimonial />

        <div className="section-divider" />

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

export default App;
