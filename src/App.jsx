import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Welcome from './components/Welcome/Welcome';
import Research from './components/Research/Research';
import People from './components/People/People';
import Publications from './components/Publications/Publications';
import Lectures from './components/Lectures/Lectures';
import Gallery from './components/Gallery/Gallery';
import Positions from './components/Positions/Positions';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
    </>
  );
}

function App() {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.set('body', { opacity: 1 });
    
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<People />} />
            <Route path="/research" element={<Research />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;