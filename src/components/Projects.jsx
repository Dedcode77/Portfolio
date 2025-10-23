import { useState } from "react";
import { ArrowRight, Github, Globe, ChevronDown, Sparkles, Rocket } from "lucide-react";

const allProjects = [
  {
    title: "Système intelligent d'école",
    description: "Plateforme IA pour la gestion prédictive des absences, notes et performances avec analyse en temps réel.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    stack: ["React", "Django", "Tailwind CSS"],
    color: "bg-blue-500",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    demo: "#",
    code: "#",
    impact: "2500+ étudiants",
    status: "Production"
  },
  {
    title: "Création et Gestion formulaires IA",
    description: "Générateur intelligent de formulaires avec validation automatique et analyse des réponses par IA.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    stack: ["React", "Firebase"],
    color: "bg-purple-500",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    demo: "#",
    code: "#",
    impact: "50k formulaires/mois",
    status: "Production"
  },
  {
    title: "E-learning immersif 3D",
    description: "Expérience d'apprentissage 3D avec avatars personnalisables, suivi en temps réel et évaluation automatique.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    stack: ["React", "Firebase"],
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    demo: "#",
    code: "#",
    impact: "10k utilisateurs actifs",
    status: "Beta"
  },
  {
    title: "Plateforme collaborative",
    description: "Espace de travail collaboratif avec visioconférence intégrée et tableau blanc interactif.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    stack: ["React", "Firebase"],
    color: "bg-orange-500",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    demo: "#",
    code: "#",
    impact: "300+ équipes",
    status: "Production"
  },
  {
    title: "Assistant mobile vocal",
    description: "App Flutter avec commandes vocales IA pour gérer les tâches éducatives à distance et planification intelligente.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    stack: ["Flutter", "Firebase"],
    color: "bg-pink-500",
    textColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    demo: "#",
    code: "#",
    impact: "4.8★ sur stores",
    status: "Production"
  },
  {
    title: "Dashboard Analytics",
    description: "Tableau de bord avancé avec visualisations interactives et prédictions ML pour insights éducatifs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    stack: ["React", "Django", "Tailwind CSS"],
    color: "bg-amber-500",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    demo: "#",
    code: "#",
    impact: "1M+ data points",
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
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-4">
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
            <Rocket className="w-4 h-4 text-blue-400 animate-bounce" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Innovations & Créations
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none">
            <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Portfolio
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Créatif
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez mes projets qui repoussent les limites de la technologie
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          {stacks.map((stack) => (
            <button
              key={stack}
              onClick={() => setSelectedStack(stack)}
              className={`group relative px-6 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 ${
                selectedStack === stack
                  ? "text-white scale-105"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {selectedStack === stack && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-xl opacity-50" />
                </>
              )}
              {selectedStack !== stack && (
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
              )}
              <span className="relative z-10">{stack}</span>
            </button>
          ))}
        </div>

        {/* Projects Showcase */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className={`relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden border transition-all duration-500 ${
                hoveredCard === index ? `${project.borderColor} shadow-2xl` : 'border-white/5'
              }`}>
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-80 md:h-auto overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredCard === index ? 'scale-110 brightness-110' : 'scale-100 brightness-75'
                      }`}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 ${project.color} opacity-20 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full">
                        <div className={`w-2 h-2 ${project.color} rounded-full animate-pulse`} />
                        <span className="text-xs font-semibold text-white">{project.status}</span>
                      </div>
                    </div>

                    {/* Impact Badge */}
                    <div className="absolute bottom-6 left-6">
                      <div className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full">
                        <span className="text-sm font-semibold text-white">{project.impact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-1 h-8 ${project.color} rounded-full`} />
                      <span className={`text-sm font-bold uppercase tracking-wider ${project.textColor}`}>
                        Projet #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-4xl font-black text-white mb-4 leading-tight">
                      {project.title}
                    </h3>

                    <p className={`text-gray-400 text-lg leading-relaxed mb-6 ${
                      expandedCard === index ? '' : 'line-clamp-3'
                    }`}>
                      {project.description}
                    </p>

                    {project.description.length > 100 && (
                      <button
                        onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-6"
                      >
                        {expandedCard === index ? 'Voir moins' : 'Voir plus'}
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedCard === index ? 'rotate-180' : ''}`} />
                      </button>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 bg-white/5 border ${project.borderColor} rounded-xl text-sm font-medium ${project.textColor} backdrop-blur-sm`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <a
                        href={project.demo}
                        className={`group/btn flex items-center gap-2 px-6 py-3 ${project.color} rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-current/50 transition-all hover:scale-105`}
                      >
                        <Globe className="w-5 h-5" />
                        Voir la démo
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href={project.code}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
                      >
                        <Github className="w-5 h-5" />
                        Code source
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                {hoveredCard === index && (
                  <div className={`absolute inset-0 ${project.color} opacity-5 pointer-events-none`} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Aucun projet trouvé</h3>
            <p className="text-gray-400 text-lg">Essayez un autre filtre pour découvrir plus de projets</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-3">Intéressé par une collaboration ?</h3>
            <p className="text-gray-400 mb-6">Créons ensemble quelque chose d'extraordinaire</p>
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full font-bold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105">
              <span className="flex items-center gap-2">
                Contactez-moi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;