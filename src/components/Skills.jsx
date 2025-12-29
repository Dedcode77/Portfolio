import { useState, memo } from "react";
import { Smartphone, Star, AlarmClock } from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    icon: "🌐",
    color: "#3399ff",
    skills: [
      { name: "React", level: 90, desc: "Développement SPA & Hooks", yearsExp: "3+" },
      { name: "Next.js", level: 75, desc: "SSR et static site", yearsExp: "2+" },
      { name: "Tailwind CSS", level: 80, desc: "Design rapide & moderne", yearsExp: "2+" },
      { name: "JavaScript", level: 85, desc: "ES6+ & DOM API", yearsExp: "4+" },
    ]
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#00cc66",
    skills: [
      { name: "Node.js", level: 70, desc: "API REST & GraphQL", yearsExp: "2+" },
      { name: "Django", level: 60, desc: "Framework Python web", yearsExp: "1+" },
      { name: "Java", level: 70, desc: "POO & Architecture", yearsExp: "2+" },
      { name: "Spring", level: 70, desc: "Spring Boot & MVC", yearsExp: "2+" },
    ]
  },
  {
    category: "Mobile & Cloud",
    icon:<Smartphone />,
    color: "#cc00ff",
    skills: [
      { name: "Flutter", level: 65, desc: "Apps cross-platform", yearsExp: "1+" },
      { name: "Firebase", level: 70, desc: "Backend as a Service", yearsExp: "2+" },
    ]
  },
  {
    category: "Fondamentaux",
    icon: "💻",
    color: "#ff6600",
    skills: [
      { name: "HTML", level: 90, desc: "Sémantique & SEO", yearsExp: "5+" },
      { name: "CSS", level: 85, desc: "Flexbox, Grid, Animations", yearsExp: "5+" },
    ]
  }
];

const SkillCard = memo(({ skill, categoryColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered 
          ? `linear-gradient(135deg, rgba(51, 153, 255, 0.15), rgba(0, 0, 0, 0.8))` 
          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 20, 40, 0.8))',
        border: `3px solid ${hovered ? categoryColor : 'rgba(51, 153, 255, 0.2)'}`,
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered 
          ? `0 15px 50px ${categoryColor}60, inset 0 0 30px ${categoryColor}20` 
          : '0 5px 20px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(15px)',
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
        overflow: 'hidden'
      }}
    >
      {/* Ligne supérieure */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: hovered ? '100%' : '0%',
        height: '3px',
        background: `linear-gradient(90deg, ${categoryColor}, transparent)`,
        transition: 'width 0.6s ease',
        boxShadow: `0 0 10px ${categoryColor}`
      }} />

      {/* En-tête */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <span style={{
          color: hovered ? categoryColor : '#66b3ff',
          fontSize: '1.4rem',
          fontWeight: 900,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: hovered ? `0 0 15px ${categoryColor}` : 'none',
          transition: 'all 0.3s'
        }}>
          {skill.name}
        </span>

        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '0.5rem 1rem',
          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
          border: `2px solid ${categoryColor}`,
          boxShadow: `0 0 15px ${categoryColor}40`
        }}>
          <span style={{
            color: categoryColor,
            fontSize: '1.5rem',
            fontWeight: 900,
            fontFamily: 'monospace',
            textShadow: `0 0 10px ${categoryColor}`
          }}>
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          width: '100%',
          height: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          clipPath: 'polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)',
          overflow: 'hidden',
          border: '1px solid rgba(51, 153, 255, 0.2)'
        }}>
          <div style={{
            width: hovered ? `${skill.level}%` : '0%',
            height: '100%',
            background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}dd)`,
            transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: `0 0 20px ${categoryColor}`,
            position: 'relative'
          }}>
            {hovered && (
              <div style={{
                position: 'absolute',
                right: '-6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '14px',
                background: categoryColor,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                boxShadow: `0 0 25px ${categoryColor}`,
                animation: 'pulse-diamond 1.5s ease-in-out infinite'
              }} />
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '1rem',
        borderLeft: `3px solid ${categoryColor}40`,
        marginBottom: '1.25rem'
      }}>
        <p style={{
          color: 'rgba(102, 179, 255, 0.9)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          fontFamily: 'monospace',
          margin: 0
        }}>
          <span style={{ color: categoryColor, fontWeight: 'bold' }}>{'> '}</span>
          {skill.desc}
        </p>
      </div>

      {/* Badge expérience */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 1.25rem',
        background: 'rgba(0, 0, 0, 0.6)',
        border: `2px solid ${categoryColor}60`,
        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        fontSize: '0.85rem',
        fontWeight: 900,
        color: categoryColor,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontFamily: 'monospace',
        boxShadow: `0 0 15px ${categoryColor}30`
      }}>
        <span>⚡</span>
        <span>{skill.yearsExp} EXP</span>
      </div>

      {/* Coins lumineux */}
      {hovered && (
        <>
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '20px',
            height: '20px',
            background: categoryColor,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            boxShadow: `0 0 30px ${categoryColor}`,
            animation: 'glow-pulse 2s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '20px',
            height: '20px',
            background: categoryColor,
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
            boxShadow: `0 0 30px ${categoryColor}`,
            animation: 'glow-pulse 2s ease-in-out infinite',
            animationDelay: '1s'
          }} />
        </>
      )}
    </div>
  );
});

const SkillsRadial = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const displayedCategories = selectedCategory 
    ? skillCategories.filter(cat => cat.category === selectedCategory)
    : skillCategories;

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-diamond {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateY(-50%) scale(1.3); }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 30px currentColor; }
          50% { opacity: 0.5; box-shadow: 0 0 50px currentColor; }
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #3399ff, #66b3ff, #3399ff, transparent);
          box-shadow: 0 0 30px #3399ff;
          animation: scan 10s linear infinite;
          opacity: 0.4;
          pointer-events: none;
        }
      `}</style>

      <section 
        id="skills" 
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #001a2e 0%, #002a3a 50%, #001520 100%)',
          padding: '6rem 1.5rem',
          overflow: 'hidden',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Lignes de scan */}
        <div className="scan-line" />
        <div className="scan-line" style={{ animationDelay: '5s' }} />

        {/* Grille de fond */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`h-${i}`}
              style={{
                position: 'absolute',
                width: '100%',
                height: '1px',
                top: `${i * 5}%`,
                background: 'rgba(51, 153, 255, 0.06)'
              }}
            />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`v-${i}`}
              style={{
                position: 'absolute',
                width: '1px',
                height: '100%',
                left: `${i * 5}%`,
                background: 'rgba(51, 153, 255, 0.06)'
              }}
            />
          ))}
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid #3399ff',
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              marginBottom: '2rem',
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              color: '#66b3ff',
              boxShadow: '0 0 20px rgba(51, 153, 255, 0.3)',
              letterSpacing: '2px'
            }}>
              <span style={{ fontSize: '1.3rem' }}>💻</span>
              <span>STACK_TECHNIQUE</span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 900,
              color: '#3399ff',
              marginBottom: '1.5rem',
              fontFamily: 'monospace',
              letterSpacing: '8px',
              textShadow: '0 0 20px rgba(51, 153, 255, 0.6), 0 0 40px rgba(51, 153, 255, 0.4)',
              position: 'relative'
            }}>
              [ COMPÉTENCES ]
              <span style={{
                position: 'absolute',
                inset: 0,
                color: '#66b3ff',
                opacity: 0.3,
                animation: 'glitch 4s infinite'
              }}>
                [ COMPÉTENCES ]
              </span>
            </h2>
            
            <div style={{
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #3399ff, #66b3ff, #3399ff, transparent)',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              boxShadow: '0 0 15px rgba(51, 153, 255, 0.6)'
            }} />
            
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
              color: 'rgba(102, 179, 255, 0.9)',
              maxWidth: '750px',
              margin: '0 auto',
              lineHeight: 1.8
            }}>
              Technologies et outils maîtrisés pour créer des solutions innovantes
            </p>
          </div>

          {/* Filtres */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.25rem',
            marginBottom: '5rem'
          }}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: selectedCategory === null 
                  ? 'linear-gradient(135deg, #3399ff, #0099cc)' 
                  : 'rgba(0, 0, 0, 0.7)',
                border: `3px solid ${selectedCategory === null ? '#3399ff' : 'rgba(51, 153, 255, 0.3)'}`,
                color: 'white',
                fontWeight: 900,
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                boxShadow: selectedCategory === null ? '0 0 30px rgba(51, 153, 255, 0.6)' : 'none'
              }}
            >
              <span>📊</span>
              <span>TOUTES</span>
            </button>
            
            {skillCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.category)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: selectedCategory === cat.category 
                    ? `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` 
                    : 'rgba(0, 0, 0, 0.7)',
                  border: `3px solid ${selectedCategory === cat.category ? cat.color : 'rgba(51, 153, 255, 0.3)'}`,
                  color: 'white',
                  fontWeight: 900,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                  boxShadow: selectedCategory === cat.category ? `0 0 30px ${cat.color}80` : 'none'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Grilles de compétences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {displayedCategories.map((category, catIndex) => (
              <div key={catIndex} className="animate-fadeIn">
                {/* En-tête de catégorie */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '3rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.7), transparent)',
                  borderLeft: `5px solid ${category.color}`,
                  boxShadow: `0 0 30px ${category.color}20`,
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: `0 0 30px ${category.color}60`,
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    flexShrink: 0
                  }}>
                    {category.icon}
                  </div>
                  <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                    <h3 style={{
                      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                      fontWeight: 900,
                      color: 'white',
                      fontFamily: 'monospace',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '3px',
                      textShadow: `0 0 15px ${category.color}`
                    }}>
                      {category.category}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(102, 179, 255, 0.7)',
                      fontFamily: 'monospace',
                      fontWeight: 'bold'
                    }}>
                      <span style={{ color: category.color }}>{category.skills.length}</span> compétences
                    </p>
                  </div>
                  <div style={{
                    flex: '1 1 auto',
                    height: '4px',
                    background: `linear-gradient(90deg, ${category.color}, transparent)`,
                    boxShadow: `0 0 10px ${category.color}60`,
                    minWidth: '100px'
                  }} />
                </div>

                {/* Grille */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
                  gap: '2rem'
                }}>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard 
                      key={skillIndex} 
                      skill={skill} 
                      categoryColor={category.color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Statistiques */}
          <div style={{
            marginTop: '6rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '2rem'
          }}>
            {[
              { label: "Technologies", value: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0), icon: "" },
              { label: "Projets", value: "7+", icon: "" },
              { label: "Heures", value: "5000+", icon: <AlarmClock /> },
              { label: "Clients", value: "6+", icon: <Star/> }
            ].map((stat, i) => (
              <div 
                key={i} 
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1.5rem',
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 40, 0.8))',
                  border: '3px solid rgba(51, 153, 255, 0.3)',
                  backdropFilter: 'blur(15px)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  e.currentTarget.style.borderColor = '#3399ff';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(51, 153, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  color: '#3399ff',
                  marginBottom: '0.75rem',
                  fontFamily: 'monospace',
                  textShadow: '0 0 20px rgba(51, 153, 255, 0.5)'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  color: 'rgba(102, 179, 255, 0.8)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'monospace'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillsRadial;