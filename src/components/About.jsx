import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

// Cube interactif avec léger mouvement au survol
function RotatingCube() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useTexture("src/assets/photo_2025-07-08_16-00-44.jpg");

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    if (hovered) {
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 4) * 0.05;
    } else {
      meshRef.current.rotation.z = 0;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={2}
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      // cursor pointer sur hover
      style={{ cursor: hovered ? "pointer" : "auto" }}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.7}
        roughness={0.1}
        envMapIntensity={1}
      />
      <mesh scale={[2.05, 2.05, 2.05]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#7c1fff" transparent opacity={0.01} />
      </mesh>
    </mesh>
  );
}

const timelineItems = [
  { year: "2021", label: "Début stage chez Volkeno - Développeur Frontend" },
  { year: "2024", label: "Debut chez IBMS - Responsable IT / Developpeur Full Stack " },
];

const About3D = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-black via-indigo-900 to-purple-900 text-white p-8 overflow-hidden">
      {/* Background animé avec particules */}
      <ParticlesBackground />

      <h2 className="text-5xl font-extrabold mb-16  text-center max-w-xl relative z-10 animate-pulse">
        À propos de moi
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 lg:gap-48 ...">

        <div className="w-80 h-80 bg-black rounded-xl shadow-2xl overflow-hidden">
          <Canvas shadows camera={{ position: [3, 3, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.9}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <RotatingCube />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="max-w-md space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-indigo-300 text-lg leading-relaxed tracking-wide"
          >
            Développeur passionné par l'innovation digitale, je conçois des solutions web performantes et sur mesure qui allient excellence technique et expérience utilisateur remarquable. De la conception à la mise en production, je transforme des idées en applications modernes, scalables et intuitives.
Spécialisé dans les technologies front-end et back-end de pointe, je m'engage à créer des interfaces élégantes et des architectures robustes qui répondent aux défis du web d'aujourd'hui. Chaque projet est une opportunité d'explorer de nouvelles approches et de repousser les limites du possible.
Découvrez ci-dessous les projets et expériences qui jalonnent mon parcours.
          </motion.p>

          {/* Timeline verticale avec points animés */}
          <div className="relative border-l-4 border-indigo-600 pl-20 space-y-10">
  {timelineItems.map(({ year, label }, i) => (
    <motion.div
      key={year}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.3 }}
      className="relative cursor-pointer group"
      onClick={() => alert(`${year}: ${label}`)}
    >
      {/* Cercles des années positionnés proprement à gauche */}
      <span className="absolute -left-12 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg transition-transform group-hover:scale-110">
        {year}
      </span>

      {/* Texte de description */}
      <p className="text-lg hover:text-indigo-400 transition">{label}</p>

      {/* Point lumineux animé (effet pulse derrière le cercle) */}
      <span className="absolute -left-[28px] top-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-400 rounded-full animate-ping opacity-70 pointer-events-none"></span>
    </motion.div>
  ))}
</div>


          {/* Boutons actions */}
          <div className="mt-12 flex gap-6">
            <a
              href="/src/assets/CV_Salif_Ciss (2).pdf"
              download
              className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full font-semibold shadow-lg text-white text-center"
            >
              Télécharger mon CV
            </a>
            <a
              href="#contact"
              className="bg-transparent border border-indigo-600 hover:bg-indigo-600 hover:text-white transition px-6 py-3 rounded-full font-semibold text-indigo-600 text-center"
            >
              Me contacter
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .neon-text {
          color: #7c1fff;
          text-shadow:
            0 0 8px #7c1fff,
            0 0 20px #7c1fff,
            0 0 30px #7c1fff,
            0 0 50px #7c1fff,
            0 0 80px #7c1fff;
        }
      `}</style>
    </section>
  );
};

// Background particules simple (à mettre dans un fichier à part si tu veux)
const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {/* Simple animation de particules avec des cercles animés */}
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="20%"
          cy="30%"
          r="3"
          fill="#7c1fff"
          className="animate-pulse"
        />
        <circle
          cx="50%"
          cy="50%"
          r="2"
          fill="#a78bfa"
          className="animate-ping"
        />
        <circle
          cx="80%"
          cy="70%"
          r="4"
          fill="#4c1d95"
          className="animate-pulse delay-200"
        />
        {/* Tu peux ajouter d'autres cercles animés */}
      </svg>
    </div>
  );
};

export default About3D;
