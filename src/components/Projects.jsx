import { useState } from "react";

const allProjects = [
  {
    title: "Système intelligent d'école",
    description: "Plateforme IA pour la gestion prédictive des absences, notes et performances avec analyse en temps réel.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    stack: ["React", "Django", "Tailwind CSS"],
    color: "#3399ff",
    demo: "#",
    code: "#",
    // impact: "2500+ étudiants",
    status: "Production"
  },
  {
    title: "Création et Gestion formulaires IA",
    description: "Générateur intelligent de formulaires avec validation automatique et analyse des réponses par IA.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    stack: ["next js", ""],
    color: "#cc00ff",
    demo: "#",
    code: "#",
    // impact: "50k formulaires/mois",
    status: "Production"
  },
  {
    title: "E-learning immersif 3D",
    description: "Expérience d'apprentissage 3D avec avatars personnalisables, suivi en temps réel et évaluation automatique.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    stack: ["React", "Firebase"],
    color: "#00cc66",
    demo: "#",
    code: "#",
    impact: "",
    status: "Beta"
  },
  // {
  //   title: "Plateforme collaborative",
  //   description: "Espace de travail collaboratif avec visioconférence intégrée et tableau blanc interactif.",
  //   image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  //   stack: ["React", "Firebase"],
  //   color: "#ff6600",
  //   demo: "#",
  //   code: "#",
  //   impact: "300+ équipes",
  //   status: "Production"
  // },
  // {
  //   title: "Assistant mobile vocal",
  //   description: "App Flutter avec commandes vocales IA pour gérer les tâches éducatives à distance et planification intelligente.",
  //   image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  //   stack: ["Flutter", "Firebase"],
  //   color: "#ff0099",
  //   demo: "#",
  //   code: "#",
  //   impact: "4.8★ sur stores",
  //   status: "Production"
  // },
  {
    title: "Dashboard Analytics",
    description: "Tableau de bord avancé avec visualisations interactives et prédictions ML pour insights éducatifs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    stack: ["React", "Django", "Tailwind CSS"],
    color: "#ffaa00",
    demo: "#",
    code: "#",
    // impact: "1M+ data points",
    status: "Production"
  }
];

const stacks = ["Tous", "React", "Django", "Flutter", "Firebase", "Tailwind CSS"];

