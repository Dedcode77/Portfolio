import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Nom requis";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Email invalide";
    if (!formData.message.trim()) errs.message = "Message requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Simule envoi
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-24 px-6 flex flex-col items-center justify-center min-h-screen overflow-hidden text-white"
    >
      {/* Fond animé */}
      <motion.div
        className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-blue-600 opacity-40 filter blur-3xl animate-blob"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-25%] w-[700px] h-[700px] rounded-full bg-indigo-600 opacity-30 filter blur-3xl animate-blob animation-delay-2000"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contenu */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-lg max-w-2xl w-full p-10 border border-white border-opacity-20"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center tracking-wide drop-shadow-md">
          Contactez-moi
        </h2>
        <p className="text-center text-indigo-300 mb-10 max-w-md mx-auto">
          Une question ? Une collaboration ? N’hésitez pas à m’écrire un message.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "message"].map((field) => (
              <div key={field} className="flex flex-col relative">
                {field !== "message" ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field === "name" ? "Votre nom" : field === "email" ? "Votre email" : ""}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`bg-transparent border border-white border-opacity-30 rounded-lg px-5 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors[field] ? "border-blue-500" : ""
                    }`}
                  />
                ) : (
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Votre message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`bg-transparent border border-white border-opacity-30 rounded-lg px-5 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${
                      errors.message ? "border-blue-500" : ""
                    }`}
                  />
                )}
                {errors[field] && (
                  <span className="text-blue-400 text-sm mt-1 absolute bottom-[-18px] left-5">
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #2563EB" }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full shadow-lg transition"
            >
              Envoyer
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-white-400 text-2xl font-semibold"
          >
            Merci pour votre message ! Je vous répondrai rapidement.
          </motion.div>
        )}
      </motion.div>

      {/* Infos contact */}
      <motion.div
        className="flex gap-10 mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {[
          {
            label: "Email",
            value: "salifciss222@gmail.com",
            href: "mailto:salifciss222@gmail.com",
            icon: (
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16v16H4z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            ),
          },
          {
            label: "Téléphone",
            value: "+221 77 227 49 87",
            href: "tel:+221772274987",
            icon: (
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 13.1 13.1 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45 13.1 13.1 0 0 0 2.81.7 2 2 0 0 1 1.72 2z" />
              </svg>
            ),
          },
          {
            label: "LinkedIn",
            value: "Salif Ciss",
            href: "www.linkedin.com/in/salif-ciss-672990267",
            icon: (
              <svg
                className="w-8 h-8 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.13 8.67h4.7v13.36h-4.7zM14.75 8.67c-2.44 0-3.83 1.35-4.48 2.29V8.67h-4.7v13.36h4.7v-7.42c0-1.99 1.56-3.57 3.59-3.57 2.04 0 2.14 1.94 2.14 4.13v6.86h4.7v-8.15c0-4.38-2.34-6.38-5.95-6.38z" />
              </svg>
            ),
          },
        ].map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-1 hover:text-pink-400 transition"
            aria-label={label}
          >
            {icon}
            <span className="text-sm select-text">{value}</span>
          </a>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
          }
          50% {
            border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%;
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Contact;
