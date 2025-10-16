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
          color: { value: "#ffffff" },
        },
        particles: {
          number: { value: 60 },
          size: { value: { min: 4, max: 8 }, random: true },
          shape: { type: "circle" },
          color: { value: ["#6366f1", "#a855f7", "#facc15", "#ec4899"] },
          opacity: { value: 0.4 },
          move: {
            enable: true,
            speed: 2,
            direction: "top",
            straight: false,
            outModes: { default: "out" },
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
