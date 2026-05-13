import { useState } from "react";
import { Mail, Phone, Linkedin, Send, Check, Loader2, User, AtSign, MessageSquare, AlertCircle } from "lucide-react";

const ContactBentoDark = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Remplace par ton appel API réel
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: "salifciss222@gmail.com", href: "mailto:salifciss222@gmail.com", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Phone, label: "Téléphone", value: "+221 77 227 49 87", href: "tel:+221772274987", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: Linkedin, label: "LinkedIn", value: "Salif Ciss", href: "https://linkedin.com/in/salif-ciss-672990267", color: "text-indigo-400", bg: "bg-indigo-500/10" }
  ];

  return (
    <section className="min-h-screen bg-[#000814] py-20 px-4 font-sans text-slate-300">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête */}
        <div className="mb-16 text-center md:text-left space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            PRÊT POUR LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">NEXT LEVEL ?</span>
          </h2>
          <p className="text-blue-400/60 font-mono tracking-widest text-sm uppercase">_Initialisation du module de communication</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Cartes d'info (Bento Small) */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {contactItems.map((item, i) => (
              <a 
                key={i} 
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:border-blue-500/50 transition-all duration-300 shadow-2xl"
              >
                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={22} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-white truncate">{item.value}</p>
              </a>
            ))}
          </div>

          {/* Formulaire (Bento Large) */}
          <div className="md:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
            
            {/* Décoration subtile en arrière-plan */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] pointer-events-none" />

            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                  <Check size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Transmission Reçue</h3>
                  <p className="text-slate-400">Le message a été injecté avec succès dans le système.</p>
                </div>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all text-sm font-bold border border-white/10"
                >
                  NOUVELLE_REQUÊTE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 ml-1 flex items-center gap-2">
                      <User size={14} /> Identité
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 ml-1 flex items-center gap-2">
                      <AtSign size={14} /> Canal Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                      placeholder="nom@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 ml-1 flex items-center gap-2">
                    <MessageSquare size={14} /> Contenu du message
                  </label>
                  <textarea
                    required
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all resize-none"
                    placeholder="Décrivez votre projet ou votre besoin..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs">
                    <AlertCircle size={16} />
                    Erreur de connexion. Veuillez réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <span className="uppercase tracking-[0.3em] text-sm">Transmettre_Data</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-16 flex justify-center">
            <div className="bg-white/5 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 flex items-center gap-4 text-xs font-mono tracking-tighter">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-slate-400 uppercase">Status:</span>
                <span className="text-cyan-400 font-bold">Disponible_pour_Freelance</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBentoDark;