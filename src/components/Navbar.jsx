import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

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
      setIsScrolled(window.scrollY > 20);

      // Détection de la section active
      const sections = navLinks.map(link => link.to.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (to) => {
    setIsOpen(false);
    const element = document.querySelector(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .nav-blur {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }

        .nav-transparent {
          background: transparent;
        }

        .mobile-menu {
          animation: slideDown 0.3s ease-out;
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #8b5cf6, #6366f1);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #8b5cf6;
        }

        .logo-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 15px 0 rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          box-shadow: 0 6px 20px 0 rgba(102, 126, 234, 0.6);
          transform: translateY(-2px);
        }

        .burger-line {
          transition: all 0.3s ease;
        }
      `}</style>

      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'nav-blur shadow-lg py-3' : 'nav-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#hero');
              }}
              className="text-2xl md:text-3xl logo-gradient tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Dedcode77
            </a>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.to);
                  }}
                  className={`nav-link text-sm font-semibold ${
                    activeSection === link.to 
                      ? 'active text-purple-600' 
                      : isScrolled 
                        ? 'text-gray-700 hover:text-purple-600' 
                        : 'text-white hover:text-purple-300'
                  } transition-colors duration-300`}
                >
                  {link.label}
                </a>
              ))}
              
              <button 
                onClick={() => handleClick('#contact')}
                className="btn-gradient text-white px-6 py-2.5 rounded-full font-semibold text-sm"
              >
                Me Contacter
              </button>
            </div>

            {/* Menu mobile - burger animé */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span 
                  className={`burger-line h-0.5 w-full rounded-full ${
                    isScrolled ? 'bg-gray-700' : 'bg-white'
                  } ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span 
                  className={`burger-line h-0.5 w-full rounded-full ${
                    isScrolled ? 'bg-gray-700' : 'bg-white'
                  } ${isOpen ? 'opacity-0' : ''}`}
                />
                <span 
                  className={`burger-line h-0.5 w-full rounded-full ${
                    isScrolled ? 'bg-gray-700' : 'bg-white'
                  } ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant amélioré */}
        {isOpen && (
          <div className="mobile-menu md:hidden nav-blur mt-4 mx-4 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.to);
                  }}
                  className={`block py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeSection === link.to
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </a>
              ))}
              
              <button 
                onClick={() => handleClick('#contact')}
                className="mt-4 w-full btn-gradient text-white px-6 py-3 rounded-full font-semibold"
              >
                Me Contacter
              </button>
            </div>
          </div>
        )}

        {/* Overlay pour fermer le menu mobile */}
        {isOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;