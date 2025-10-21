import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [matrixRain, setMatrixRain] = useState([]);
  const [waves, setWaves] = useState([]);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const descRef = useRef(null);

  const fullText = "DEDCODE_77";

  // Générer les colonnes de Matrix Rain
  useEffect(() => {
    const columns = 25;
    const rainColumns = Array.from({ length: columns }, (_, i) => ({
      id: i,
      x: (i / columns) * 100,
      delay: Math.random() * 5,
      speed: Math.random() * 3 + 2,
      chars: '01'.split(''),
    }));
    setMatrixRain(rainColumns);
  }, []);

  // Effet de vagues holographiques
  useEffect(() => {
    const waveCount = 5;
    const newWaves = Array.from({ length: waveCount }, (_, i) => ({
      id: i,
      delay: i * 0.8,
    }));
    setWaves(newWaves);
  }, []);

  // Canvas pour effet hexagonal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexagons = [];
    const hexSize = 40;
    const cols = Math.ceil(canvas.width / (hexSize * 1.5)) + 2;
    const rows = Math.ceil(canvas.height / (hexSize * Math.sqrt(3))) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexSize * 1.5;
        const y = row * hexSize * Math.sqrt(3) + (col % 2 ? hexSize * Math.sqrt(3) / 2 : 0);
        hexagons.push({ 
          x, 
          y, 
          opacity: Math.random() * 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      hexagons.forEach(hex => {
        hex.phase += hex.pulseSpeed;
        const currentOpacity = Math.sin(hex.phase) * 0.15 + 0.15;
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const hx = hex.x + hexSize * Math.cos(angle);
          const hy = hex.y + hexSize * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${currentOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      frame++;
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation séquentielle
  useEffect(() => {
    // Apparition titre avec effet de décodage
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "perspective(1000px) rotateX(0deg) translateZ(0)";
        titleRef.current.style.filter = "blur(0)";
      }
    }, 300);

    // Effet de décodage du texte
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;
    const maxIterations = fullText.length;

    const decodeInterval = setInterval(() => {
      setDisplayText(prev => {
        return fullText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return fullText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      if (iterations >= maxIterations) {
        clearInterval(decodeInterval);
        setDisplayText(fullText);
      }

      iterations += 1 / 3;
    }, 50);

    // Description
    setTimeout(() => {
      if (descRef.current) {
        descRef.current.style.opacity = "1";
        descRef.current.style.transform = "translateY(0)";
      }
    }, 2000);

    // Bouton
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.style.opacity = "1";
        buttonRef.current.style.transform = "translateY(0) scale(1)";
      }
    }, 2400);

    return () => clearInterval(decodeInterval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes matrixFall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes waveExpand {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes dataStream {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes hologramFlicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes neonGlow {
          0%, 100% {
            text-shadow:
              0 0 10px #00e5ff,
              0 0 20px #00e5ff,
              0 0 30px #00bcd4,
              0 0 40px #0097a7,
              0 0 70px #00838f,
              0 0 80px #00838f;
          }
          50% {
            text-shadow:
              0 0 5px #00e5ff,
              0 0 10px #00e5ff,
              0 0 15px #00bcd4,
              0 0 20px #0097a7,
              0 0 35px #00838f,
              0 0 40px #00838f;
          }
        }

        .text-holo {
          color: #00e5ff;
          font-weight: 900;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          animation: neonGlow 2s ease-in-out infinite, hologramFlicker 0.1s infinite;
          font-family: 'Courier New', monospace;
        }

        .title-initial {
          opacity: 0;
          transform: perspective(1000px) rotateX(-15deg) translateZ(-50px);
          filter: blur(10px);
          transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .desc-initial {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-initial {
          opacity: 0;
          transform: translateY(30px) scale(0.8);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .matrix-column {
          position: absolute;
          top: 0;
          font-family: 'Courier New', monospace;
          font-size: 20px;
          color: #00e5ff;
          opacity: 0.4;
          pointer-events: none;
        }

        .hologram-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          border: 2px solid rgba(0, 229, 255, 0.5);
          border-radius: 50%;
          animation: waveExpand 3s ease-out infinite;
        }

        .data-stream {
          position: absolute;
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 229, 255, 0.8) 50%, 
            transparent
          );
          animation: dataStream 3s linear infinite;
          pointer-events: none;
        }

        .corner-decoration {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid rgba(0, 229, 255, 0.5);
          pointer-events: none;
        }

        .corner-tl {
          top: 20px;
          left: 20px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: 20px;
          right: 20px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: 20px;
          left: 20px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: 20px;
          right: 20px;
          border-left: none;
          border-top: none;
        }

        .cyber-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent,
            rgba(0, 229, 255, 0.8),
            transparent
          );
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }

        .btn-cyber {
          position: relative;
          overflow: hidden;
          clip-path: polygon(
            10px 0, 
            calc(100% - 10px) 0, 
            100% 10px, 
            100% calc(100% - 10px), 
            calc(100% - 10px) 100%, 
            10px 100%, 
            0 calc(100% - 10px), 
            0 10px
          );
        }

        .btn-cyber::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          transition: left 0.5s;
        }

        .btn-cyber:hover::before {
          left: 100%;
        }
      `}</style>

      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden">
        {/* Canvas hexagonal */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-30"
        />

        {/* Coins décoratifs */}
        <div className="corner-decoration corner-tl" />
        <div className="corner-decoration corner-tr" />
        <div className="corner-decoration corner-bl" />
        <div className="corner-decoration corner-br" />

        {/* Lignes de données */}
        <div className="data-stream" style={{ top: '20%' }} />
        <div className="data-stream" style={{ top: '80%', animationDelay: '1.5s' }} />

        {/* Matrix rain */}
        {matrixRain.map((col) => (
          <div
            key={col.id}
            className="matrix-column"
            style={{
              left: `${col.x}%`,
              animation: `matrixFall ${col.speed}s linear ${col.delay}s infinite`,
            }}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{ opacity: 1 - i * 0.07 }}>
                {col.chars[Math.floor(Math.random() * col.chars.length)]}
              </div>
            ))}
          </div>
        ))}

        {/* Vagues holographiques */}
        {waves.map((wave) => (
          <div
            key={wave.id}
            className="hologram-wave"
            style={{ animationDelay: `${wave.delay}s` }}
          />
        ))}

        {/* Contenu principal */}
        <div className="relative z-10">
          <h1
            ref={titleRef}
            className="title-initial text-6xl md:text-9xl font-extrabold select-none mb-4"
          >
            <div className="text-white tracking-wider mb-2 text-2xl md:text-3xl font-light opacity-70">
              &lt;INITIALISATION_SYSTÈME&gt;
            </div>
            <span className="text-holo block">
              {displayText || "DEDCODE_77"}
            </span>
            <div className="text-white tracking-wider mt-2 text-2xl md:text-3xl font-light opacity-70">
              &lt;/CONNEXION_ÉTABLIE&gt;
            </div>
          </h1>

          <div 
            className="cyber-line w-64 md:w-96 mx-auto my-8"
          />

          <p 
            ref={descRef}
            className="desc-initial max-w-2xl text-base md:text-xl font-light text-cyan-300 tracking-wide leading-relaxed px-4"
          >
            <span className="text-cyan-400 font-mono text-sm">[STATUS: ONLINE]</span>
            <br />
            Développeur full-stack spécialisé dans la création d’applications web performantes et évolutives.
            <br />
           Passionné par l’innovation et l’optimisation des interfaces utilisateur.
          </p>

          <button
            ref={buttonRef}
            className="btn-initial btn-cyber mt-12 px-10 py-4 font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:shadow-[0_0_50px_rgba(0,229,255,0.8)] transition-all duration-300 hover:scale-105 border-2 border-cyan-400/50"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 tracking-wider font-mono">
              [ ACCÉDER_AUX_PROJETS ]
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;