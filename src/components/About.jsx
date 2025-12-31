import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Laptop, Rocket, CameraOff } from "lucide-react";

// --- Sous-composant HolographicImage ---
const HolographicImage = memo(({ imageSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  return (
    <div
      className="relative flex items-center justify-center w-full max-w-[450px] aspect-square mx-auto cursor-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Cercles pulsés en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-blue-500/30 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            style={{ width: `${85 + i * 15}%`, height: `${85 + i * 15}%` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Particules flottantes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] pointer-events-none"
          animate={{ x: [0, 15, -15, 0], y: [0, -20, 10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
          style={{
            left: `${50 + Math.cos((i / 12) * Math.PI * 2) * 45}%`,
            top: `${50 + Math.sin((i / 12) * Math.PI * 2) * 45}%`,
          }}
        />
      ))}

      {/* Container de l'image avec perspective 3D */}
      <motion.div
        className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-blue-500 bg-slate-900/70 backdrop-blur-xl z-10 shadow-2xl"
        animate={{
          rotateY: isHovered ? mousePos.x * 10 : 0,
          rotateX: isHovered ? -mousePos.y * 10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {!imageError ? (
          <img
            src={imageSrc || "https://via.placeholder.com/400"}
            alt="Salif Ciss"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "brightness-110 saturate-110" : "brightness-90"
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-blue-400">
            <CameraOff size={48} />
            <span className="text-sm mt-2 font-mono">IMAGE_NOT_FOUND</span>
          </div>
        )}

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-1/2 w-full animate-scan pointer-events-none" />
        
        {/* Hologram Overlay */}
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none" />
      </motion.div>

      {/* Tooltip flottant */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            className="absolute -bottom-8 left-1/2 bg-black/80 border border-blue-500 px-6 py-2 rounded-full text-blue-400 font-bold z-30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          >
            ✨ Salif Ciss ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// --- Sous-composant TimelineItem ---
const TimelineItem = memo(({ item, isSelected, onSelect, index }) => (
  <motion.div
    onMouseEnter={() => onSelect(index)}
    onMouseLeave={() => onSelect(null)}
    className={`relative mb-8 p-6 cursor-pointer transition-all duration-300 backdrop-blur-md
      ${isSelected ? 'bg-blue-500/20 border-l-4' : 'bg-white/5 border-l-2'} 
      border-blue-500 rounded-r-lg`}
    whileHover={{ x: 10 }}
  >
    <div className="flex items-center gap-4 mb-2">
      <span className="text-2xl drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">{item.icon}</span>
      <span className="text-2xl font-black text-blue-400 font-mono tracking-tighter">
        {item.year}
      </span>
    </div>
    <p className={`text-sm md:text-base leading-relaxed ${isSelected ? 'text-white' : 'text-blue-200/70'}`}>
      {item.label}
    </p>
  </motion.div>
));

// --- Composant Principal ---
const About3D = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const timelineItems = useMemo(() => [
    { year: "2021", label: "Stage chez Volkeno - Développeur Frontend", icon: <Laptop size={24}/> },
    { year: "2024", label: "IBMS - Responsable IT / Développeur Full Stack", icon: <Rocket size={24}/> },
  ], []);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
    // Logique de téléchargement ici
  };

  return (
    <section className="relative min-h-screen w-full bg-[#000a12] text-white py-20 px-6 overflow-hidden font-sans">
      {/* Background Cyberpunk Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: `linear-gradient(#3399ff 1px, transparent 1px), linear-gradient(90deg, #3399ff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-blue-500 font-mono tracking-widest drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
            [ À PROPOS DE MOI ]
          </h2>
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4 animate-pulse" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Hologram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HolographicImage imageSrc="/LOGO1.png" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-blue-300 leading-relaxed font-light">
                <span className="text-blue-500 font-bold mr-2">{'>'}</span>
                Développeur passionné par l'innovation digitale, je conçois des 
                <span className="text-white font-semibold italic"> solutions web performantes </span> 
                et sur mesure.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Spécialisé dans les écosystèmes modernes (React, Next.js, Node), je transforme les visions complexes en produits fluides et scalables.
              </p>
            </div>

            {/* Timeline Area */}
            <div className="space-y-4 border-l border-blue-500/30 pl-6">
              {timelineItems.map((item, i) => (
                <TimelineItem 
                  key={i} 
                  item={item} 
                  index={i}
                  isSelected={selectedTimeline === i}
                  onSelect={setSelectedTimeline}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-6 pt-6">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 transition-all rounded-tl-xl rounded-br-xl flex items-center gap-3 font-mono font-bold overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                {isDownloading ? <span className="animate-spin">⏳</span> : <Download size={20} />}
                {isDownloading ? "CHARGEMENT..." : "TÉLÉCHARGER CV"}
              </button>

              <a
                href="#contact"
                className="px-8 py-4 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all rounded-tl-xl rounded-br-xl flex items-center gap-3 font-mono font-bold"
              >
                <Mail size={20} />
                CONTACTER
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global Animations via Tailwind Config ou Style tag pour la scanline */}
      <style>{`
        @keyframes scan {
          from { top: -100%; }
          to { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default About3D;