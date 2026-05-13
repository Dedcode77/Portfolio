import React from "react";
import { motion } from "framer-motion";
import { MoveRight, Box, Layers, Zap } from "lucide-react";

const CyberIndustrialAbout = () => {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] text-[#e5e5e5] py-20 px-6 font-mono overflow-hidden">
      
      {/* 1. Fond "Blueprint" (Grilles et mesures) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
      <div className="absolute top-10 left-10 text-[10px] text-zinc-700 vertical-text hidden md:block">
        CORE_SYSTEM_v4.0 // 14.752.00.1
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* EN-TÊTE : Style Dossier Technique */}
        <div className="border-b border-zinc-800 pb-10 mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <Zap size={14} fill="currentColor" />
              <span className="text-xs font-black tracking-widest uppercase">Status: Operational</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              Salif <br /> <span className="text-zinc-500">Ciss</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-xs mb-1">// SPECIALIZATION</p>
            <p className="text-xl font-bold uppercase tracking-tight">Full-Stack Architect</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* GAUCHE : Image avec "Viseurs" */}
          <div className="relative group">
            {/* Éléments de visée aux coins */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-yellow-500" />
            
            <div className="relative bg-zinc-900 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img 
                src="/LOGO1.png" 
                alt="Portrait Technique" 
                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              {/* Overlay de coordonnées */}
              <div className="absolute bottom-4 left-4 bg-black/80 p-2 text-[10px] border border-zinc-700">
                X: 45.002 / Y: 12.883
              </div>
            </div>
          </div>

          {/* DROITE : Contenu modulaire */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed border-l-4 border-yellow-500 pl-6 italic">
                "Le code n'est pas qu'une suite d'instructions, c'est l'architecture du futur. Je bâtis des fondations solides pour des ambitions sans limites."
              </p>
              <p className="text-zinc-500 leading-relaxed">
                Expert dans l'écosystème MERN et les solutions Cloud. Mon approche est basée sur l'efficacité brute et la maintenabilité à long terme. Pas de superflu, juste du résultat.
              </p>
            </div>

            {/* Cartes d'atouts (Style industriel) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 border border-zinc-800 hover:bg-white/10 transition-colors">
                <Box className="text-yellow-500 mb-4" />
                <h4 className="font-bold mb-2">MODULARITÉ</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-tighter">Composants réutilisables & Scalables</p>
              </div>
              <div className="p-6 bg-white/5 border border-zinc-800 hover:bg-white/10 transition-colors">
                <Layers className="text-yellow-500 mb-4" />
                <h4 className="font-bold mb-2">DÉPLOIEMENT</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-tighter">CI/CD & Cloud Infrastructure</p>
              </div>
            </div>

            {/* Bouton style "Alerte" */}
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 group text-yellow-500 font-black tracking-widest uppercase py-4 border-y border-zinc-800 hover:border-yellow-500 transition-colors"
            >
              Initialiser la connexion <MoveRight className="group-hover:translate-x-4 transition-transform" />
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CyberIndustrialAbout;