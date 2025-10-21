import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

// Composant Canvas 3D avec Three.js
const ThreeCube = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);
  const glowCubeRef = useRef(null);
  const rendererRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(3, 3, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0x7c1fff, 0.5);
    spotLight.position.set(-5, 5, 5);
    scene.add(spotLight);

    // Cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../assets/boliviainteligente-AgSZuXX3GCU-unsplash.jpg');
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.8,
      roughness: 0.2
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cubeRef.current = cube;
    scene.add(cube);

    // Glow cube
    const glowGeometry = new THREE.BoxGeometry(2.15, 2.15, 2.15);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c1fff,
      transparent: true,
      opacity: 0
    });
    const glowCube = new THREE.Mesh(glowGeometry, glowMaterial);
    glowCubeRef.current = glowCube;
    scene.add(glowCube);

    // Animation
    let autoRotate = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      cube.rotation.y = time * 0.3 + autoRotate;
      cube.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      if (isHovered) {
        cube.rotation.z = Math.sin(time * 4) * 0.05;
        const scale = 1 + Math.sin(time * 2) * 0.025;
        cube.scale.set(scale, scale, scale);
        glowMaterial.opacity = 0.15;
      } else {
        cube.scale.set(1, 1, 1);
        glowMaterial.opacity = 0;
      }
      
      glowCube.rotation.copy(cube.rotation);
      glowCube.scale.copy(cube.scale);
      
      autoRotate += 0.005;
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, [isHovered]);

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '400px', height: '400px', cursor: isHovered ? 'pointer' : 'auto' }}
    />
  );
};

const timelineItems = [
  { 
    year: "2021", 
    label: "Début stage chez Volkeno - Développeur Frontend",
    icon: "💻"
  },
  { 
    year: "2024", 
    label: "Debut chez IBMS - Responsable IT / Developpeur Full Stack",
    icon: "🚀"
  },
];

// Particules optimisées
const ParticlesBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, #7c1fff 0%, transparent 70%)',
            borderRadius: '50%',
            animation: `floatParticle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const About3D = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    cube: false,
    text: false
  });

  useEffect(() => {
    // Animation d'apparition progressive
    setTimeout(() => setVisibleSections(prev => ({ ...prev, title: true })), 100);
    setTimeout(() => setVisibleSections(prev => ({ ...prev, cube: true })), 300);
    setTimeout(() => setVisibleSections(prev => ({ ...prev, text: true })), 500);
  }, []);

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
        background: 'linear-gradient(135deg, #000000 0%, #1e1b4b 50%, #581c87 100%)',
        color: 'white',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}
    >
      <ParticlesBackground />

      {/* Titre */}
      <h2 
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: '4rem',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #818cf8, #c084fc, #f472b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          zIndex: 10,
          position: 'relative',
          opacity: visibleSections.title ? 1 : 0,
          transform: visibleSections.title ? 'translateY(0)' : 'translateY(-50px)',
          transition: 'all 1s ease-out'
        }}
      >
        À propos de moi
      </h2>

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
        {/* Canvas 3D */}
        <div 
          style={{
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(126, 34, 206, 0.3))',
            borderRadius: '1rem',
            boxShadow: '0 20px 60px rgba(124, 31, 255, 0.3)',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(124, 31, 255, 0.3)',
            opacity: visibleSections.cube ? 1 : 0,
            transform: visibleSections.cube ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 1s ease-out 0.2s'
          }}
        >
          <ThreeCube />
        </div>

        {/* Contenu textuel */}
        <div 
          style={{
            maxWidth: '600px',
            flex: 1,
            opacity: visibleSections.text ? 1 : 0,
            transform: visibleSections.text ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 1s ease-out 0.4s'
          }}
        >
          <p style={{
            color: '#c7d2fe',
            fontSize: '1.125rem',
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>
            Développeur passionné par l'innovation digitale, je conçois des solutions web performantes et sur mesure qui allient excellence technique et expérience utilisateur remarquable. De la conception à la mise en production, je transforme des idées en applications modernes, scalables et intuitives.
          </p>

          <p style={{
            color: 'rgba(199, 210, 254, 0.9)',
            fontSize: '1rem',
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>
            Spécialisé dans les technologies front-end et back-end de pointe, je m'engage à créer des interfaces élégantes et des architectures robustes qui répondent aux défis du web d'aujourd'hui. Chaque projet est une opportunité d'explorer de nouvelles approches et de repousser les limites du possible.
          </p>

          {/* Timeline */}
          <div style={{
            position: 'relative',
            paddingLeft: '3rem',
            marginTop: '3rem'
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(180deg, #4f46e5, #7c3aed, #ec4899)'
            }} />
            
            {timelineItems.map(({ year, label, icon }, i) => (
              <div
                key={year}
                style={{
                  position: 'relative',
                  marginBottom: '2rem',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: selectedTimeline === i ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
                  backdropFilter: selectedTimeline === i ? 'blur(10px)' : 'none',
                  border: selectedTimeline === i ? '1px solid rgba(124, 31, 255, 0.3)' : '1px solid transparent'
                }}
                onClick={() => alert(`${year}: ${label}`)}
                onMouseEnter={() => setSelectedTimeline(i)}
                onMouseLeave={() => setSelectedTimeline(null)}
              >
                {/* Point de timeline */}
                <div style={{
                  position: 'absolute',
                  left: '-3.25rem',
                  top: '50%',
                  transform: selectedTimeline === i ? 'translateY(-50%) scale(1.5)' : 'translateY(-50%) scale(1)',
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedTimeline === i ? '0 0 20px rgba(124, 31, 255, 0.6)' : 'none',
                  zIndex: 2
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: 'white',
                    borderRadius: '50%'
                  }} />
                </div>

                {/* Pulse effect */}
                {selectedTimeline === i && (
                  <div style={{
                    position: 'absolute',
                    left: '-3.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '24px',
                    height: '24px',
                    background: '#818cf8',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s ease-out infinite',
                    pointerEvents: 'none'
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #818cf8, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {year}
                  </span>
                </div>
                <p style={{
                  color: selectedTimeline === i ? 'white' : '#c7d2fe',
                  fontSize: '1rem',
                  transition: 'color 0.3s ease'
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Boutons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '3rem'
          }}>
            <a
              href="/src/assets/CV_Salif_Ciss (2).pdf"
              download
              style={{
                position: 'relative',
                padding: '1rem 2rem',
                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                borderRadius: '9999px',
                fontWeight: 600,
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 31, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>📄 Télécharger mon CV</span>
            </a>
            <a
              href="#contact"
              style={{
                padding: '1rem 2rem',
                border: '2px solid #4f46e5',
                borderRadius: '9999px',
                fontWeight: 600,
                color: '#c7d2fe',
                background: 'transparent',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4f46e5';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#c7d2fe';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✉️ Me contacter
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(10px, -20px);
            opacity: 0.8;
          }
        }

        @keyframes pulse {
          0% {
            transform: translateY(-50%) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About3D;