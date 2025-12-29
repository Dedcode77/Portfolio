import { useEffect, useState, useCallback } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Détecter la direction du scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else {
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

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, navLinks]);

  const handleClick = useCallback((to) => {
    setIsOpen(false);
    const element = document.querySelector(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

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
          text-decoration: none;
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
          pointer-events: none;
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
          text-decoration: none;
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
          text-decoration: none;
          display: block;
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
          pointer-events: none;
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

        nav {
          position: fixed;
          width: 100%;
          z-index: 50;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-visible {
          transform: translateY(0);
        }

        .nav-hidden {
          transform: translateY(-100%);
        }

        .py-3 {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }

        .py-5 {
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
        }

        .max-w-7xl {
          max-width: 80rem;
        }

        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }

        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .flex {
          display: flex;
        }

        .items-center {
          align-items: center;
        }

        .justify-between {
          justify-content: space-between;
        }

        .gap-10 {
          gap: 2.5rem;
        }

        .hidden {
          display: none;
        }

        .text-gray-300 {
          color: rgb(209, 213, 219);
        }

        .text-blue-400 {
          color: rgb(96, 165, 250);
        }

        @media (min-width: 768px) {
          .md\\:flex {
            display: flex;
          }
          .md\\:hidden {
            display: none;
          }
          .md\\:text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
        }

        @media (min-width: 640px) {
          .sm\\:px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .lg\\:px-8 {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>

      <nav
        className={`${isScrolled ? 'nav-blur py-3' : 'nav-transparent py-5'} ${isVisible ? 'nav-visible' : 'nav-hidden'}`}
      >
        <div className="grid-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="nav-container flex justify-between items-center">
            {/* Accents décoratifs aux 4 coins */}
            <div className="corner-accent corner-tl"></div>
            <div className="corner-accent corner-tr"></div>
            <div className="corner-accent corner-bl"></div>
            <div className="corner-accent corner-br"></div>

            {/* Logo */}
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#hero');
              }}
              className="logo-gradient"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                letterSpacing: '-0.025em',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10,
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              DedcodeTech
            </a>

            {/* Menu desktop */}
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
                  className={`nav-link ${
                    activeSection === link.to 
                      ? 'active' 
                      : 'text-gray-300'
                  }`}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}
                >
                  <span className="nav-link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
              
              <button 
                onClick={() => handleClick('#contact')}
                className="btn-cyber"
                style={{
                  padding: '0.75rem 1.75rem',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase'
                }}
              >
                <span style={{ position: 'relative', zIndex: 10 }}>Me Contacter</span>
              </button>
            </div>

            {/* Menu mobile - burger */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden"
              style={{
                padding: '0.75rem',
                transition: 'all 0.3s',
                color: 'rgb(96, 165, 250)',
                position: 'relative',
                zIndex: 10,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              aria-label="Menu"
            >
              <div style={{
                width: '1.5rem',
                height: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <span 
                  className="burger-line"
                  style={{
                    height: '0.125rem',
                    width: '100%',
                    borderRadius: '9999px',
                    transform: isOpen ? 'rotate(45deg) translateY(0.5rem)' : 'none'
                  }}
                />
                <span 
                  className="burger-line"
                  style={{
                    height: '0.125rem',
                    width: '100%',
                    borderRadius: '9999px',
                    opacity: isOpen ? 0 : 1
                  }}
                />
                <span 
                  className="burger-line"
                  style={{
                    height: '0.125rem',
                    width: '100%',
                    borderRadius: '9999px',
                    transform: isOpen ? 'rotate(-45deg) translateY(-0.5rem)' : 'none'
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isOpen && (
          <div className="mobile-menu md:hidden" style={{
            marginTop: '1rem',
            marginLeft: '1rem',
            marginRight: '1rem',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {navLinks.map((link, index) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.to);
                  }}
                  className={`mobile-menu-item ${
                    activeSection === link.to
                      ? 'active'
                      : 'text-gray-300'
                  }`}
                  style={{
                    padding: '1rem 1.25rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    animationDelay: `${index * 0.05}s`,
                    animation: 'slideDown 0.3s ease-out forwards',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
              
              <button 
                onClick={() => handleClick('#contact')}
                className="btn-cyber"
                style={{
                  marginTop: '1.5rem',
                  width: '100%',
                  padding: '1rem 1.5rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem'
                }}
              >
                <span style={{ position: 'relative', zIndex: 10 }}>Me Contacter</span>
              </button>
            </div>
          </div>
        )}

        {/* Overlay */}
        {isOpen && (
          <div 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backdropFilter: 'blur(0.75rem)',
              zIndex: -10,
              animation: 'fadeIn 0.3s ease-out',
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0.8))'
            }}
            className="md:hidden"
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;