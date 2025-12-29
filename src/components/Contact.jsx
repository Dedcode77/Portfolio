import { useState } from "react";
import { Mail, Smartphone, BriefcaseBusiness } from "lucide-react";


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

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setSendError(false);

    try {
      const serviceId = "service_y6770h8";
      const templateId = "template_x3ocm2k";
      const publicKey = "XzWcGVv7BBmtNKG2d";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "salifciss222@gmail.com",
      };

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
    <>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3399ff, transparent);
          box-shadow: 0 0 20px #3399ff;
          animation: scan 8s linear infinite;
          opacity: 0.3;
          pointer-events: none;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }

        .spinner {
          border: 3px solid rgba(51, 153, 255, 0.3);
          border-top: 3px solid #3399ff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <section
        id="contact"
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #001a2e 0%, #002a3a 50%, #001520 100%)',
          padding: '5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          color: 'white'
        }}
      >
        {/* Scan lines */}
        <div className="scan-line" />
        <div className="scan-line" style={{ animationDelay: '4s' }} />

        {/* Grille de fond */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              top: `${i * 5}%`,
              left: 0,
              background: 'rgba(51, 153, 255, 0.05)'
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: 'absolute',
              width: '1px',
              height: '100%',
              left: `${i * 5}%`,
              top: 0,
              background: 'rgba(51, 153, 255, 0.05)'
            }}
          />
        ))}

        {/* Header */}
        <div className="animate-slideIn" style={{
          textAlign: 'center',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid #3399ff',
            borderRadius: '20px',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#66b3ff'
          }}>
            <span>✉️</span>
            <span>RESTONS_EN_CONTACT</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            color: '#3399ff',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textShadow: '0 0 30px rgba(51, 153, 255, 0.8)'
          }}>
            [ CONTACTEZ-MOI ]
          </h2>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(102, 179, 255, 0.8)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Une question ? Une opportunité ? Un projet ? N'hésitez pas à me contacter
          </p>
        </div>

        {/* Formulaire */}
        <div className="animate-slideIn" style={{
          position: 'relative',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxWidth: '700px',
          width: '100%',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          border: '2px solid rgba(51, 153, 255, 0.3)',
          zIndex: 10,
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          animationDelay: '0.2s'
        }}>
          {!submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Nom */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#66b3ff',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace'
                }}>
                  {'>'} NOM_COMPLET
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${errors.name ? '#ff4444' : 'rgba(51, 153, 255, 0.3)'}`,
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: 'monospace'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3399ff';
                    e.target.style.boxShadow = '0 0 20px rgba(51, 153, 255, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name ? '#ff4444' : 'rgba(51, 153, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.name && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ff4444',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    fontFamily: 'monospace'
                  }}>
                    <span>⚠️</span>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#66b3ff',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace'
                }}>
                  {'>'} ADRESSE_EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${errors.email ? '#ff4444' : 'rgba(51, 153, 255, 0.3)'}`,
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontFamily: 'monospace'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3399ff';
                    e.target.style.boxShadow = '0 0 20px rgba(51, 153, 255, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? '#ff4444' : 'rgba(51, 153, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.email && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ff4444',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    fontFamily: 'monospace'
                  }}>
                    <span>⚠️</span>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#66b3ff',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace'
                }}>
                  {'>'} VOTRE_MESSAGE
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Décrivez votre projet ou votre demande..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${errors.message ? '#ff4444' : 'rgba(51, 153, 255, 0.3)'}`,
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    resize: 'none',
                    fontFamily: 'monospace'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3399ff';
                    e.target.style.boxShadow = '0 0 20px rgba(51, 153, 255, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.message ? '#ff4444' : 'rgba(51, 153, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  {errors.message && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#ff4444',
                      fontSize: '0.875rem',
                      fontFamily: 'monospace'
                    }}>
                      <span>⚠️</span>
                      {errors.message}
                    </div>
                  )}
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'rgba(102, 179, 255, 0.6)',
                    marginLeft: 'auto',
                    fontFamily: 'monospace'
                  }}>
                    {formData.message.length} caractères
                  </span>
                </div>
              </div>

              {/* Erreur d'envoi */}
              {sendError && (
                <div style={{
                  background: 'rgba(255, 68, 68, 0.2)',
                  border: '1px solid rgba(255, 68, 68, 0.5)',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>⚠️</span>
                  <div>
                    <p style={{ color: '#ffcccc', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Erreur d'envoi
                    </p>
                    <p style={{ color: '#ffdddd', fontSize: '0.875rem' }}>
                      Une erreur s'est produite. Veuillez réessayer ou me contacter directement par email.
                    </p>
                  </div>
                </div>
              )}

              {/* Bouton Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: isLoading ? 'rgba(51, 153, 255, 0.5)' : 'linear-gradient(135deg, #3399ff, #0099cc)',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(51, 153, 255, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <span>📨</span>
                    Envoyer le message
                  </>
                )}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(0, 204, 102, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '3rem',
                border: '2px solid #00cc66',
                animation: 'glowPulse 2s ease-in-out infinite'
              }}>
                ✓
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: 'white',
                fontFamily: 'monospace'
              }}>
                Message envoyé !
              </h3>
              <p style={{
                color: 'rgba(102, 179, 255, 0.8)',
                marginBottom: '2rem',
                fontSize: '1rem'
              }}>
                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '2px solid rgba(51, 153, 255, 0.5)',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(51, 153, 255, 0.2)';
                  e.currentTarget.style.borderColor = '#3399ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.5)';
                }}
              >
                Envoyer un autre message
              </button>
            </div>
          )}
        </div>

        {/* Informations de contact */}
        <div className="animate-slideIn" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '4rem',
          maxWidth: '1000px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
          animationDelay: '0.4s'
        }}>
          {[
            {
              label: "Email",
              value: "salifciss222@gmail.com",
              href: "mailto:salifciss222@gmail.com",
              icon: <Mail />,
              color: "#3399ff",
            },
            {
              label: "Téléphone",
              value: "+221 77 227 49 87",
              href: "tel:+221772274987",
              icon: <Smartphone />,
              color: "#cc00ff",
            },
            {
              label: "LinkedIn",
              value: "Salif Ciss",
              href: "https://www.linkedin.com/in/salif-ciss-672990267",
              icon: <BriefcaseBusiness />,
              color: "#00cc66",
            },
          ].map(({ label, value, href, icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(51, 153, 255, 0.3)',
                borderRadius: '15px',
                padding: '1.5rem',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s',
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.boxShadow = `0 10px 40px ${color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(51, 153, 255, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                background: `${color}30`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                border: `2px solid ${color}`,
                transition: 'all 0.3s'
              }}>
                {icon}
              </div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#66b3ff',
                marginBottom: '0.5rem',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {label}
              </h4>
              <p style={{
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}>
                {value}
              </p>
            </a>
          ))}
        </div>

        {/* Effet vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
          pointerEvents: 'none'
        }} />
      </section>
    </>
  );
};

export default Contact;