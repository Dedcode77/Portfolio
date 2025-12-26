import React, { useState, useEffect, useCallback } from "react";

// Composant Image avec effets holographiques
const HolographicImage = ({ imageSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        width: '400px', 
        height: '400px', 
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Cercles animés en arrière-plan */}
      <div style={{
        position: 'absolute',
        inset: '-50px',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${1 + i * 0.3})`,
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              border: `2px solid rgba(51, 153, 255, ${0.3 - i * 0.1})`,
              animation: `pulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              boxShadow: `0 0 ${20 + i * 10}px rgba(51, 153, 255, ${0.3 - i * 0.1})`
            }}
          />
        ))}
      </div>

      {/* Particules flottantes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: i % 2 === 0 ? '#3399ff' : '#66b3ff',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#3399ff' : '#66b3ff'}`,
            opacity: 0.6
          }}
        />
      ))}

      {/* Container de l'image */}
      <div
        style={{
          position: 'relative',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #3399ff',
          boxShadow: isHovered 
            ? '0 0 40px rgba(51, 153, 255, 0.8), inset 0 0 30px rgba(51, 153, 255, 0.2)' 
            : '0 0 20px rgba(51, 153, 255, 0.5), inset 0 0 20px rgba(51, 153, 255, 0.1)',
          transition: 'all 0.3s ease',
          transform: isHovered 
            ? `scale(1.05) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)` 
            : 'scale(1) rotateY(0deg) rotateX(0deg)',
          zIndex: 10,
          background: 'rgba(0, 20, 40, 0.5)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Image */}
        {!imageError ? (
          <img
            src={imageSrc || 'https://via.placeholder.com/400/0a2540/3399ff?text=Votre+Photo'}
            alt="Profil"
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
              transition: 'filter 0.3s ease'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a2540, #1a3a5a)',
            color: '#3399ff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '2rem'
          }}>
            📷<br/>Image non trouvée
          </div>
        )}

        {/* Effet holographique par-dessus */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isHovered
              ? 'linear-gradient(135deg, rgba(51, 153, 255, 0.2) 0%, transparent 50%, rgba(102, 179, 255, 0.2) 100%)'
              : 'linear-gradient(135deg, rgba(51, 153, 255, 0.1) 0%, transparent 50%, rgba(102, 179, 255, 0.1) 100%)',
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Scan line animée */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(51, 153, 255, 0.3) 50%, transparent 100%)',
            animation: 'scan 3s linear infinite',
            pointerEvents: 'none',
            opacity: isHovered ? 0.6 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>

      {/* Coins décoratifs */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <div
          key={corner}
          style={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            ...(corner.includes('top') ? { top: '10px' } : { bottom: '10px' }),
            ...(corner.includes('left') ? { left: '10px' } : { right: '10px' }),
            borderColor: '#3399ff',
            borderStyle: 'solid',
            borderWidth: corner.includes('top') && corner.includes('left') ? '3px 0 0 3px' :
                         corner.includes('top') && corner.includes('right') ? '3px 3px 0 0' :
                         corner.includes('bottom') && corner.includes('left') ? '0 0 3px 3px' :
                         '0 3px 3px 0',
            boxShadow: '0 0 15px #3399ff',
            animation: 'pulse 2s ease-in-out infinite',
            opacity: isHovered ? 1 : 0.6,
            transition: 'opacity 0.3s ease',
            zIndex: 20
          }}
        />
      ))}

      {/* Message au survol */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#3399ff',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          pointerEvents: 'none',
          textShadow: '0 0 10px #3399ff',
          animation: 'fadeIn 0.3s ease',
          zIndex: 30,
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '0.5rem 1.5rem',
          borderRadius: '2rem',
          border: '1px solid #3399ff',
          backdropFilter: 'blur(10px)'
        }}>
          Salif Ciss
        </div>
      )}
    </div>
  );
};

const timelineItems = [
  { 
    year: "2021", 
    label: "Début stage chez Volkeno - Développeur Frontend",
    icon: "💻",
    color: "#3399ff"
  },
  { 
    year: "2024", 
    label: "Début chez IBMS - Responsable IT / Développeur Full Stack",
    icon: "🚀",
    color: "#66b3ff"
  },
];

const CyberpunkGrid = React.memo(() => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(51, 153, 255, 0.03) 2px, rgba(51, 153, 255, 0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 153, 204, 0.03) 2px, rgba(0, 153, 204, 0.03) 4px)'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(51, 153, 255, 0.1) 50%, transparent 100%)',
        animation: 'scan 4s linear infinite'
      }} />
      
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 200 + 50}px`,
            height: '2px',
            background: Math.random() > 0.5 ? '#3399ff' : '#0099cc',
            animation: `glitch ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0
          }}
        />
      ))}
    </div>
  );
});

