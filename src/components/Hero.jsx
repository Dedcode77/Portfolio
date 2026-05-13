import React, { useEffect, useRef, useState } from "react";

const Hero = () => {
  const canvasRef = useRef(null);
  const [isWarping, setIsWarping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const starCount = 700;
    let stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * canvas.width,
      px: 0,
      py: 0
    }));

    const draw = () => {
      ctx.fillStyle = isWarping ? "rgba(0, 8, 20, 0.2)" : "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= isWarping ? 30 : 3;

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

        star.px = sx;
        star.py = sy;
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping]);

  return (
    <section 
      className={`hero-warp ${isWarping ? 'active' : ''}`}
      onMouseDown={() => setIsWarping(true)}
      onMouseUp={() => setIsWarping(false)}
      onMouseLeave={() => setIsWarping(false)}
    >
      {/* Import des polices via Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=JetBrains+Mono:wght@300;500&display=swap');

        .hero-warp {
          height: 100vh;
          width: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          cursor: crosshair;
        }

        .canvas-bg { position: absolute; inset: 0; }

        .content-overlay {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 800px;
          padding: 0 20px;
          pointer-events: none;
          transition: transform 0.15s ease-out;
        }

        .main-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.5rem, 12vw, 9rem);
          font-weight: 800;
          color: white;
          margin: 0;
          line-height: 1;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .active .main-name {
          color: #00f2ff;
          text-shadow: 0 0 40px rgba(0, 242, 255, 0.6);
          letter-spacing: 0.05em;
          transform: scale(0.98);
        }

        .description {
          font-family: 'JetBrains Mono', monospace;
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          line-height: 1.6;
          margin-top: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          transition: opacity 0.3s;
        }

        .active .description { opacity: 0.3; }

        .highlight {
          color: #00f2ff;
          font-weight: 500;
        }

        .instruction {
          position: absolute;
          bottom: 40px;
          font-family: 'JetBrains Mono', monospace;
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          padding: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          transition: 0.3s;
        }

        .active .instruction { opacity: 0; }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.9) 100%);
          pointer-events: none;
          z-index: 5;
        }
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
          Je conçois des solutions robustes et esthétiques, guidé par une philosophie 
          <span className="highlight"> build-to-learn</span> constante.
        </p>
      </div>

      <div className="instruction">
        Hold to travel through code
      </div>
    </section>
  );
};

export default Hero;