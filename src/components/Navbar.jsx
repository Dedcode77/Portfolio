import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", to: "#hero" },
    { label: "À propos", to: "#about" },
    { label: "Compétences", to: "#skills" },
    { label: "Projets", to: "#projects" },
    { label: "Certifications", to: "#certifications" },
    { label: "Contact", to: "#contact" },
  
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-00">Dedcode77</div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-gray-900 font-medium hover:text-indigo-600 transition"
              >
                {link.label}
              </a>
            ))}
            <button className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-sky-700 transition">
                  Me Contacter
            </button>
          </div>

          {/* Menu mobile - burger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 shadow">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-800 font-medium hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}
            <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
              Me Contacter
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
