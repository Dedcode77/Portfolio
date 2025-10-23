import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import * as THREE from "three";

// Composant Canvas 3D avec effet holographique
const HolographicCube = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cubeGroupRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    rendererRef.current = renderer;
    renderer.setSize(400, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;
    scene.add(cubeGroup);

    const ambientLight = new THREE.AmbientLight(0x00ffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff00ff, 2, 20);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 2, 20);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4169e1,
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.7,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      reflectivity: 1
    });
    
    const cube = new THREE.Mesh(geometry, material);
    cubeGroup.add(cube);

    const wireframeGeo = new THREE.EdgesGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      linewidth: 2,
      transparent: true,
      opacity: 0.8
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    wireframe.scale.setScalar(1.02);
    cubeGroup.add(wireframe);

    const innerGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const innerCube = new THREE.Mesh(innerGeo, innerMat);
    cubeGroup.add(innerCube);

    const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const spheres = [];
    const colors = [0xff00ff, 0x00ffff, 0xff00aa, 0x00aaff];
    
    for (let i = 0; i < 4; i++) {
      const sphereMat = new THREE.MeshBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.9
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      spheres.push(sphere);
      cubeGroup.add(sphere);
    }

    const gridHelper = new THREE.GridHelper(20, 20, 0x00ffff, 0xff00ff);
    gridHelper.position.y = -3;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    scene.add(gridHelper);

    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors_arr = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      const color = Math.random() > 0.5 ? new THREE.Color(0xff00ff) : new THREE.Color(0x00ffff);
      colors_arr[i * 3] = color.r;
      colors_arr[i * 3 + 1] = color.g;
      colors_arr[i * 3 + 2] = color.b;
    }
    
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors_arr, 3));
    
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const clock = new THREE.Clock();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (isHovered) {
        const targetRotationY = mouseRef.current.x * 0.5;
        const targetRotationX = mouseRef.current.y * 0.5;
        cubeGroup.rotation.y += (targetRotationY - cubeGroup.rotation.y) * 0.1;
        cubeGroup.rotation.x += (targetRotationX - cubeGroup.rotation.x) * 0.1;
      } else {
        cubeGroup.rotation.y += 0.01;
        cubeGroup.rotation.x = Math.sin(time * 0.3) * 0.1;
      }

      innerCube.rotation.x = time * 1.5;
      innerCube.rotation.y = time * 2;
      innerCube.rotation.z = time * 1.2;

      wireframe.rotation.x = -time * 0.5;
      wireframe.rotation.y = -time * 0.3;

      spheres.forEach((sphere, i) => {
        const angle = time + (i * Math.PI * 0.5);
        const radius = 3;
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.y = Math.sin(angle * 2) * radius * 0.5;
        sphere.position.z = Math.sin(angle) * radius;
        
        const scale = 1 + Math.sin(time * 3 + i) * 0.3;
        sphere.scale.setScalar(scale);
      });

      particles.rotation.y = time * 0.05;
      const positionsAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsAttr.array[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
      }
      positionsAttr.needsUpdate = true;

      if (isHovered) {
        material.opacity = 0.9;
        wireframeMat.opacity = 1;
        cube.scale.setScalar(1 + Math.sin(time * 4) * 0.03);
      } else {
        material.opacity += (0.7 - material.opacity) * 0.1;
        wireframeMat.opacity += (0.8 - wireframeMat.opacity) * 0.1;
        cube.scale.setScalar(cube.scale.x + (1 - cube.scale.x) * 0.1);
      }

      pointLight1.intensity = 2 + Math.sin(time * 2) * 0.5;
      pointLight2.intensity = 2 + Math.cos(time * 2) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      sphereGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isHovered]);

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        width: '400px', 
        height: '400px', 
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#00ffff',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          pointerEvents: 'none',
          textShadow: '0 0 10px #00ffff',
          animation: 'fadeIn 0.3s ease',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid #00ffff'
        }}>
          Déplacez la souris
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
    color: "#00ffff"
  },
  { 
    year: "2024", 
    label: "Début chez IBMS - Responsable IT / Développeur Full Stack",
    icon: "🚀",
    color: "#ff00ff"
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
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 0, 255, 0.03) 2px, rgba(255, 0, 255, 0.03) 4px)'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)',
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
            background: Math.random() > 0.5 ? '#00ffff' : '#ff00ff',
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
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    cube: false,
    text: false
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleSections(prev => ({ ...prev, title: true })), 100),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, cube: true })), 400),
      setTimeout(() => setVisibleSections(prev => ({ ...prev, text: true })), 700)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleTimelineClick = useCallback((index, year, label) => {
    setSelectedTimeline(index);
    alert(`${year}: ${label}`);
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
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #001a33 100%)',
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
            color: '#00ffff',
            textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #ff00ff',
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
            color: '#ff00ff',
            animation: 'glitchText 3s infinite',
            clipPath: 'inset(0 0 50% 0)'
          }}>
            À PROPOS DE MOI
          </span>
        </h2>
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent)',
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
            opacity: visibleSections.cube ? 1 : 0,
            transform: visibleSections.cube ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
            <div
              key={corner}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                ...(corner.includes('top') ? { top: '-10px' } : { bottom: '-10px' }),
                ...(corner.includes('left') ? { left: '-10px' } : { right: '-10px' }),
                borderColor: '#00ffff',
                borderStyle: 'solid',
                borderWidth: corner.includes('top') && corner.includes('left') ? '2px 0 0 2px' :
                             corner.includes('top') && corner.includes('right') ? '2px 2px 0 0' :
                             corner.includes('bottom') && corner.includes('left') ? '0 0 2px 2px' :
                             '0 2px 2px 0',
                boxShadow: '0 0 10px #00ffff',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
          ))}
          
          <div style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            background: 'rgba(0, 20, 40, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            boxShadow: 'inset 0 0 50px rgba(0, 255, 255, 0.1), 0 0 50px rgba(255, 0, 255, 0.2)'
          }}>
            <HolographicCube />
          </div>
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
            color: '#00ffff',
            fontSize: '1.125rem',
            lineHeight: 1.9,
            marginBottom: '1.5rem',
            textShadow: '0 0 5px rgba(0, 255, 255, 0.5)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>{'>'}</span> Développeur passionné par l'innovation digitale, je conçois des solutions web performantes et sur mesure qui allient excellence technique et expérience utilisateur remarquable. De la conception à la mise en production, je transforme des idées en applications modernes, scalables et intuitives.
          </p>

          <p style={{
            color: 'rgba(0, 255, 255, 0.8)',
            fontSize: '1rem',
            lineHeight: 1.9,
            marginBottom: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>{'>'}</span> Spécialisé dans les technologies front-end et back-end de pointe, je m'engage à créer des interfaces élégantes et des architectures robustes qui répondent aux défis du web d'aujourd'hui.
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
              background: 'linear-gradient(180deg, #00ffff, #ff00ff)',
              boxShadow: '0 0 10px #00ffff'
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
                    ? 'rgba(0, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: selectedTimeline === i 
                    ? `2px solid ${color}` 
                    : '1px solid rgba(0, 255, 255, 0.2)',
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
                  color: selectedTimeline === i ? '#ffffff' : 'rgba(0, 255, 255, 0.8)',
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
            <a
              href="/src/assets/CV_Salif_Ciss (2).pdf"
              download
              style={{
                position: 'relative',
                padding: '1rem 2rem',
                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                color: '#000',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'monospace',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
              }}
            >
              <span>📄 TÉLÉCHARGER CV</span>
            </a>
            <a
              href="#contact"
              style={{
                padding: '1rem 2rem',
                border: '2px solid #00ffff',
                color: '#00ffff',
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
                e.currentTarget.style.background = '#00ffff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                e.currentTarget.style.color = '#00ffff';
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
      `}</style>
    </section>
  );
};

export default About3D;