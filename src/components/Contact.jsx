import { useState } from "react";
import { Mail, Smartphone, BriefcaseBusiness, Send, CheckCircle2, AlertTriangle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Nom requis";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Email invalide";
    if (formData.message.trim().length < 10) errs.message = "Message trop court (min. 10 caractères)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    setSendError(false);
  };

  // --- LOGIQUE BACKEND AJOUTÉE ICI ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSendError(false);

    try {
      // On appelle l'URL locale de Netlify Functions
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSendError(true);
      }
    } catch (error) {
      setSendError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // -----------------------------------

  const contactInfo = [
    { label: "Email", value: "salifciss222@gmail.com", href: "mailto:salifciss222@gmail.com", icon: Mail, color: "hover:border-blue-500 hover:shadow-blue-500/20", iconBg: "bg-blue-500/20", iconCol: "text-blue-400" },
    { label: "Téléphone", value: "+221 77 227 49 87", href: "tel:+221772274987", icon: Smartphone, color: "hover:border-purple-500 hover:shadow-purple-500/20", iconBg: "bg-purple-500/20", iconCol: "text-purple-400" },
    { label: "LinkedIn", value: "Salif Ciss", href: "https://www.linkedin.com/in/salif-ciss-672990267", icon: BriefcaseBusiness, color: "hover:border-green-500 hover:shadow-green-500/20", iconBg: "bg-green-500/20", iconCol: "text-green-400" },
  ];

  return (
    <>
      <style>{`
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .animate-scan { animation: scan 8s linear infinite; }
        .clip-path-cyber { clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px)); }
        .clip-path-btn { clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); }
      `}</style>

      <section id="contact" className="relative min-h-screen bg-gradient-to-br from-[#001a2e] via-[#002a3a] to-[#001520] py-20 px-4 overflow-hidden text-white flex flex-col items-center justify-center font-mono">
        
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3399ff] opacity-30 animate-scan" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
          <div className="absolute inset-0 grid grid-cols-12 opacity-5">
            {[...Array(12)].map((_, i) => <div key={i} className="border-r border-blue-400" />)}
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-black/60 border border-blue-500 rounded-full text-blue-400 text-sm">
            <span>✉️</span> RESTONS_EN_CONTACT
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-4 text-blue-500 tracking-widest drop-shadow-[0_0_30px_rgba(51,153,255,0.8)] uppercase">
            [ Contactez-moi ]
          </h2>
          <p className="text-blue-300/80 max-w-2xl mx-auto text-lg">
            Une question ? Une opportunité ? Un projet ? N'hésitez pas à me contacter.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-2xl bg-black/60 backdrop-blur-xl border-2 border-blue-500/30 p-8 md:p-12 clip-path-cyber shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "NOM_COMPLET", name: "name", type: "text", placeholder: "Votre nom" },
                { label: "ADRESSE_EMAIL", name: "email", type: "email", placeholder: "votre@email.com" }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm text-blue-400 mb-2 uppercase tracking-tighter">{"> "} {field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full bg-black/50 border ${errors[field.name] ? 'border-red-500' : 'border-blue-500/30'} rounded-lg p-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                  />
                  {errors[field.name] && <span className="text-red-500 text-xs mt-1 block">⚠️ {errors[field.name]}</span>}
                </div>
              ))}

              <div>
                <label className="block text-sm text-blue-400 mb-2 uppercase tracking-tighter">{"> "} VOTRE_MESSAGE</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet..."
                  className={`w-full bg-black/50 border ${errors.message ? 'border-red-500' : 'border-blue-500/30'} rounded-lg p-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message && <span className="text-red-500 text-xs block">⚠️ {errors.message}</span>}
                  <span className="text-blue-400/50 text-[10px] ml-auto">{formData.message.length} caractères</span>
                </div>
              </div>

              {sendError && (
                <div className="flex gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  <AlertTriangle className="shrink-0" />
                  <p>Erreur d'envoi. Veuillez réessayer ou utiliser l'email direct.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full group relative flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 font-bold uppercase tracking-widest clip-path-btn transition-all active:scale-95 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]'}`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold">Message reçu !</h3>
              <p className="text-blue-300/80">Je reviens vers vous dans les plus brefs délais.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-transparent border-2 border-blue-500/50 hover:bg-blue-500/10 transition-colors clip-path-btn"
              >
                Envoyer un autre
              </button>
            </div>
          )}
        </div>

        {/* Contact Info Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-6 bg-black/40 backdrop-blur-md border border-blue-500/20 clip-path-cyber transition-all duration-300 flex flex-col items-center text-center ${info.color}`}
            >
              <div className={`w-12 h-12 ${info.iconBg} ${info.iconCol} rounded-full flex items-center justify-center mb-4 border border-current shadow-inner group-hover:scale-110 transition-transform`}>
                <info.icon size={20} />
              </div>
              <span className="text-[10px] text-blue-400 tracking-[0.2em] mb-1 uppercase">{info.label}</span>
              <span className="text-sm font-semibold truncate w-full">{info.value}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default Contact;