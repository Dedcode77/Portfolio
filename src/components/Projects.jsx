import React, { useState, useMemo } from "react";

const allProjects = [
  {
    title: "Système intelligent d'école",
    description: "Plateforme IA pour la gestion prédictive des absences, notes et performances avec analyse en temps réel.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    stack: ["React", "Django", "Tailwind CSS"],
    color: "shadow-blue-500/40",
    border: "border-blue-500",
    text: "text-blue-400",
    bg: "bg-blue-500",
    demo: "#",
    code: "#",
    status: "Production"
  },
  {
    title: "Gestion formulaires IA",
    description: "Générateur intelligent de formulaires avec validation automatique et analyse des réponses par IA.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    stack: ["Next.js", "Tailwind CSS"],
    color: "shadow-purple-500/40",
    border: "border-purple-500",
    text: "text-purple-400",
    bg: "bg-purple-500",
    demo: "#",
    code: "#",
    status: "Production"
  },
  {
    title: "E-learning immersif 3D",
    description: "Expérience d'apprentissage 3D avec avatars personnalisables, suivi en temps réel et évaluation automatique.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    stack: ["React", "Firebase"],
    color: "shadow-emerald-500/40",
    border: "border-emerald-500",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    demo: "#",
    code: "#",
    status: "Beta"
  }
];

const STACKS = ["Tous", "React", "Django", "Flutter", "Firebase", "Tailwind CSS"];

const ProjectCard = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`group relative bg-black/60 border-2 ${project.border} rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${project.color} animate-in fade-in slide-in-from-bottom-5 duration-700`}
         style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
      
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-50 group-hover:brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent mix-blend-multiply" />
          
          {/* Badge Statut */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/80 border border-current rounded-full backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full animate-pulse ${project.bg} shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">{project.status}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-1 h-8 rounded-sm ${project.bg} shadow-lg`} />
            <span className={`font-mono text-sm font-bold tracking-widest uppercase ${project.text}`}>
              Projet #{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-mono font-black text-white mb-4 leading-tight uppercase">
            {project.title}
          </h3>

          <p className={`text-blue-100/70 leading-relaxed mb-6 font-sans transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {project.description}
          </p>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-mono font-bold text-blue-400 hover:text-white transition-colors mb-6 w-fit"
          >
            {isExpanded ? 'VOIR MOINS ▲' : 'VOIR PLUS ▼'}
          </button>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => tech && (
              <span key={tech} className={`px-3 py-1 bg-black/60 border border-white/10 rounded-md text-xs font-mono font-semibold ${project.text}`}>
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <a href={project.demo} className={`flex items-center gap-2 px-6 py-3 ${project.bg} text-white font-mono font-bold rounded-lg transition-all hover:scale-105 hover:brightness-110`}>
              🌐 DEMO <span>→</span>
            </a>
            <a href={project.code} className="flex items-center gap-2 px-6 py-3 bg-black/60 border-2 border-blue-500/50 text-white font-mono font-bold rounded-lg hover:bg-blue-500/20 transition-all hover:scale-105">
              💻 CODE
            </a>
          </div>
        </div>
      </div>
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
    <section id="projects" className="relative min-h-screen bg-[#001a2e] py-20 px-4 overflow-hidden selection:bg-blue-500 selection:text-white">
      
      {/* Cyberpunk Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent top-0 animate-[scan_8s_linear_infinite] opacity-30 shadow-[0_0_20px_#3399ff]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(51,153,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(51,153,255,0.05)_1px,transparent_1px)] bg-[size:5%_5%]" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-black/60 border border-blue-500 rounded-full text-blue-400 font-mono text-sm mb-6">
            <span>🚀</span> INNOVATIONS_&_CRÉATIONS
          </div>
          <h2 className="text-5xl md:text-8xl font-mono font-black mb-6 tracking-tighter">
            <span className="block text-white drop-shadow-2xl">PORTFOLIO</span>
            <span className="block text-blue-500 drop-shadow-[0_0_15px_rgba(51,153,255,0.5)]">[ CRÉATIF ]</span>
          </h2>
          <p className="text-blue-300/60 max-w-2xl mx-auto text-lg md:text-xl">
            Découvrez mes projets qui repoussent les limites de la technologie.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {STACKS.map((stack) => (
            <button
              key={stack}
              onClick={() => setSelectedStack(stack)}
              className={`px-6 py-2 rounded-full font-mono font-bold text-sm uppercase transition-all duration-300 border-2 
                ${selectedStack === stack 
                  ? "bg-blue-500 border-blue-400 text-white shadow-[0_0_20px_rgba(51,153,255,0.4)] scale-110" 
                  : "bg-black/40 border-blue-500/30 text-blue-400 hover:border-blue-500 hover:bg-blue-500/10"
                }`}
            >
              {stack}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 animate-pulse">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-mono font-bold text-white mb-2">Aucun projet trouvé</h3>
            <p className="text-blue-400/60 font-mono">Initialisation de nouveaux filtres recommandée...</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="inline-block p-10 bg-black/60 border-2 border-blue-500 rounded-2xl backdrop-blur-xl group hover:border-blue-400 transition-colors"
               style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
            <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-4">Prêt à lancer un projet ?</h3>
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-mono font-black rounded-full transition-all hover:scale-110 shadow-[0_0_30px_rgba(51,153,255,0.4)]">
              CONTACTEZ-MOI →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;