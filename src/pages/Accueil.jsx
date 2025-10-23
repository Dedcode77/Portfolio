import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Certifications from '../components/Certifications';

const Accueil = () => {
  return (
    <div className="relative min-h-screen ">
    <Navbar />
      <Hero />
      <About/>
      <Skills/>
      <Projects />
      <Certifications />
      <Contact />
   
     
    </div>
  );
};

export default Accueil;
