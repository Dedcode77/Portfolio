import { useState } from "react";
import { Zap, Code2, Database, Smartphone, Globe, Server } from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    icon: <Globe className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-600",
    skills: [
      { name: "React", level: 90, desc: "Développement SPA & Hooks", color: "#61DAFB", yearsExp: "3+" },
      { name: "Next.js", level: 75, desc: "SSR et static site", color: "#000000", yearsExp: "2+" },
      { name: "Tailwind CSS", level: 80, desc: "Design rapide & moderne", color: "#38B2AC", yearsExp: "2+" },
      { name: "JavaScript", level: 85, desc: "ES6+ & DOM API", color: "#F7DF1E", yearsExp: "4+" },
      
    ]
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    skills: [
      { name: "Node.js", level: 70, desc: "API REST & GraphQL", color: "#68A063", yearsExp: "2+" },
      { name: "Django", level: 60, desc: "Framework Python web", color: "#092E20", yearsExp: "1+" },
      { name: "Java", level: 70, desc: "POO & Architecture", color: "#971132", yearsExp: "2+" },
      { name: "Spring", level: 70, desc: "Spring Boot & MVC", color: "#30833B", yearsExp: "2+" },
    ]
  },
  {
    category: "Mobile & Cloud",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600",
    skills: [
      { name: "Flutter", level: 65, desc: "Apps cross-platform", color: "#02569B", yearsExp: "1+" },
      { name: "Firebase", level: 70, desc: "Backend as a Service", color: "#FFCA28", yearsExp: "2+" },
    ]
  },
  {
    category: "Fondamentaux",
    icon: <Code2 className="w-6 h-6" />,
    color: "from-orange-500 to-red-600",
    skills: [
      { name: "HTML", level: 90, desc: "Sémantique & SEO", color: "#E44D26", yearsExp: "5+" },
      { name: "CSS", level: 85, desc: "Flexbox, Grid, Animations", color: "#2965F1", yearsExp: "5+" },
    ]
  }
];

const SkillCard = ({ skill, categoryColor }) => {
  const [hovered, setHovered] = useState(false);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (skill.level / 100) * circumference;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
    >
      {/* Glow Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${categoryColor} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative mb-4">
          <svg width="100" height="100" className="transform -rotate-90">
            <defs>
              <linearGradient id={`gradient-${skill.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: skill.color, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: skill.color, stopOpacity: 0.6 }} />
              </linearGradient>
              <filter id={`glow-${skill.name}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={`url(#gradient-${skill.name})`}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={hovered ? progress : circumference}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ filter: hovered ? `url(#glow-${skill.name})` : 'none' }}
            />
          </svg>
          
          {/* Center Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white" style={{ color: hovered ? skill.color : undefined }}>
              {skill.level}%
            </span>
          </div>

          {/* Pulsing Dot */}
          {hovered && (
            <div 
              className="absolute top-1 left-1/2 w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: skill.color }}
            />
          )}
        </div>

        {/* Skill Name */}
        <h4 
          className="text-lg font-bold mb-2 transition-colors duration-300"
          style={{ color: hovered ? skill.color : '#fff' }}
        >
          {skill.name}
        </h4>

        {/* Description */}
        <p className="text-sm text-gray-400 text-center mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {skill.desc}
        </p>

        {/* Experience Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full group-hover:bg-white/10 group-hover:border-white/20 transition-all">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-300">{skill.yearsExp} d'expérience</span>
        </div>
      </div>
    </div>
  );
};

const SkillsRadial = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const displayedCategories = selectedCategory 
    ? skillCategories.filter(cat => cat.category === selectedCategory)
    : skillCategories;

  return (
    <section id="skills" className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-24 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300 font-medium">Stack Technique</span>
          </div>
          
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 mb-4">
            Compétences
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies et outils que je maîtrise pour créer des solutions innovantes
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            <Database className="w-5 h-5" />
            Toutes les compétences
          </button>
          
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat.category)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === cat.category
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.icon}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid by Category */}
        <div className="space-y-16">
          {displayedCategories.map((category, catIndex) => (
            <div key={catIndex} className="animate-fadeIn">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{category.category}</h3>
                  <p className="text-sm text-gray-400">{category.skills.length} compétences</p>
                </div>
                <div className={`flex-1 h-1 bg-gradient-to-r ${category.color} opacity-20 rounded-full ml-4`} />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Technologies", value: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0) },
            { label: "Projets complétés", value: "50+" },
            { label: "Heures de code", value: "5000+" },
            { label: "Clients satisfaits", value: "25+" }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="group text-center p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

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
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default SkillsRadial;