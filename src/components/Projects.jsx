import { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { SiReact, SiDjango, SiFlutter, SiFirebase, SiTailwindcss } from "react-icons/si";

const allProjects = [
  {
    title: "Système intelligent d'école",
    description: "Plateforme IA pour la gestion prédictive des absences, notes et performances.",
    image: "src/assets/boliviainteligente-jzzbCEMcdtM-unsplash.jpg",
    stack: ["React", "Django", "Tailwind CSS"],
    stackIcons: [<SiReact key="react" />, <SiDjango key="django" />, <SiTailwindcss key="tailwind" />],
    demo: "#",
    code: "#"
  },
  {
    title: "Creation et Gestion formmulaire avec l'IA",
    description: "Expérience d'apprentissage 3D avec avatars, suivi en temps réel et évaluation automatique.",
    image: "src/assets/boliviainteligente-6f53MxR7j8I-unsplash.jpg",
    stack: ["React", "Firebase"],
    stackIcons: [<SiReact key="react" />, <SiFirebase key="firebase" />],
    demo: "#",
    code: "#"
  },
  {
    title: "E-learning immersif 3D",
    description: "Expérience d'apprentissage 3D avec avatars, suivi en temps réel et évaluation automatique.",
    image: "src/assets/boliviainteligente-6f53MxR7j8I-unsplash.jpg",
    stack: ["React", "Firebase"],
    stackIcons: [<SiReact key="react" />, <SiFirebase key="firebase" />],
    demo: "#",
    code: "#"
  },
  {
    title: "E-learning immersif 3D",
    description: "Expérience d'apprentissage 3D avec avatars, suivi en temps réel et évaluation automatique.",
    image: "src/assets/boliviainteligente-6f53MxR7j8I-unsplash.jpg",
    stack: ["React", "Firebase"],
    stackIcons: [<SiReact key="react" />, <SiFirebase key="firebase" />],
    demo: "#",
    code: "#"
  },
  {
    title: "Assistant mobile vocal",
    description: "App Flutter avec commandes vocales pour gérer les tâches éducatives à distance.",
    image: "src/assets/boliviainteligente-AgSZuXX3GCU-unsplash.jpg",
    stack: ["Flutter", "Firebase"],
    stackIcons: [<SiFlutter key="flutter" />, <SiFirebase key="firebase" />],
    demo: "#",
    code: "#"
  }
];

const stacks = ["Tous", "React", "Django", "Flutter", "Firebase", "Tailwind CSS"];

const Projects = () => {
  const [selectedStack, setSelectedStack] = useState("Tous");

  // Filtrage des projets selon la techno choisie
  const filteredProjects = selectedStack === "Tous"
    ? allProjects
    : allProjects.filter(project => project.stack.includes(selectedStack));

  return (
    <section id="projects" className="relative z-10 bg-black py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900 opacity-60 blur-3xl" />
      <div className="relative z-20 max-w-7xl mx-auto text-white">
        <h2 className="text-5xl font-extrabold text-center mb-12 tracking-tight">🌌 Projets du futur</h2>

        {/* Filtre */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {stacks.map((stack) => (
            <button
              key={stack}
              onClick={() => setSelectedStack(stack)}
              className={`px-6 py-2 rounded-full font-semibold border-2 transition ${
                selectedStack === stack
                  ? "bg-pink-500 border-pink-500 text-white shadow-lg"
                  : "border-indigo-400 text-indigo-300 hover:bg-indigo-700 hover:text-white"
              }`}
            >
              {stack}
            </button>
          ))}
        </div>

        {/* Grille projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.1)] transition duration-300"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center gap-4">
                  <a href={project.demo} className="text-white hover:text-indigo-400 text-xl" target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </a>
                  <a href={project.code} className="text-white hover:text-gray-300 text-xl" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-indigo-300 group-hover:text-white transition">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4 group-hover:text-white transition">{project.description}</p>
              <div className="flex gap-3 text-indigo-400 text-xl">
                {project.stackIcons.map((Icon) => Icon)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
