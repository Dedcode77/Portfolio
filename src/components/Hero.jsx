import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const titleRef = useRef(null);
  const glitchRef = useRef(null);
  const typingRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Animation fond gradient dynamique
    gsap.to(bgRef.current, {
      backgroundPosition: "200% center",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

    // Timeline principale
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Titre glitch + néon
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -60, scale: 0.9, filter: "blur(6px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2 }
    )
      .to(
        glitchRef.current,
        {
          duration: 0.2,
          x: 3,
          y: -1,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=0.5"
      )
      .to(
        glitchRef.current,
        {
          duration: 0.2,
          x: -3,
          y: 1,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=0.4"
      );

    // Typing effet digital scan
    const fullText = typingRef.current.textContent;
    typingRef.current.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < fullText.length) {
        // Ajout progressif avec bruit (mix-blend-mode pour effet techno)
        typingRef.current.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeWriter, 45);
      }
    }
    typeWriter();

    // Texte descriptif et bouton apparition
    tl.fromTo(
      typingRef.current.parentElement.nextElementSibling,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    ).fromTo(
      buttonRef.current,
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      "-=0.8"
    );
  }, []);

  return (
    <section
      id="hero"
      ref={bgRef}
      className="relative h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-r from-indigo-900 via-blue-900 to-cyan-700 bg-[length:400%_400%] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <h1
        ref={titleRef}
        className="text-6xl md:text-8xl font-extrabold text-white tracking-widest select-none relative"
      >
        Salut, moi c’est{" "}
        <span
          ref={glitchRef}
          className="text-neon relative inline-block"
          aria-label="Dedcode 77"
        >
          <span
            ref={typingRef}
            className="text-neon typing"
            style={{ mixBlendMode: "screen" }}
          >
            Dedcode 77
          </span>
          {/* Glitch layers */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-blue-400 opacity-50 clip-[rect(10px,9999px,35px,0)]"
            style={{ mixBlendMode: "screen" }}
          >
            Dedcode 77
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-cyan-300 opacity-50 clip-[rect(60px,9999px,80px,0)]"
            style={{ mixBlendMode: "screen" }}
          >
            Dedcode 77
          </span>
        </span>
      </h1>

      <p className="mt-8 max-w-xl text-lg md:text-2xl font-light text-blue-300 tracking-wide drop-shadow-lg">
        Développeur web & mobile passionné, je crée des expériences digitales
        futuristes et innovantes, alliant design néon et technologies de pointe.
      </p>

      <a
        ref={buttonRef}
        href="#projects"
        className="mt-12 px-12 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 shadow-[0_0_20px_#2563eb] hover:shadow-[0_0_40px_#2563eb] transition-transform duration-300 transform hover:scale-[1.1] hover:brightness-110"
      >
        Voir mes projets
      </a>

      <style jsx>{`
        .text-neon {
          color: #00e5ff;
          text-shadow:
            0 0 5px #00e5ff,
            0 0 10px #00e5ff,
            0 0 20px #00bcd4,
            0 0 30px #0097a7,
            0 0 40px #00838f;
          font-weight: 900;
          user-select: none;
          position: relative;
        }

        /* Clip rectangles pour glitch */
        .clip-[rect(10px,9999px,35px,0)] {
          clip: rect(10px, 9999px, 35px, 0);
        }
        .clip-[rect(60px,9999px,80px,0)] {
          clip: rect(60px, 9999px, 80px, 0);
        }

        .typing {
          letter-spacing: 0.12em;
          font-variant-east-asian: full-width;
          mix-blend-mode: screen;
        }
      `}</style>
    </section>
  );
};

export default Hero;
