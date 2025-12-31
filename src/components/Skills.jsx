import React, { useState, memo, useMemo } from "react";
import { Smartphone, Star, AlarmClock, Globe, Settings, Laptop, Zap } from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    icon: <Globe size={24} />,
    color: "blue",
    colorHex: "#3399ff",
    skills: [
      { name: "React", level: 90, desc: "Développement SPA & Hooks", yearsExp: "3+" },
      { name: "Next.js", level: 75, desc: "SSR et static site", yearsExp: "2+" },
      { name: "Tailwind CSS", level: 80, desc: "Design rapide & moderne", yearsExp: "2+" },
      { name: "JavaScript", level: 85, desc: "ES6+ & DOM API", yearsExp: "4+" },
    ]
  },
  {
    category: "Backend",
    icon: <Settings size={24} />,
    color: "green",
    colorHex: "#00cc66",
    skills: [
      { name: "Node.js", level: 70, desc: "API REST & GraphQL", yearsExp: "2+" },
      { name: "Django", level: 60, desc: "Framework Python web", yearsExp: "1+" },
      { name: "Java", level: 70, desc: "POO & Architecture", yearsExp: "2+" },
      { name: "Spring", level: 70, desc: "Spring Boot & MVC", yearsExp: "2+" },
    ]
  },
  {
    category: "Mobile & Cloud",
    icon: <Smartphone size={24} />,
    color: "purple",
    colorHex: "#cc00ff",
    skills: [
      { name: "Flutter", level: 65, desc: "Apps cross-platform", yearsExp: "1+" },
      { name: "Firebase", level: 70, desc: "Backend as a Service", yearsExp: "2+" },
    ]
  },
  {
    category: "Fondamentaux",
    icon: <Laptop size={24} />,
    color: "orange",
    colorHex: "#ff6600",
    skills: [
      { name: "HTML", level: 90, desc: "Sémantique & SEO", yearsExp: "5+" },
      { name: "CSS", level: 85, desc: "Flexbox, Grid, Animations", yearsExp: "5+" },
    ]
  }
];

