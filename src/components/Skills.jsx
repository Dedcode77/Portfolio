import { useState } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", level: 90, desc: "Excellent en structure HTML", color: "#E44D26" },       // orange html
  { name: "CSS", level: 85, desc: "Maîtrise avancée des styles", color: "#2965F1" },        // bleu css
  { name: "Tailwind CSS", level: 80, desc: "Design rapide & moderne", color: "#38B2AC" },   // teal
  { name: "JavaScript", level: 85, desc: "Bonne connaissance JS", color: "#F7DF1E" },       // jaune JS
  { name: "React", level: 90, desc: "Développement SPA", color: "#61DAFB" },                // cyan React
  { name: "Next.js", level: 75, desc: "SSR et static site", color: "#000000" },             // noir Next.js
  { name: "Node.js", level: 70, desc: "Backend JavaScript", color: "#68A063" },             // vert Node.js
  { name: "Django", level: 60, desc: "Framework Python", color: "#092E20" },                // vert foncé Django
  { name: "Flutter", level: 65, desc: "Apps mobiles cross-platform", color: "#02569B" },    // bleu Flutter
  { name: "Firebase", level: 70, desc: "Backend serverless", color: "#FFCA28" },    
  { name: "Java", level: 70, desc: "Backend serverless", color: "#971132" },
  { name: "Spring", level: 70, desc: "Backend serverless", color: "#30833B" },                // jaune Firebase
];

const radius = 50;
const circumference = 2 * Math.PI * radius;

const SkillCircle = ({ skill }) => {
  const [hovered, setHovered] = useState(false);
  const progress = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center cursor-pointer"
      initial={{ scale: 0.8 }}
      animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.15 }}
    >
      <svg width="120" height="120" className="transform -rotate-90 drop-shadow-xl">
        <defs>
          <filter id={`glow-${skill.name}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0" dy="0" stdDeviation="3"
              floodColor={skill.color}
              floodOpacity="0.7"
            />
            <feDropShadow
              dx="0" dy="0" stdDeviation="5"
              floodColor={skill.color}
              floodOpacity="0.5"
            />
          </filter>
          <linearGradient id={`neonGradient-${skill.name}`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skill.color} />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id={`flare-${skill.name}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="100%" stopColor={skill.color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cercle gris de fond */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#222"
          strokeWidth="10"
          fill="none"
        />

        {/* Cercle progress animé avec glow */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          stroke={`url(#neonGradient-${skill.name})`}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          strokeLinecap="round"
          style={{ filter: `url(#glow-${skill.name})` }}
        />

        {/* Flare lumineux en haut du cercle */}
        <motion.circle
          cx="60"
          cy="10"
          r="6"
          fill={`url(#flare-${skill.name})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.5,
          }}
        />
      </svg>

      <motion.span
        className={`mt-4 font-semibold text-lg cursor-default select-none`}
        style={{ color: hovered ? skill.color : undefined }}
        initial={{ color: "#8b5cf6" }}
        animate={{ color: hovered ? skill.color : "#8b5cf6" }}
        transition={{ duration: 0.4 }}
      >
        {skill.name}
      </motion.span>

      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full mt-2 px-3 py-1 rounded-md text-sm shadow-lg whitespace-nowrap"
          style={{ backgroundColor: skill.color, color: "#fff" }}
        >
          {skill.desc}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function SkillsRadial() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-12 drop-shadow-lg">Compétences</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 justify-center">
          {skills.map((skill) => (
            <SkillCircle key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
