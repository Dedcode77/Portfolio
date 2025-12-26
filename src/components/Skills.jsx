import { useState } from "react";

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
    icon: "📱",
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

const SkillCard = ({ skill, categoryColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? 'rgba(51, 153, 255, 0.1)' : 'rgba(0, 0, 0, 0.6)',
        border: `2px solid ${hovered ? categoryColor : 'rgba(51, 153, 255, 0.3)'}`,
        padding: '1.5rem',
        borderRadius: '10px',
        transition: 'all 0.3s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 10px 40px ${categoryColor}40` : 'none',
        backdropFilter: 'blur(10px)',
        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
      }}
    >
      {/* Barre de progression */}
      <div style={{
        marginBottom: '1rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{
            color: hovered ? categoryColor : '#3399ff',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            transition: 'color 0.3s'
          }}>
            {skill.name}
          </span>
          <span style={{
            color: categoryColor,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: 'monospace'
          }}>
            {skill.level}%
          </span>
        </div>

        {/* Barre de progression */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: hovered ? `${skill.level}%` : '0%',
            height: '100%',
            background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}cc)`,
            transition: 'width 1s ease-out',
            boxShadow: `0 0 10px ${categoryColor}`,
            position: 'relative'
          }}>
            {/* Point lumineux à la fin */}
            {hovered && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '12px',
                height: '12px',
                background: categoryColor,
                borderRadius: '50%',
                boxShadow: `0 0 15px ${categoryColor}`,
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        color: 'rgba(102, 179, 255, 0.8)',
        fontSize: '0.875rem',
        marginBottom: '1rem',
        lineHeight: 1.6,
        minHeight: '40px'
      }}>
        {skill.desc}
      </p>

      {/* Badge expérience */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.25rem 0.75rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${categoryColor}40`,
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color: categoryColor
      }}>
        <span>⚡</span>
        <span>{skill.yearsExp} exp.</span>
      </div>

      {/* Effet de coin */}
      {hovered && (
        <>
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '15px',
            height: '15px',
            background: categoryColor,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            boxShadow: `0 0 20px ${categoryColor}`
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '15px',
            height: '15px',
            background: categoryColor,
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
            boxShadow: `0 0 20px ${categoryColor}`
          }} />
        </>
      )}
    </div>
  );
};

const SkillsRadial = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const displayedCategories = selectedCategory 
    ? skillCategories.filter(cat => cat.category === selectedCategory)
    : skillCategories;

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

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateY(-50%) scale(1.2); }
        }

        @keyframes glowPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(51, 153, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(51, 153, 255, 0.6);
          }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
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
        id="skills" 
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #001a2e 0%, #002a3a 50%, #001520 100%)',
          padding: '6rem 1rem',
          overflow: 'hidden'
        }}
      >
        {/* Lignes de scan */}
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
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
              <span>💻</span>
              <span>STACK_TECHNIQUE</span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 900,
              color: '#3399ff',
              marginBottom: '1rem',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textShadow: '0 0 20px rgba(51, 153, 255, 0.5)'
            }}>
              [ COMPÉTENCES ]
            </h2>
            
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(102, 179, 255, 0.8)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Technologies et outils maîtrisés pour créer des solutions innovantes
            </p>
          </div>

          {/* Filtres de catégorie */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '4rem'
          }}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: selectedCategory === null 
                  ? 'linear-gradient(135deg, #3399ff, #0099cc)' 
                  : 'rgba(0, 0, 0, 0.6)',
                border: `2px solid ${selectedCategory === null ? '#3399ff' : 'rgba(51, 153, 255, 0.3)'}`,
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== null) {
                  e.currentTarget.style.background = 'rgba(51, 153, 255, 0.2)';
                  e.currentTarget.style.borderColor = '#3399ff';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== null) {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.3)';
                }
              }}
            >
              <span>📊</span>
              Toutes
            </button>
            
            {skillCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.category)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: selectedCategory === cat.category 
                    ? 'linear-gradient(135deg, #3399ff, #0099cc)' 
                    : 'rgba(0, 0, 0, 0.6)',
                  border: `2px solid ${selectedCategory === cat.category ? '#3399ff' : 'rgba(51, 153, 255, 0.3)'}`,
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat.category) {
                    e.currentTarget.style.background = 'rgba(51, 153, 255, 0.2)';
                    e.currentTarget.style.borderColor = '#3399ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat.category) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.3)';
                  }
                }}
              >
                <span>{cat.icon}</span>
                {cat.category}
              </button>
            ))}
          </div>

          {/* Grilles de compétences par catégorie */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {displayedCategories.map((category, catIndex) => (
              <div key={catIndex} className="animate-fadeIn">
                {/* En-tête de catégorie */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
                    borderRadius: '10px',
                    fontSize: '1.5rem',
                    boxShadow: `0 0 20px ${category.color}40`
                  }}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      fontWeight: 'bold',
                      color: 'white',
                      fontFamily: 'monospace',
                      marginBottom: '0.25rem'
                    }}>
                      {category.category}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(102, 179, 255, 0.6)'
                    }}>
                      {category.skills.length} compétences
                    </p>
                  </div>
                  <div style={{
                    flex: 1,
                    height: '2px',
                    background: `linear-gradient(90deg, ${category.color}, transparent)`,
                    marginLeft: '1rem',
                    opacity: 0.3
                  }} />
                </div>

                {/* Grille des compétences */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem'
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

          {/* Section statistiques */}
          <div style={{
            marginTop: '5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { label: "Technologies", value: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0) },
              { label: "Projets complétés", value: "50+" },
              { label: "Heures de code", value: "5000+" },
              { label: "Clients satisfaits", value: "25+" }
            ].map((stat, i) => (
              <div 
                key={i} 
                style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '2px solid rgba(51, 153, 255, 0.3)',
                  borderRadius: '10px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = '#3399ff';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(51, 153, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 900,
                  color: '#3399ff',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace',
                  textShadow: '0 0 20px rgba(51, 153, 255, 0.5)'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'rgba(102, 179, 255, 0.8)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
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

export default SkillsRadial;