// --- Sous-composant SkillCard optimisé ---
const SkillCard = memo(({ skill, colorHex }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-8 transition-all duration-500 ease-out backdrop-blur-xl overflow-hidden"
      style={{
        background: isHovered 
          ? `linear-gradient(135deg, ${colorHex}25, rgba(0,0,0,0.9))` 
          : 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,20,40,0.8))',
        border: `2px solid ${isHovered ? colorHex : 'rgba(51,153,255,0.2)'}`,
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px ${colorHex}30` : 'none',
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
      }}
    >
      {/* Ligne d'accentuation animée */}
      <div 
        className="absolute top-0 left-0 h-[3px] transition-all duration-700 ease-in-out"
        style={{ 
          width: isHovered ? '100%' : '0%', 
          backgroundColor: colorHex,
          boxShadow: `0 0 15px ${colorHex}`
        }}
      />

      {/* Header Skill */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <h4 className="text-xl font-black font-mono uppercase tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? colorHex : '#66b3ff' }}>
          {skill.name}
        </h4>
        <div className="bg-black/50 px-4 py-2 border-2 transition-all"
             style={{ borderColor: colorHex, clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}>
          <span className="text-2xl font-black font-mono" style={{ color: colorHex }}>
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 h-3 w-full bg-white/5 border border-blue-400/20 overflow-hidden relative"
           style={{ clipPath: 'polygon(1% 0, 99% 0, 100% 50%, 99% 100%, 1% 100%, 0 50%)' }}>
        <div 
          className="h-full transition-all duration-1000 ease-in-out relative"
          style={{ 
            width: isHovered ? `${skill.level}%` : '0%', 
            backgroundColor: colorHex,
            boxShadow: `0 0 20px ${colorHex}`
          }}
        >
           {isHovered && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 animate-pulse" style={{ backgroundColor: colorHex }} />}
        </div>
      </div>

      <div className="bg-black/40 p-4 border-l-4 mb-5" style={{ borderColor: `${colorHex}60` }}>
        <p className="text-blue-300/90 font-mono text-sm leading-relaxed">
          <span style={{ color: colorHex }} className="font-bold mr-2">{'>'}</span>
          {skill.desc}
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 border-2 font-black font-mono text-xs tracking-tighter uppercase"
           style={{ borderColor: `${colorHex}60`, color: colorHex, clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)' }}>
        <Zap size={14} fill={colorHex} />
        {skill.yearsExp} EXP
      </div>
    </div>
  );
});

// --- Composant Principal ---
const SkillsRadial = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const displayedCategories = useMemo(() => 
    selectedCategory ? skillCategories.filter(cat => cat.category === selectedCategory) : skillCategories
  , [selectedCategory]);

  const stats = [
    { label: "Techs", value: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0), icon: <Laptop className="text-blue-400" /> },
    { label: "Projets", value: "12+", icon: <Star className="text-blue-400" /> },
    { label: "Heures", value: "5k+", icon: <AlarmClock className="text-blue-400" /> },
  ];

  return (
    <section className="relative min-h-screen bg-[#001a2e] text-white py-24 px-6 overflow-hidden font-sans">
      {/* Background Cyberpunk Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#3399ff 1px, transparent 1px), linear-gradient(90deg, #3399ff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/70 border-2 border-blue-500 mb-8 font-mono font-bold text-blue-400 tracking-[0.2em] shadow-[0_0_20px_rgba(51,153,255,0.3)]"
               style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}>
            <span className="animate-pulse">●</span> STACK_TECHNIQUE
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black font-mono tracking-tighter mb-6 relative inline-block">
            <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(51,153,255,0.5)]">[ COMPÉTENCES ]</span>
            <span className="absolute inset-0 text-blue-300 opacity-20 animate-ping scale-105 pointer-events-none">[ COMPÉTENCES ]</span>
          </h2>
          <p className="text-blue-300/70 max-w-2xl mx-auto text-lg font-mono">
            Systèmes d'ingénierie logicielle et interfaces haute performance.
          </p>
        </div>

        {/* Filtres de Catégories */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3 font-mono font-black border-2 transition-all duration-300 ${!selectedCategory ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'bg-black/60 border-blue-900 text-blue-400 hover:border-blue-400'}`}
            style={{ clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)' }}
          >
            TOUTES
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className="px-8 py-3 font-mono font-black border-2 transition-all duration-300 flex items-center gap-2 group"
              style={{ 
                clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)',
                borderColor: selectedCategory === cat.category ? cat.colorHex : 'rgba(51,153,255,0.2)',
                backgroundColor: selectedCategory === cat.category ? cat.colorHex : 'rgba(0,0,0,0.6)',
                boxShadow: selectedCategory === cat.category ? `0 0 25px ${cat.colorHex}60` : 'none'
              }}
            >
              <span className="group-hover:scale-125 transition-transform">{cat.icon}</span>
              {cat.category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Liste des catégories et compétences */}
        <div className="space-y-24">
          {displayedCategories.map((category) => (
            <div key={category.category} className="animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center gap-6 mb-12 group">
                <div className="w-16 h-16 flex items-center justify-center text-white shrink-0 transition-transform group-hover:rotate-12"
                     style={{ 
                        backgroundColor: category.colorHex, 
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        boxShadow: `0 0 30px ${category.colorHex}50` 
                     }}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-black font-mono tracking-widest uppercase italic" style={{ textShadow: `0 0 10px ${category.colorHex}` }}>
                    {category.category}
                  </h3>
                  <p className="text-blue-400/60 font-mono text-sm uppercase tracking-tighter">
                    Accès autorisé • <span style={{ color: category.colorHex }}>{category.skills.length}</span> Modules détectés
                  </p>
                </div>
                <div className="hidden md:block flex-1 h-[2px]" style={{ background: `linear-gradient(90deg, ${category.colorHex}, transparent)` }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.skills.map((skill, idx) => (
                  <SkillCard key={idx} skill={skill} colorHex={category.colorHex} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-32">
          {stats.map((stat, i) => (
            <div key={i} className="group bg-black/60 border-2 border-blue-900/50 p-10 text-center hover:border-blue-500 transition-all duration-500"
                 style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">
                {React.cloneElement(stat.icon, { size: 40 })}
              </div>
              <div className="text-5xl font-black font-mono text-blue-500 mb-2">{stat.value}</div>
              <div className="text-blue-300/50 font-mono tracking-[0.3em] uppercase text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsRadial;