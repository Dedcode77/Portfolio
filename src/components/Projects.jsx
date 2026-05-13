import React, { useState, useMemo } from "react";

const allProjects = [
  {
    id: "p1",
    title: "Eco-Système Scolaire",
    description: "Intelligence artificielle centralisée pour la prédiction des trajectoires académiques et la gestion automatisée des flux administratifs.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    stack: ["React", "Django", "PostgreSQL"],
    theme: {
      accent: "text-cyan-400",
      bg: "bg-cyan-500",
      border: "border-cyan-500/50",
      shadow: "shadow-cyan-500/20",
      glow: "group-hover:shadow-cyan-500/40"
    },
    status: "LIVE_SYSTEM"
  },
  {
    id: "p2",
    title: "IA Form Generator",
    description: "Moteur de génération dynamique de formulaires avec validation neuronale et analyse sémantique des entrées utilisateur.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    stack: ["Next.js", "Tailwind", "OpenAI"],
    theme: {
      accent: "text-purple-400",
      bg: "bg-purple-500",
      border: "border-purple-500/50",
      shadow: "shadow-purple-500/20",
      glow: "group-hover:shadow-purple-500/40"
    },
    status: "STABLE"
  },
  {
    id: "p3",
    title: "E-Learning 3.0",
    description: "Environnement d'apprentissage immersif utilisant Firebase pour la synchronisation temps réel des avatars et des assets 3D.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    stack: ["Three.js", "Firebase", "React"],
    theme: {
      accent: "text-emerald-400",
      bg: "bg-emerald-500",
      border: "border-emerald-500/50",
      shadow: "shadow-emerald-500/20",
      glow: "group-hover:shadow-emerald-500/40"
    },
    status: "BETA_PHASE"
  }
];

const STACKS = ["Tous", "React", "Django", "Next.js", "Firebase", "Three.js"];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-zinc-950/50 border ${project.theme.border} rounded-2xl transition-all duration-700 ${project.theme.glow} hover:shadow-2xl overflow-hidden`}
      style={{
        animationDelay: `${index * 150}ms`,
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
      }}
    >
      <div className="grid lg:grid-cols-12 gap-0 min-h-[450px]">
        
        {/* Visual Engine */}
        <div className="lg:col-span-5 relative overflow-hidden bg-black">
          <img 
            src={project.image} 
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'scale-110 rotate-1 grayscale-0' : 'scale-100 grayscale-[0.5] opacity-60'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent lg:bg-gradient-to-r" />
          
          {/* Static UI Elements */}
          <div className="absolute top-6 left-6 py-1 px-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-sm">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${project.theme.bg}`} />
              <span className="text-[10px] font-mono text-white/70 tracking-[0.2em]">{project.status}</span>
            </div>
          </div>
        </div>

        {/* Intelligence Layer */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="mb-6">
            <span className={`text-xs font-mono font-bold tracking-[0.4em] ${project.theme.accent} opacity-70`}>
              MODULE_0{index + 1}
            </span>
            <h3 className={`text-4xl md:text-5xl font-black text-white mt-2 mb-4 tracking-tighter transition-all duration-500 ${isHovered ? 'translate-x-2' : ''}`}>
              {project.title}
            </h3>
            <div className={`h-1 w-12 ${project.theme.bg} transition-all duration-500 ${isHovered ? 'w-24' : 'w-12'}`} />
          </div>

          <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-500 hover:text-white hover:border-white/30 transition-colors cursor-default">
                {tech.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#demo" className={`group/btn relative px-8 py-3 overflow-hidden rounded-full transition-all active:scale-95`}>
                <div className={`absolute inset-0 ${project.theme.bg} opacity-20 group-hover/btn:opacity-100 transition-opacity`} />
                <span className="relative text-sm font-black text-white tracking-widest flex items-center gap-2">
                    INIT_DEMO <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </span>
            </a>
            <a href="#code" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-white py-1">
              SRC_CODE
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Corner */}
      <div className={`absolute bottom-0 right-0 w-8 h-8 ${project.theme.bg} opacity-20`} style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
    </div>
  );
};

const Projects = () => {
  const [selectedStack, setSelectedStack] = useState("Tous");

  const filteredProjects = useMemo(() => 
    selectedStack === "Tous" 
      ? allProjects 
      : allProjects.filter(p => p.stack.includes(selectedStack)),
    [selectedStack]
  );

  return (
    <section className="min-h-screen bg-[#020617] py-28 px-6 selection:bg-cyan-500 selection:text-white">
      {/* Background Grid System */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent, #020617)" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
               <div className="h-[1px] w-12 bg-cyan-500" />
               <span className="text-cyan-500 font-mono text-xs tracking-[0.3em]">PROJETS_ARCHIVES</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
                Core<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">Engine</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            {STACKS.map((stack) => (
              <button
                key={stack}
                onClick={() => setSelectedStack(stack)}
                className={`px-6 py-2 rounded-xl font-mono text-[10px] tracking-widest uppercase transition-all
                  ${selectedStack === stack 
                    ? "bg-white text-black shadow-lg scale-105" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                  }`}
              >
                {stack}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-20">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
            <div className="py-40 text-center">
                <p className="text-zinc-600 font-mono italic animate-pulse tracking-widest text-xl">
                    SYSTEM_ERROR: NO_DATA_MATCHED
                </p>
            </div>
        )}
      </div>
    </section>
  );
};

export default Projects;