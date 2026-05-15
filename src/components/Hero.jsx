import React, { useEffect, useRef, useState } from "react";

const Hero = () => {
  const canvasRef = useRef(null);
  const [isWarping, setIsWarping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // Utiliser un useRef pour les étoiles permet de garder leurs positions 
  // même quand isWarping change, évitant le "saut" visuel.
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Initialisation ou mise à jour des étoiles après le resize
      initStars();
    };

    const initStars = () => {
      const starCount = 700;
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        px: 0,
        py: 0
      }));
    };

    const draw = () => {
      // On utilise isWarping directement ici grâce à la fermeture (closure)
      ctx.fillStyle = isWarping ? "rgba(0, 8, 20, 0.2)" : "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      starsRef.current.forEach((star) => {
        // Vitesse ajustée selon l'état
        star.z -= isWarping ? 25 : 2;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.px = (star.x / star.z) * cx + cx;
          star.py = (star.y / star.z) * cy + cy;
        }

        const sx = (star.x / star.z) * cx + cx;
        const sy = (star.y / star.z) * cy + cy;
        const size = (1 - star.z / canvas.width) * 2;

        if (star.px !== 0) { // Éviter de dessiner le premier saut
          ctx.beginPath();
          if (isWarping) {
            ctx.strokeStyle = `rgba(0, 242, 255, ${1 - star.z / canvas.width})`;
            ctx.lineWidth = size * 1.5;
            ctx.moveTo(sx, sy);
            ctx.lineTo(star.px, star.py);
            ctx.stroke();
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - star.z / canvas.width})`;
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        star.px = sx;
        star.py = sy;
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    handleResize(); // Définit la taille initiale et crée les étoiles
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping]); // Garder isWarping ici pour que la fonction draw() accède à la valeur à jour

  return (
    <section 
      className={`hero-warp ${isWarping ? 'active' : ''}`}
      onMouseDown={() => setIsWarping(true)}
      onMouseUp={() => setIsWarping(false)}
      onMouseLeave={() => setIsWarping(false)}
      onTouchStart={() => setIsWarping(true)} // Support Mobile
      onTouchEnd={() => setIsWarping(false)}   // Support Mobile
    >
      {/* ... Le reste de ton CSS et HTML est parfait ... */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=JetBrains+Mono:wght@300;500&display=swap');
        .hero-warp { height: 100vh; width: 100%; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; cursor: crosshair; }
        .canvas-bg { position: absolute; inset: 0; }
        .content-overlay { position: relative; z-index: 10; text-align: center; max-width: 800px; padding: 0 20px; pointer-events: none; transition: transform 0.1s ease-out; }
        .main-name { font-family: 'Syne', sans-serif; font-size: clamp(3rem, 10vw, 8rem); font-weight: 800; color: white; margin: 0; line-height: 1; text-transform: uppercase; transition: all 0.4s ease; }
        .active .main-name { color: #00f2ff; text-shadow: 0 0 30px rgba(0, 242, 255, 0.6); transform: scale(0.95); }
        .description { font-family: 'JetBrains Mono', monospace; color: rgba(255, 255, 255, 0.7); font-size: clamp(0.8rem, 1.5vw, 1rem); margin-top: 20px; max-width: 500px; margin-left: auto; margin-right: auto; }
        .highlight { color: #00f2ff; }
        .instruction { position: absolute; bottom: 40px; font-family: 'JetBrains Mono', monospace; color: rgba(255, 255, 255, 0.3); font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase; }
        .vignette { position: absolute; inset: 0; background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%); pointer-events: none; z-index: 5; }
      `}</style>

      <canvas ref={canvasRef} className="canvas-bg" />
      <div className="vignette" />

      <div 
        className="content-overlay"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <h1 className="main-name">SALIF CISS</h1>
        <p className="description">
          Développeur <span className="highlight">Full-Stack MERN</span> & Designer Digital. 
          Je conçois des solutions robustes, guidé par une philosophie 
          <span className="highlight"> build-to-learn</span>.
        </p>
      </div>

      <div className="instruction">Hold to travel</div>
    </section>
  );
};

export default Hero;