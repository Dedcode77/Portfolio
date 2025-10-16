import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
// import Certifications from '../components/Certifications';

const Accueil = () => {
  return (
    <div className="relative min-h-screen bg-[url('assets/emilio-garcia-VfeXGzHqA2I-unsplash.jpg')] bg-no-repeat  bg-center bg-fixed bg-cover">
    <Navbar />
      <Hero />
      <About/>
      <Skills/>
      <Projects />
      {/* <Certifications /> */}
      <Contact />
   
     
    </div>
  );
};

export default Accueil;
