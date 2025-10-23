import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Nom requis";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Email invalide";
    if (!formData.message.trim()) errs.message = "Message requis";
    if (formData.message.trim().length < 10)
      errs.message = "Message trop court (min. 10 caractères)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setSendError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSendError(false);

    try {
      // Configuration EmailJS
      const serviceId = "service_y6770h8"; // À remplacer
      const templateId = "template_x3ocm2k"; // À remplacer
      const publicKey = "XzWcGVv7BBmtNKG2d"; // À remplacer

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "salifciss222@gmail.com",
      };

      // Envoi via EmailJS
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: templateParams,
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSendError(true);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setSendError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-500 py-20 px-4 flex flex-col items-center justify-center min-h-screen overflow-hidden text-white"
    >
      {/* Fond animé */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* En-tête */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-700/20 rounded-full border border-purple-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <Mail className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">
            Restons en contact
          </span>
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-900 via-blue-400 to-blue-400 bg-clip-text text-transparent">
          Contactez-moi
        </h2>
        <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
          Une question ? Une opportunité ? Un projet ? N'hésitez pas à me
          contacter
        </p>
      </motion.div>

      {/* Formulaire */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12 border border-white/20 z-10"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Nom */}
              <div className="relative">
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Nom complet
                </label>
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full bg-white/5 border ${
                    errors.name ? "border-red-400" : "border-white/20"
                  } rounded-xl px-5 py-4 text-white placeholder-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition backdrop-blur-sm`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 text-red-400 text-sm mt-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Adresse email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full bg-white/5 border ${
                    errors.email ? "border-red-400" : "border-white/20"
                  } rounded-xl px-5 py-4 text-white placeholder-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition backdrop-blur-sm`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 text-red-400 text-sm mt-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div className="relative">
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Votre message
                </label>
                <motion.textarea
                  name="message"
                  rows="5"
                  placeholder="Décrivez votre projet ou votre demande..."
                  value={formData.message}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full bg-white/5 border ${
                    errors.message ? "border-red-400" : "border-white/20"
                  } rounded-xl px-5 py-4 text-white placeholder-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none backdrop-blur-sm`}
                />
                <div className="flex justify-between items-center mt-2">
                  <AnimatePresence>
                    {errors.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="text-xs text-indigo-300">
                    {formData.message.length} caractères
                  </span>
                </div>
              </div>

              {/* Erreur d'envoi */}
              <AnimatePresence>
                {sendError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-200 font-medium">Erreur d'envoi</p>
                      <p className="text-red-300 text-sm mt-1">
                        Une erreur s'est produite. Veuillez réessayer ou me
                        contacter directement par email.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bouton Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className={`w-full bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-indigo-700 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-400" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                Message envoyé !
              </h3>
              <p className="text-indigo-200 mb-8">
                Merci pour votre message. Je vous répondrai dans les plus brefs
                délais.
              </p>
              <motion.button
                onClick={() => setSubmitted(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition border border-white/20"
              >
                Envoyer un autre message
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Informations de contact */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          {
            label: "Email",
            value: "salifciss222@gmail.com",
            href: "mailto:salifciss222@gmail.com",
            icon: <Mail className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Téléphone",
            value: "+221 77 227 49 87",
            href: "tel:+221772274987",
            icon: <Phone className="w-6 h-6" />,
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "LinkedIn",
            value: "Salif Ciss",
            href: "https://www.linkedin.com/in/salif-ciss-672990267",
            icon: <Linkedin className="w-6 h-6" />,
            color: "from-blue-500 to-emerald-500",
          },
        ].map(({ label, value, href, icon, color }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition group"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}
            >
              {icon}
            </div>
            <h4 className="text-sm font-medium text-indigo-300 mb-1">
              {label}
            </h4>
            <p className="text-white font-semibold">{value}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Contact;
