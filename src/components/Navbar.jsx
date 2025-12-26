import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { label: "Accueil", to: "#hero", icon: "⌂" },
    { label: "À propos", to: "#about", icon: "◉" },
    { label: "Compétences", to: "#skills", icon: "◈" },
    { label: "Projets", to: "#projects", icon: "◐" },
    { label: "Certifications", to: "#certifications", icon: "◆" },
    { label: "Contact", to: "#contact", icon: "◎" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Détecter la direction du scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll vers le bas - cacher la navbar
        setIsVisible(false);
      } else {
        // Scroll vers le haut - montrer la navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);

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

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

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
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes neonPulse {
          0%, 100% {
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.8),
                         0 0 20px rgba(59, 130, 246, 0.6),
                         0 0 30px rgba(59, 130, 246, 0.4),
                         0 0 40px rgba(59, 130, 246, 0.2);
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.6));
          }
          50% {
            text-shadow: 0 0 15px rgba(59, 130, 246, 1),
                         0 0 30px rgba(59, 130, 246, 0.8),
                         0 0 45px rgba(59, 130, 246, 0.6),
                         0 0 60px rgba(59, 130, 246, 0.4);
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8));
          }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes borderGlow {
          0%, 100% { 
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
          }
          50% { 
            border-color: rgba(59, 130, 246, 0.6);
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .nav-blur {
          backdrop-filter: blur(20px) saturate(180%);
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(15, 23, 42, 0.85) 100%);
          border-bottom: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.7),
                      0 0 40px rgba(59, 130, 246, 0.1),
                      inset 0 1px 0 rgba(59, 130, 246, 0.2);
          animation: borderGlow 3s ease-in-out infinite;
        }

        .nav-transparent {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }

        .nav-container {
          position: relative;
          overflow: hidden;
        }

        .nav-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          animation: scanline 4s linear infinite;
        }

        .mobile-menu {
          animation: slideDown 0.3s ease-out;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%);
          border: 1px solid rgba(59, 130, 246, 0.4);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3),
                      inset 0 1px 0 rgba(59, 130, 246, 0.2);
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          color: #60a5fa;
          filter: blur(2px);
          transition: opacity 0.3s ease;
        }

        .nav-link:hover::before {
          opacity: 0.5;
          animation: glitch 0.3s ease-in-out;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8),
                      0 0 20px rgba(59, 130, 246, 0.4);
          transition: width 0.4s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #3b82f6;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.8),
                       0 0 20px rgba(59, 130, 246, 0.4);
        }

        .nav-link-icon {
          font-size: 1.2em;
          transition: all 0.3s ease;
        }

        .nav-link:hover .nav-link-icon {
          transform: scale(1.2) rotate(360deg);
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
        }

        .logo-gradient {
          color: white;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          position: relative;
        }

        .btn-cyber {
          background: transparent;
          border: 2px solid #3b82f6;
          color: #3b82f6;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3),
                      inset 0 0 20px rgba(59, 130, 246, 0.1);
          letter-spacing: 0.15em;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }

        .btn-cyber::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
          transition: left 0.6s ease;
        }

        .btn-cyber::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 0;
          background: #60a5fa;
          box-shadow: 0 0 10px #60a5fa;
          transition: height 0.4s ease;
        }

        .btn-cyber:hover::before {
          left: 100%;
        }

        .btn-cyber:hover::after {
          height: 100%;
        }

        .btn-cyber:hover {
          color: white;
          background: rgba(59, 130, 246, 0.2);
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.6),
                      inset 0 0 40px rgba(59, 130, 246, 0.2),
                      0 0 60px rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
          animation: float 2s ease-in-out infinite;
        }

        .burger-line {
          transition: all 0.3s ease;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }

        .mobile-menu-item {
          border-left: 3px solid transparent;
          transition: all 0.3s ease;
          letter-spacing: 0.12em;
          position: relative;
          overflow: hidden;
        }

        .mobile-menu-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent);
          transition: width 0.3s ease;
        }

        .mobile-menu-item:hover::before {
          width: 100%;
        }

        .mobile-menu-item:hover {
          border-left-color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          box-shadow: inset 5px 0 15px rgba(59, 130, 246, 0.2);
        }

        .mobile-menu-item.active {
          border-left-color: #3b82f6;
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          box-shadow: inset 5px 0 20px rgba(59, 130, 246, 0.3),
                      0 0 30px rgba(59, 130, 246, 0.2);
        }

        .corner-accent {
          position: absolute;
          width: 24px;
          height: 24px;
          border: 2px solid #3b82f6;
          opacity: 0.6;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .corner-tl {
          top: -1px;
          left: -1px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: -1px;
          right: -1px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: -1px;
          left: -1px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: -1px;
          right: -1px;
          border-left: none;
          border-top: none;
        }

        .nav-blur .corner-accent {
          opacity: 1;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>

      <nav
        className={`fixed w-full z-50 transition-all duration-700 ${
          isScrolled ? 'nav-blur py-3' : 'nav-transparent py-5'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="grid-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="nav-container flex justify-between items-center relative">
            {/* Accents décoratifs aux 4 coins */}
            <div className="corner-accent corner-tl"></div>
            <div className="corner-accent corner-tr"></div>
            <div className="corner-accent corner-bl"></div>
            <div className="corner-accent corner-br"></div>

            {/* Logo amélioré */}
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#hero');
              }}
              className="text-2xl md:text-3xl logo-gradient tracking-tight hover:scale-110 transition-all duration-300 cursor-pointer relative z-10"
            >
              Dedcode77
            </a>

            {/* Menu desktop avec icônes */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.to);
                  }}
                  data-text={link.label}
                  className={`nav-link text-xs font-bold uppercase ${
                    activeSection === link.to 
                      ? 'active' 
                      : 'text-gray-300 hover:text-blue-400'
                  } transition-all duration-300`}
                >
                  <span className="nav-link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
              
              <button 
                onClick={() => handleClick('#contact')}
                className="btn-cyber px-7 py-3 rounded-none font-bold text-xs uppercase"
              >
                <span className="relative z-10">Me Contacter</span>
              </button>
            </div>

            {/* Menu mobile - burger animé amélioré */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-3 rounded-sm transition-all text-blue-400 hover:bg-blue-400/10 relative z-10 group"
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span 
                  className={`burger-line h-0.5 w-full rounded-full ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span 
                  className={`burger-line h-0.5 w-full rounded-full ${isOpen ? 'opacity-0' : ''}`}
                />
                <span 
                  className={`burger-line h-0.5 w-full rounded-full ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant amélioré */}
        {isOpen && (
          <div className="mobile-menu md:hidden mt-4 mx-4 rounded-none overflow-hidden">
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.to);
                  }}
                  className={`mobile-menu-item flex items-center gap-3 py-4 px-5 font-bold uppercase text-sm transition-all duration-300 ${
                    activeSection === link.to
                      ? 'active'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    animation: 'slideDown 0.3s ease-out forwards'
                  }}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
              
              <button 
                onClick={() => handleClick('#contact')}
                className="mt-6 w-full btn-cyber px-6 py-4 rounded-none font-bold uppercase text-sm"
              >
                <span className="relative z-10">Me Contacter</span>
              </button>
            </div>
          </div>
        )}

        {/* Overlay amélioré */}
        {isOpen && (
          <div 
            className="md:hidden fixed inset-0 backdrop-blur-md -z-10"
            onClick={() => setIsOpen(false)}
            style={{ 
              animation: 'fadeIn 0.3s ease-out',
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0.8))'
            }}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;