const Projects = () => {
  const [selectedStack, setSelectedStack] = useState("Tous");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const filteredProjects = selectedStack === "Tous"
    ? allProjects
    : allProjects.filter(project => project.stack.includes(selectedStack));

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3399ff, transparent);
          box-shadow: 0 0 20px #3399ff;
          animation: scan 8s linear infinite;
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>

      <section 
        id="projects"
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #001a2e 0%, #002a3a 50%, #001520 100%)',
          padding: '5rem 1rem',
          overflow: 'hidden'
        }}
      >
        {/* Scan lines */}
        <div className="scan-line" />
        <div className="scan-line" style={{ animationDelay: '4s' }} />

        {/* Grille de fond */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              top: `${i * 5}%`,
              left: 0,
              background: 'rgba(51, 153, 255, 0.05)'
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: 'absolute',
              width: '1px',
              height: '100%',
              left: `${i * 5}%`,
              top: 0,
              background: 'rgba(51, 153, 255, 0.05)'
            }}
          />
        ))}

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid #3399ff',
              borderRadius: '20px',
              marginBottom: '1.5rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: '#66b3ff'
            }}>
              <span>🚀</span>
              <span>INNOVATIONS_&_CRÉATIONS</span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              fontFamily: 'monospace'
            }}>
              <span style={{
                display: 'block',
                color: 'white',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
              }}>
                PORTFOLIO
              </span>
              <span style={{
                display: 'block',
                color: '#3399ff',
                textShadow: '0 0 30px rgba(51, 153, 255, 0.8)',
                letterSpacing: '0.1em'
              }}>
                [ CRÉATIF ]
              </span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(102, 179, 255, 0.8)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Découvrez mes projets qui repoussent les limites de la technologie
            </p>
          </div>

          {/* Filtres */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '4rem'
          }}>
            {stacks.map((stack) => (
              <button
                key={stack}
                onClick={() => setSelectedStack(stack)}
                style={{
                  position: 'relative',
                  padding: '0.75rem 1.5rem',
                  background: selectedStack === stack 
                    ? 'linear-gradient(135deg, #3399ff, #0099cc)' 
                    : 'rgba(0, 0, 0, 0.6)',
                  border: `2px solid ${selectedStack === stack ? '#3399ff' : 'rgba(51, 153, 255, 0.3)'}`,
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  transform: selectedStack === stack ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedStack === stack ? '0 0 30px rgba(51, 153, 255, 0.5)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedStack !== stack) {
                    e.currentTarget.style.background = 'rgba(51, 153, 255, 0.2)';
                    e.currentTarget.style.borderColor = '#3399ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedStack !== stack) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.3)';
                  }
                }}
              >
                {stack}
              </button>
            ))}
          </div>

          {/* Projets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: `2px solid ${hoveredCard === index ? project.color : 'rgba(51, 153, 255, 0.3)'}`,
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.5s',
                  transform: hoveredCard === index ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredCard === index ? `0 20px 60px ${project.color}40` : 'none',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
                  gap: 0
                }}>
                  {/* Image */}
                  <div style={{
                    position: 'relative',
                    height: '320px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.7s, filter 0.7s',
                        transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                        filter: hoveredCard === index ? 'brightness(1.1)' : 'brightness(0.7)'
                      }}
                    />
                    
                    {/* Overlay gradient */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, transparent 100%)`,
                      mixBlendMode: 'multiply'
                    }} />

                    {/* Badge statut */}
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      left: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: `1px solid ${project.color}`,
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: project.color,
                        borderRadius: '50%',
                        animation: 'glowPulse 2s ease-in-out infinite',
                        boxShadow: `0 0 10px ${project.color}`
                      }} />
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: 'white',
                        fontFamily: 'monospace'
                      }}>
                        {project.status}
                      </span>
                    </div>

                    {/* Badge impact */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1.5rem',
                      left: '1.5rem',
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(51, 153, 255, 0.5)',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: '#3399ff',
                        fontFamily: 'monospace'
                      }}>
                        {project.impact}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div style={{
                    padding: 'clamp(1.5rem, 5vw, 3rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    {/* Numéro projet */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '3px',
                        height: '30px',
                        background: project.color,
                        borderRadius: '2px',
                        boxShadow: `0 0 10px ${project.color}`
                      }} />
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: project.color,
                        fontFamily: 'monospace'
                      }}>
                        Projet #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Titre */}
                    <h3 style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontWeight: 900,
                      color: 'white',
                      marginBottom: '1rem',
                      lineHeight: 1.2,
                      fontFamily: 'monospace'
                    }}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      color: 'rgba(102, 179, 255, 0.8)',
                      fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                      lineHeight: 1.7,
                      marginBottom: '1.5rem',
                      overflow: 'hidden',
                      display: expandedCard === index ? 'block' : '-webkit-box',
                      WebkitLineClamp: expandedCard === index ? 'unset' : '3',
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {project.description}
                    </p>

                    {/* Bouton voir plus */}
                    {project.description.length > 100 && (
                      <button
                        onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          color: 'rgba(102, 179, 255, 0.8)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          marginBottom: '1.5rem',
                          padding: 0,
                          fontFamily: 'monospace',
                          transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#3399ff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(102, 179, 255, 0.8)'}
                      >
                        {expandedCard === index ? 'Voir moins' : 'Voir plus'}
                        <span style={{
                          display: 'inline-block',
                          transform: expandedCard === index ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.3s'
                        }}>▼</span>
                      </button>
                    )}

                    {/* Stack technique */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '2rem'
                    }}>
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: `1px solid ${project.color}40`,
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: project.color,
                            fontFamily: 'monospace'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Boutons d'action */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <a
                        href={project.demo}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem',
                          background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          transition: 'all 0.3s',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = `0 10px 30px ${project.color}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <span>🌐</span>
                        Voir la démo
                        <span>→</span>
                      </a>

                      <a
                        href={project.code}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem',
                          background: 'rgba(0, 0, 0, 0.6)',
                          border: '2px solid rgba(51, 153, 255, 0.5)',
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          transition: 'all 0.3s',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(51, 153, 255, 0.2)';
                          e.currentTarget.style.borderColor = '#3399ff';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                          e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.5)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        <span>💻</span>
                        Code source
                      </a>
                    </div>
                  </div>
                </div>

                {/* Effet glow au hover */}
                {hoveredCard === index && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `${project.color}10`,
                    pointerEvents: 'none'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* État vide */}
          {filteredProjects.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '5rem 1rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '2px solid rgba(51, 153, 255, 0.3)',
                borderRadius: '50%',
                marginBottom: '1.5rem',
                fontSize: '2rem'
              }}>
                ✨
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                Aucun projet trouvé
              </h3>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(102, 179, 255, 0.8)'
              }}>
                Essayez un autre filtre pour découvrir plus de projets
              </p>
            </div>
          )}

          {/* CTA final */}
          <div style={{
            marginTop: '5rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '2rem',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '2px solid #3399ff',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                Intéressé par une collaboration ?
              </h3>
              <p style={{
                color: 'rgba(102, 179, 255, 0.8)',
                marginBottom: '1.5rem',
                fontSize: '1.125rem'
              }}>
                Créons ensemble quelque chose d'extraordinaire
              </p>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #3399ff, #0099cc)',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  boxShadow: '0 0 30px rgba(51, 153, 255, 0.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(51, 153, 255, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(51, 153, 255, 0.5)';
                }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contactez-moi
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Effet vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
          pointerEvents: 'none'
        }} />
      </section>
    </>
  );
};

export default Projects;