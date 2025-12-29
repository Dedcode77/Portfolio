import { useState, useEffect, useCallback, useMemo, memo } from "react";

// Composant Image avec effets holographiques
const HolographicImage = memo(({ imageSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  }, []);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        width: '100%',
        maxWidth: '450px',
        aspectRatio: '1',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}
    >
      {/* Cercles animés */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${85 + i * 18}%`,
              height: `${85 + i * 18}%`,
              borderRadius: '50%',
              border: `2px solid rgba(51, 153, 255, ${0.4 - i * 0.08})`,
              animation: `pulse ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: `0 0 ${25 + i * 15}px rgba(51, 153, 255, ${0.4 - i * 0.08})`
            }}
          />
        ))}
      </div>

      {/* Particules flottantes */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 40 + (i % 3) * 10;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: i % 2 === 0 ? '6px' : '4px',
              height: i % 2 === 0 ? '6px' : '4px',
              background: i % 2 === 0 ? '#3399ff' : '#66b3ff',
              borderRadius: '50%',
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              boxShadow: `0 0 15px ${i % 2 === 0 ? '#3399ff' : '#66b3ff'}`,
              opacity: 0.7,
              pointerEvents: 'none'
            }}
          />
        );
      })}

      {/* Container de l'image */}
      <div
        style={{
          position: 'relative',
          width: '88%',
          height: '88%',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #3399ff',
          boxShadow: isHovered 
            ? '0 0 50px rgba(51, 153, 255, 0.9), inset 0 0 40px rgba(51, 153, 255, 0.3), 0 0 80px rgba(51, 153, 255, 0.5)' 
            : '0 0 30px rgba(51, 153, 255, 0.6), inset 0 0 25px rgba(51, 153, 255, 0.15)',
          transition: 'all 0.4s ease',
          transform: isHovered 
            ? `scale(1.08) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg)` 
            : 'scale(1) rotateY(0deg) rotateX(0deg)',
          zIndex: 10,
          background: 'rgba(0, 20, 40, 0.7)',
          backdropFilter: 'blur(15px)'
        }}
      >
        {!imageError ? (
          <img
            src={imageSrc || 'https://via.placeholder.com/400/0a2540/3399ff?text=Votre+Photo'}
            alt="Profil"
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isHovered ? 'brightness(1.15) contrast(1.15) saturate(1.1)' : 'brightness(1) contrast(1)',
              transition: 'filter 0.4s ease'
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

        {/* Effet holographique */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isHovered
              ? 'linear-gradient(135deg, rgba(51, 153, 255, 0.25) 0%, transparent 50%, rgba(102, 179, 255, 0.25) 100%)'
              : 'linear-gradient(135deg, rgba(51, 153, 255, 0.12) 0%, transparent 50%, rgba(102, 179, 255, 0.12) 100%)',
            pointerEvents: 'none',
            transition: 'all 0.4s ease',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Scan line */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(51, 153, 255, 0.4) 50%, transparent 100%)',
            animation: 'scan 2.5s linear infinite',
            pointerEvents: 'none',
            opacity: isHovered ? 0.7 : 0.4,
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* Rayons lumineux */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'conic-gradient(from 0deg, transparent, rgba(51, 153, 255, 0.1), transparent 30%, transparent)',
              animation: 'rotate 4s linear infinite',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>

      {/* Coins décoratifs */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <div
          key={corner}
          style={{
            position: 'absolute',
            width: '35px',
            height: '35px',
            ...(corner.includes('top') ? { top: '5%' } : { bottom: '5%' }),
            ...(corner.includes('left') ? { left: '5%' } : { right: '5%' }),
            borderColor: '#3399ff',
            borderStyle: 'solid',
            borderWidth: corner.includes('top') && corner.includes('left') ? '4px 0 0 4px' :
                         corner.includes('top') && corner.includes('right') ? '4px 4px 0 0' :
                         corner.includes('bottom') && corner.includes('left') ? '0 0 4px 4px' :
                         '0 4px 4px 0',
            boxShadow: isHovered ? '0 0 25px #3399ff' : '0 0 18px #3399ff',
            animation: isHovered ? 'pulse 1.5s ease-in-out infinite' : 'none',
            opacity: isHovered ? 1 : 0.7,
            transition: 'all 0.3s ease',
            zIndex: 20,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Message au survol */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#3399ff',
          fontSize: '1rem',
          fontWeight: 'bold',
          textAlign: 'center',
          pointerEvents: 'none',
          textShadow: '0 0 15px #3399ff, 0 0 25px #3399ff',
          animation: 'fadeIn 0.3s ease',
          zIndex: 30,
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '0.75rem 2rem',
          borderRadius: '2rem',
          border: '2px solid #3399ff',
          backdropFilter: 'blur(15px)',
          whiteSpace: 'nowrap',
          boxShadow: '0 0 30px rgba(51, 153, 255, 0.5)'
        }}>
          ✨ Salif Ciss ✨
        </div>
      )}
    </div>
  );
});

HolographicImage.displayName = 'HolographicImage';

const CyberpunkGrid = memo(() => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(51, 153, 255, 0.04) 2px, rgba(51, 153, 255, 0.04) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 153, 204, 0.04) 2px, rgba(0, 153, 204, 0.04) 4px)'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(51, 153, 255, 0.12) 50%, transparent 100%)',
        animation: 'scan 5s linear infinite'
      }} />
      
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 250 + 80}px`,
            height: '2px',
            background: Math.random() > 0.5 ? '#3399ff' : '#0099cc',
            animation: `glitch ${Math.random() * 4 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0,
            boxShadow: '0 0 10px currentColor'
          }}
        />
      ))}
    </div>
  );
});

CyberpunkGrid.displayName = 'CyberpunkGrid';

const TimelineItem = memo(({ item, index, isSelected, onSelect }) => {
  const { year, label, icon, color } = item;

  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '2.5rem',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        background: isSelected 
          ? 'rgba(51, 153, 255, 0.15)' 
          : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(15px)',
        border: isSelected 
          ? `3px solid ${color}` 
          : '2px solid rgba(51, 153, 255, 0.3)',
        transform: isSelected ? 'translateX(15px) scale(1.02)' : 'translateX(0) scale(1)',
        boxShadow: isSelected 
          ? `0 0 30px ${color}, inset 0 0 20px rgba(51, 153, 255, 0.2)` 
          : 'none',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        borderRadius: '4px'
      }}
      onClick={() => onSelect(index)}
      onMouseEnter={() => onSelect(index)}
      onMouseLeave={() => onSelect(null)}
    >
      <div style={{
        position: 'absolute',
        left: '-3.3rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '20px',
        background: color,
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        boxShadow: `0 0 20px ${color}`,
        transition: 'all 0.4s ease',
        animation: isSelected ? 'rotate 2s linear infinite' : 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1.75rem', filter: `drop-shadow(0 0 8px ${color})` }}>
          {icon}
        </span>
        <span style={{
          fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
          fontWeight: 900,
          color: color,
          textShadow: `0 0 15px ${color}, 0 0 25px ${color}`,
          fontFamily: 'monospace'
        }}>
          {year}
        </span>
      </div>
      <p style={{
        color: isSelected ? '#ffffff' : 'rgba(102, 179, 255, 0.85)',
        fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
        lineHeight: 1.7,
        transition: 'color 0.3s ease',
        fontWeight: 500,
        margin: 0
      }}>
        {label}
      </p>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

const About3D = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    image: false,
    text: false
  });
  const [isMobile, setIsMobile] = useState(false);

  const timelineItems = useMemo(() => [
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
  ], []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleSections(prev => ({ ...prev, title: true })), 150),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, image: true })), 500),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, text: true })), 850)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleTimelineClick = useCallback((index) => {
    setSelectedTimeline(index);
  }, []);

  const handleDownloadCV = useCallback(() => {
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
      }, 1200);
      
    } catch (error) {
      console.error('❌ Erreur lors du téléchargement:', error);
      setIsDownloading(false);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    }
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes glitch {
          0%, 100% { opacity: 0; transform: translateX(0); }
          50% { opacity: 0.8; transform: translateX(-5px); }
        }

        @keyframes glitchText {
          0%, 100% { transform: translateX(0); }
          14% { transform: translateX(-3px); }
          28% { transform: translateX(3px); }
          42% { transform: translateX(-2px); }
          57% { transform: translateX(2px); }
          71% { transform: translateX(-1px); }
          85% { transform: translateX(1px); }
        }

        @keyframes shimmerLine {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(100%); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes rotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(12px, -12px); }
          50% { transform: translate(-8px, 8px); }
          75% { transform: translate(-12px, -8px); }
        }
      `}</style>

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
          padding: '5rem 2rem',
          overflow: 'hidden',
          width: '100%'
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

        <div style={{ position: 'relative', zIndex: 10, marginBottom: '5rem', width: '100%', maxWidth: '1400px' }}>
          <h2 
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              textAlign: 'center',
              color: '#3399ff',
              textShadow: '0 0 15px #3399ff, 0 0 30px #3399ff, 0 0 45px #66b3ff',
              opacity: visibleSections.title ? 1 : 0,
              transform: visibleSections.title ? 'translateY(0)' : 'translateY(-50px)',
              transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: 'clamp(2px, 1.5vw, 6px)',
              fontFamily: 'monospace',
              position: 'relative',
              marginBottom: '1rem'
            }}
          >
            [ À PROPOS DE MOI ]
            <span style={{
              position: 'absolute',
              inset: 0,
              color: '#66b3ff',
              animation: 'glitchText 4s infinite',
              clipPath: 'inset(0 0 50% 0)',
              opacity: 0.4
            }}>
              [ À PROPOS DE MOI ]
            </span>
          </h2>
          <div style={{
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #3399ff, #66b3ff, #3399ff, transparent)',
            marginTop: '1.5rem',
            animation: 'shimmerLine 3s ease-in-out infinite',
            maxWidth: '700px',
            margin: '1.5rem auto 0',
            boxShadow: '0 0 15px rgba(51, 153, 255, 0.6)'
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(300px, 450px) 1fr',
          alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 4rem)',
          maxWidth: '1400px',
          width: '100%',
          zIndex: 10,
          position: 'relative'
        }}>
          <div 
            style={{
              opacity: visibleSections.image ? 1 : 0,
              transform: visibleSections.image ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-5deg)',
              transition: 'all 1.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <HolographicImage imageSrc="/LOGO1.png" />
          </div>

          <div 
            style={{
              maxWidth: '650px',
              opacity: visibleSections.text ? 1 : 0,
              transform: visibleSections.text ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 1.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <p style={{
              color: '#66b3ff',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
              lineHeight: 2,
              marginBottom: '2rem',
              textShadow: '0 0 8px rgba(102, 179, 255, 0.6)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 500
            }}>
              <span style={{ color: '#3399ff', fontWeight: 'bold', fontSize: '1.5rem' }}>{'> '}</span> 
              Développeur passionné par l'innovation digitale, je conçois des <span style={{ color: '#3399ff', fontWeight: 'bold' }}>solutions web performantes</span> et sur mesure qui allient excellence technique et expérience utilisateur remarquable. De la conception à la mise en production, je transforme des idées en applications <span style={{ color: '#3399ff', fontWeight: 'bold' }}>modernes, évolutives et intuitives</span>.
            </p>

            <p style={{
              color: 'rgba(102, 179, 255, 0.85)',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              lineHeight: 2,
              marginBottom: '2rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              <span style={{ color: '#66b3ff', fontWeight: 'bold', fontSize: '1.3rem' }}>{'> '}</span> 
              Spécialisé dans les technologies <span style={{ color: '#66b3ff', fontWeight: 'bold' }}>front-end et back-end</span> de pointe, je m'engage à créer des interfaces élégantes et des architectures robustes qui répondent aux défis du web d'aujourd'hui.
            </p>

            <div style={{
              position: 'relative',
              paddingLeft: 'clamp(2.5rem, 5vw, 3.5rem)',
              marginTop: '3.5rem'
            }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                top: 0,
                bottom: 0,
                width: '3px',
                background: 'linear-gradient(180deg, #3399ff, #66b3ff, #3399ff)',
                boxShadow: '0 0 15px #3399ff'
              }} />
              
              {timelineItems.map((item, i) => (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={i}
                  isSelected={selectedTimeline === i}
                  onSelect={handleTimelineClick}
                />
              ))}
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginTop: '4rem'
            }}>
              <button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                style={{
                  position: 'relative',
                  padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 2.5rem)',
                  background: isDownloading 
                    ? 'linear-gradient(90deg, #00cc66, #3399ff)' 
                    : 'linear-gradient(90deg, #3399ff, #66b3ff)',
                  color: '#fff',
                  fontWeight: 800,
                  transition: 'all 0.4s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                  boxShadow: '0 0 30px rgba(51, 153, 255, 0.6)',
                  border: 'none',
                  cursor: isDownloading ? 'wait' : 'pointer',
                  opacity: isDownloading ? 0.85 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isDownloading) {
                    e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 0 45px rgba(51, 153, 255, 0.9)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(51, 153, 255, 0.6)';
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>
                  {isDownloading ? '⏳' : '📄'}
                </span>
                <span>
                  {isDownloading ? 'TÉLÉCHARGEMENT...' : 'TÉLÉCHARGER CV'}
                </span>
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 2.5rem)',
                  border: '3px solid #3399ff',
                  color: '#3399ff',
                  background: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 800,
                  textDecoration: 'none',
                  transition: 'all 0.4s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
                  backdropFilter: 'blur(15px)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3399ff';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 0 45px rgba(51, 153, 255, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.color = '#3399ff';
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>✉️</span>
                <span>CONTACT</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About3D;