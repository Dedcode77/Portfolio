import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);

  const terminalSequence = [
    { text: "$ initializing_system...", delay: 0 },
    { text: "> loading_profile_data...", delay: 800 },
    { text: "> verifying_credentials...", delay: 1600 },
    { text: "✓ authentication_successful", delay: 2400 },
    { text: "$ whoami", delay: 3200 },
  ];

  const fullName = "SALIF CISS";

  // Génération des points de connexion
  useEffect(() => {
    const newDots = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));
    setDots(newDots);

    const interval = setInterval(() => {
      setDots(prev => prev.map(dot => ({
        ...dot,
        x: (dot.x + dot.speedX + 100) % 100,
        y: (dot.y + dot.speedY + 100) % 100,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animation du terminal
  useEffect(() => {
    terminalSequence.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line.text]);
        setCurrentLine(index);
      }, line.delay);
    });

    // Animation du nom après le terminal
    setTimeout(() => {
      let i = 0;
      const nameInterval = setInterval(() => {
        if (i <= fullName.length) {
          setDisplayName(fullName.slice(0, i));
          i++;
        } else {
          clearInterval(nameInterval);
        }
      }, 100);
    }, 3800);
  }, []);

  // Canvas pour les lignes de connexion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner les lignes entre points proches
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 15) {
            ctx.beginPath();
            ctx.moveTo((dots[i].x / 100) * canvas.width, (dots[i].y / 100) * canvas.height);
            ctx.lineTo((dots[j].x / 100) * canvas.width, (dots[j].y / 100) * canvas.height);
            ctx.strokeStyle = `rgba(51, 153, 255, ${0.3 - distance / 50})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dots]);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes holoPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(51, 153, 255, 0.5),
                        inset 0 0 20px rgba(51, 153, 255, 0.2);
          }
          50% { 
            box-shadow: 0 0 40px rgba(51, 153, 255, 0.8),
                        inset 0 0 40px rgba(51, 153, 255, 0.4);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(51, 153, 255, 0.8),
              0 0 20px rgba(51, 153, 255, 0.6),
              0 0 30px rgba(51, 153, 255, 0.4),
              0 0 40px rgba(51, 153, 255, 0.2);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(51, 153, 255, 1),
              0 0 30px rgba(51, 153, 255, 0.8),
              0 0 40px rgba(51, 153, 255, 0.6),
              0 0 60px rgba(51, 153, 255, 0.4);
          }
        }

        .terminal-line {
          animation: slideUp 0.3s ease-out;
        }

        .cursor {
          animation: blink 1s step-end infinite;
        }

        .hero-content {
          animation: fadeIn 1s ease-out 4s both;
        }

        .dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #3399ff;
          border-radius: 50%;
          box-shadow: 0 0 10px #3399ff;
          transition: all 0.3s;
        }

        .scanline {
          position: absolute;
          width: 100%;
          height: 3px;
          background: linear-gradient(transparent, #3399ff 50%, transparent);
          box-shadow: 0 0 20px #3399ff;
          animation: scanline 8s linear infinite;
          opacity: 0.3;
        }

        .holo-border {
          position: relative;
          padding: 1rem 2.5rem;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid #3399ff;
          clip-path: polygon(
            0 0, calc(100% - 20px) 0, 100% 20px,
            100% 100%, 20px 100%, 0 calc(100% - 20px)
          );
          animation: holoPulse 3s ease-in-out infinite;
          transition: all 0.3s;
        }

        .holo-border:hover {
          background: rgba(51, 153, 255, 0.2);
          transform: translateY(-5px);
        }

        .grid-line {
          position: absolute;
          background: rgba(51, 153, 255, 0.1);
        }

        .bracket {
          display: inline-block;
          color: #3399ff;
          font-size: 1.2em;
          margin: 0 0.5rem;
          animation: textGlow 2s ease-in-out infinite;
        }
      `}</style>

      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        overflow: 'hidden'
      }}>
        {/* Canvas pour lignes de connexion */}
        <canvas 
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none'
          }}
        />

        {/* Scanline effet */}
        <div className="scanline" />

        {/* Grille de fond */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line"
            style={{
              width: '100%',
              height: '1px',
              top: `${i * 5}%`,
              left: 0
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line"
            style={{
              width: '1px',
              height: '100%',
              left: `${i * 5}%`,
              top: 0
            }}
          />
        ))}

        {/* Points de connexion */}
        {dots.map((dot, i) => (
          <div
            key={i}
            className="dot"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`
            }}
          />
        ))}

        {/* Contenu principal */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          padding: '0 2rem'
        }}>
          {/* Terminal */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid #3399ff',
            borderRadius: '10px',
            padding: '2rem',
            marginBottom: '4rem',
            fontFamily: 'monospace',
            boxShadow: '0 0 40px rgba(51, 153, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Barre du terminal */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #3399ff'
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: 'auto', color: '#66b3ff', fontSize: '0.875rem' }}>
                terminal@dedcode77
              </span>
            </div>

            {/* Lignes du terminal */}
            <div style={{ minHeight: '120px' }}>
              {terminalLines.map((line, i) => (
                <div 
                  key={i}
                  className="terminal-line"
                  style={{
                    color: line.includes('✓') ? '#27c93f' : '#3399ff',
                    marginBottom: '0.5rem',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  {line}
                </div>
              ))}
              {currentLine === terminalSequence.length - 1 && (
                <span className="cursor" style={{ color: '#3399ff' }}>▊</span>
              )}
            </div>
          </div>

          {/* Nom principal */}
          {displayName && (
            <div className="hero-content" style={{ textAlign: 'center' }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 900,
                color: '#3399ff',
                fontFamily: 'monospace',
                marginBottom: '2rem',
                letterSpacing: '0.2em',
                animation: 'textGlow 2s ease-in-out infinite'
              }}>
                <span className="bracket">[</span>
                {displayName}
                <span className="bracket">]</span>
              </h1>

              {/* Sous-titre */}
              <div style={{
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                color: '#66b3ff',
                marginBottom: '1rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontFamily: 'monospace'
              }}>
                {'>'} Développeur Full-Stack {'<'}
              </div>

              {/* Description */}
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                color: 'rgba(102, 179, 255, 0.8)',
                maxWidth: '700px',
                margin: '0 auto 3rem',
                lineHeight: 1.8,
                fontFamily: 'system-ui'
              }}>
                Architecte de solutions digitales innovantes.
                <br />
                Spécialiste React • Node.js • Cloud Architecture
              </p>

              {/* Boutons */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  className="holo-border"
                  style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    border: '2px solid #3399ff'
                  }}
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {'>> '} Projets
                  </span>
                </button>

                <button
                  className="holo-border"
                  style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    border: '2px solid #3399ff'
                  }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {'>> '} Contact
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: '3rem',
                justifyContent: 'center',
                marginTop: '4rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { label: 'Projets', value: '50+' },
                  { label: 'Années Exp.', value: '3+' },
                  { label: 'Technologies', value: '20+' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '1rem 2rem',
                    background: 'rgba(51, 153, 255, 0.1)',
                    border: '1px solid #3399ff',
                    borderRadius: '5px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: '#3399ff',
                      fontFamily: 'monospace',
                      marginBottom: '0.25rem'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#66b3ff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Effet vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
          pointerEvents: 'none'
        }} />
      </section>
    </>
  );
};

export default Hero;