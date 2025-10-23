import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, X, ChevronLeft, ChevronRight, ExternalLink, Shield } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Certification React Avancée",
    issuer: "OpenClassrooms",
    date: "Mars 2024",
    description: "Maîtrise avancée de React.js et écosystème moderne.",
    skills: ["React", "Hooks", "Context API", "Performance"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    color: "from-blue-500 to-cyan-500",
    certificateUrl: "https://openclassrooms.com/fr/course-certificate/...",
    verificationId: "OC-123456789"
  },
  {
    id: 2,
    title: "Développeur Web Full Stack",
    issuer: "Udemy",
    date: "Décembre 2023",
    description: "Développement complet front-end & back-end avec Node.js, React et MongoDB.",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    color: "from-purple-500 to-pink-500",
    certificateUrl: "https://udemy.com/certificate/...",
    verificationId: "UC-ABCD1234"
  },
  {
    id: 3,
    title: "Mobile App Developer",
    issuer: "Coursera",
    date: "Juin 2023",
    description: "Conception d'applications mobiles multiplateformes avec Flutter.",
    skills: ["Flutter", "Dart", "iOS", "Android"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    color: "from-green-500 to-emerald-500",
    certificateUrl: "https://coursera.org/verify/...",
    verificationId: "COURSERA-XYZ789"
  },
];

const CertificationsSlider = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = certifications.length - 1;
      if (newIndex >= certifications.length) newIndex = 0;
      return newIndex;
    });
  };

  const currentCert = certifications[currentIndex];

  return (
    <section
      id="certifications"
      className="relative min-h-screen py-20 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-500 text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500/20 rounded-full border border-purple-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Certifications Professionnelles</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-blue-400 bg-clip-text text-transparent">
            Mes Certifications
          </h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            Une reconnaissance concrète de mes compétences techniques et de mon engagement continu dans l'apprentissage
          </p>
        </motion.div>

        {/* Custom Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full max-w-3xl cursor-grab active:cursor-grabbing"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div
                    className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedCert(currentCert)}
                  >
                    {/* Image Container */}
                    <div className="relative h-80 overflow-hidden">
                      <motion.img
                        src={currentCert.image}
                        alt={currentCert.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${currentCert.color} opacity-40 mix-blend-overlay`} />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                          >
                            <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                              <div className="text-4xl">🔍</div>
                            </div>
                            <p className="text-white font-semibold">Cliquer pour agrandir</p>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                            {currentCert.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-indigo-300">
                            <span className="font-medium">{currentCert.issuer}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {currentCert.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-indigo-100 mb-6 leading-relaxed">
                        {currentCert.description}
                      </p>

                      {/* Verification ID */}
                      {currentCert.verificationId && (
                        <div className="mb-4 flex items-center gap-2 text-sm text-indigo-300">
                          <Shield className="w-4 h-4" />
                          <span>ID: {currentCert.verificationId}</span>
                        </div>
                      )}

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {currentCert.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${currentCert.color} text-white shadow-lg`}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>

                      {/* Certificate Link */}
                      {currentCert.certificateUrl && (
                        <motion.a
                          href={currentCert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${currentCert.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Voir le certificat
                        </motion.a>
                      )}
                    </div>

                    {/* Decorative Corner */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${currentCert.color} opacity-20 blur-2xl`} />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all duration-300 border border-white/20"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all duration-300 border border-white/20"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {certifications.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-gradient-to-r from-indigo-500 to-blue-4' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedCert.title}
                  </h3>
                  <p className="text-lg text-gray-200 mb-4">
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                  
                  {/* Verification and Link in Modal */}
                  <div className="flex flex-wrap items-center gap-4">
                    {selectedCert.verificationId && (
                      <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <Shield className="w-4 h-4" />
                        <span>{selectedCert.verificationId}</span>
                      </div>
                    )}
                    
                    {selectedCert.certificateUrl && (
                      <motion.a
                        href={selectedCert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r ${selectedCert.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Vérifier le certificat
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSlider;