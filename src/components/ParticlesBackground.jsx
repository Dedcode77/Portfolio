import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: { value: "transparent" },
          
        },
        particles: {
        color: { value: "#3399ff" }, // Bleu comme tes compétences
  lineLinked: { // Ajoute des lignes pour un effet "réseau/neuronal"
    enable: true,
    distance: 150,
    color: "#3399ff",
    opacity: 0.2,
    width: 1
  },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            bubble: {
              distance: 100,
              duration: 2,
              size: 10,
              opacity: 0.8,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