const About3D = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    image: false,
    text: false
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleSections(prev => ({ ...prev, title: true })), 100),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, image: true })), 400),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, text: true })), 700)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleTimelineClick = useCallback((index, year, label) => {
    setSelectedTimeline(index);
    alert(`${year}: ${label}`);
  }, []);

  // Fonction pour télécharger le CV
  const handleDownloadCV = () => {
    setIsDownloading(true);
    
    try {
      const link = document.createElement('a');
      link.href = '/CV_Salif_Ciss.pdf';
      link.download = 'CV_Salif_Ciss.pdf';
      link.target = '_blank';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        setIsDownloading(false);
        console.log('✅ Téléchargement du CV lancé !');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Erreur lors du téléchargement:', error);
      setIsDownloading(false);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    }
  };

  return (
    <section 
      id="about" 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #001a2e 0%, #002a3a 50%, #001520 100%)',
        color: 'white',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}
    >
      <CyberpunkGrid />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 10, marginBottom: '4rem' }}>
        <h2 
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            textAlign: 'center',
            color: '#3399ff',
            textShadow: '0 0 10px #3399ff, 0 0 20px #3399ff, 0 0 30px #66b3ff',
            opacity: visibleSections.title ? 1 : 0,
            transform: visibleSections.title ? 'translateY(0)' : 'translateY(-50px)',
            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            letterSpacing: '4px',
            fontFamily: 'monospace',
            position: 'relative'
          }}
        >
          À PROPOS DE MOI
          <span style={{
            position: 'absolute',
            inset: 0,
            color: '#66b3ff',
            animation: 'glitchText 3s infinite',
            clipPath: 'inset(0 0 50% 0)'
          }}>
            À PROPOS DE MOI
          </span>
        </h2>
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #3399ff, #66b3ff, transparent)',
          marginTop: '1rem',
          animation: 'shimmerLine 2s ease-in-out infinite'
        }} />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth >= 1024 ? 'row' : 'column',
        alignItems: 'center',
        gap: '3rem',
        maxWidth: '1400px',
        width: '100%',
        zIndex: 10,
        position: 'relative'
      }}>
        <div 
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            opacity: visibleSections.image ? 1 : 0,
            transform: visibleSections.image ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <HolographicImage imageSrc="/LOGO1.png" />
        </div>

        <div 
          style={{
            maxWidth: '600px',
            flex: 1,
            opacity: visibleSections.text ? 1 : 0,
            transform: visibleSections.text ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <p style={{
            color: '#3399ff',
            fontSize: '1.125rem',
            lineHeight: 1.9,
            marginBottom: '1.5rem',
            textShadow: '0 0 5px rgba(51, 153, 255, 0.5)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            <span style={{ color: '#66b3ff', fontWeight: 'bold' }}>{'>'}</span> Développeur passionné par l'innovation digitale, je conçois des solutions web performantes et sur mesure qui allient excellence technique et expérience utilisateur remarquable. De la conception à la mise en production, je transforme des idées en applications modernes, scalables et intuitives.
          </p>

          <p style={{
            color: 'rgba(51, 153, 255, 0.8)',
            fontSize: '1rem',
            lineHeight: 1.9,
            marginBottom: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            <span style={{ color: '#66b3ff', fontWeight: 'bold' }}>{'>'}</span> Spécialisé dans les technologies front-end et back-end de pointe, je m'engage à créer des interfaces élégantes et des architectures robustes qui répondent aux défis du web d'aujourd'hui.
          </p>

          <div style={{
            position: 'relative',
            paddingLeft: '3rem',
            marginTop: '3rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '10px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, #3399ff, #66b3ff)',
              boxShadow: '0 0 10px #3399ff'
            }} />
            
            {timelineItems.map(({ year, label, icon, color }, i) => (
              <div
                key={year}
                style={{
                  position: 'relative',
                  marginBottom: '2rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: selectedTimeline === i 
                    ? 'rgba(51, 153, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: selectedTimeline === i 
                    ? `2px solid ${color}` 
                    : '1px solid rgba(51, 153, 255, 0.2)',
                  transform: selectedTimeline === i ? 'translateX(10px)' : 'translateX(0)',
                  boxShadow: selectedTimeline === i 
                    ? `0 0 20px ${color}` 
                    : 'none',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}
                onClick={() => handleTimelineClick(i, year, label)}
                onMouseEnter={() => setSelectedTimeline(i)}
                onMouseLeave={() => setSelectedTimeline(null)}
              >
                <div style={{
                  position: 'absolute',
                  left: '-2.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  background: color,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  boxShadow: `0 0 15px ${color}`,
                  transition: 'all 0.3s ease',
                  animation: selectedTimeline === i ? 'rotate 2s linear infinite' : 'none'
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem', filter: `drop-shadow(0 0 5px ${color})` }}>
                    {icon}
                  </span>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: color,
                    textShadow: `0 0 10px ${color}`,
                    fontFamily: 'monospace'
                  }}>
                    {year}
                  </span>
                </div>
                <p style={{
                  color: selectedTimeline === i ? '#ffffff' : 'rgba(51, 153, 255, 0.8)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  transition: 'color 0.3s ease'
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '3rem'
          }}>
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              style={{
                position: 'relative',
                padding: '1rem 2rem',
                background: isDownloading 
                  ? 'linear-gradient(90deg, #00cc66, #3399ff)' 
                  : 'linear-gradient(90deg, #3399ff, #66b3ff)',
                color: '#fff',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'monospace',
                boxShadow: '0 0 20px rgba(51, 153, 255, 0.5)',
                border: 'none',
                cursor: isDownloading ? 'wait' : 'pointer',
                opacity: isDownloading ? 0.8 : 1
              }}
              onMouseEnter={(e) => {
                if (!isDownloading) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(51, 153, 255, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(51, 153, 255, 0.5)';
              }}
            >
              <span>
                {isDownloading ? '⏳ TÉLÉCHARGEMENT...' : '📄 TÉLÉCHARGER CV'}
              </span>
            </button>

            <a
              href="#contact"
              style={{
                padding: '1rem 2rem',
                border: '2px solid #3399ff',
                color: '#3399ff',
                background: 'rgba(0, 0, 0, 0.5)',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'monospace'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3399ff';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(51, 153, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                e.currentTarget.style.color = '#3399ff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ✉️ CONTACT
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes glitch {
          0%, 100% { opacity: 0; transform: translateX(0); }
          50% { opacity: 0.8; transform: translateX(-5px); }
        }

        @keyframes glitchText {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }

        @keyframes shimmerLine {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes rotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, 5px); }
          75% { transform: translate(-10px, -5px); }
        }
      `}</style>
    </section>
  );
};

export default About3D;