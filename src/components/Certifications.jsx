// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-coverflow";

// const certifications = [
//   {
//     id: 1,
//     title: "Certification React Avancée",
//     issuer: "OpenClassrooms",
//     date: "Mars 2024",
//     description: "Maîtrise avancée de React.js et écosystème moderne.",
//     image: "src/assets/boliviainteligente-jzzbCEMcdtM-unsplash.jpg",
//   },
//   {
//     id: 2,
//     title: "Développeur Web Full Stack",
//     issuer: "Udemy",
//     date: "Décembre 2023",
//     description:
//       "Développement complet front-end & back-end avec Node.js, React et MongoDB.",
//     image: "src/assets/boliviainteligente-AgSZuXX3GCU-unsplash.jpg",
//   },
//   {
//     id: 3,
//     title: "Mobile App Developer",
//     issuer: "Coursera",
//     date: "Juin 2023",
//     description:
//       "Conception d'applications mobiles multiplateformes avec Flutter.",
//     image: "src/assets/boliviainteligente-jzzbCEMcdtM-unsplash.jpg",
//   },
// ];

// const CertificationsSlider = () => {
//   const [selectedCert, setSelectedCert] = useState(null);

//   return (
//     <section
//       id="certifications"
//       className="relative py-20 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900 text-white"
//     >
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-extrabold  mb-4">Mes Certifications</h2>
//           <p className="text-lg text-indigo-200">
//             Une reconnaissance concrète de mes compétences techniques et académiques.
//           </p>
//         </div>

//         <Swiper
//           modules={[Navigation, Pagination, EffectCoverflow]}
//           navigation
//           pagination={{ clickable: true }}
//           effect="coverflow"
//           centeredSlides
//           loop
//           slidesPerView={1.2}
//           spaceBetween={30}
//           coverflowEffect={{ rotate: 40, stretch: 0, depth: 200, modifier: 1, slideShadows: true }}
//           className="w-full max-w-4xl"
//         >
//           {certifications.map((cert) => (
//             <SwiperSlide key={cert.id}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
//                 onClick={() => setSelectedCert(cert)}
//               >
//                 <img
//                   src={cert.image}
//                   alt={cert.title}
//                   className="w-full h-72 object-cover"
//                 />
//                 <div className="p-6 text-white">
//                   <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
//                   <p className="text-sm text-indigo-300">
//                     {cert.issuer} • <span className="italic">{cert.date}</span>
//                   </p>
//                   <p className="text-sm mt-2 text-indigo-100">{cert.description}</p>
//                 </div>
//               </motion.div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* MODALE ZOOM */}
//       <AnimatePresence>
//         {selectedCert && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedCert(null)}
//           >
//             <motion.img
//               src={selectedCert.image}
//               alt={selectedCert.title}
//               className="max-w-3xl w-full rounded-xl shadow-2xl border-4 border-white"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               onClick={(e) => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         .neon-text {
//           text-shadow:
//             0 0 5px #a78bfa,
//             0 0 15px #8b5cf6,
//             0 0 25px #7c3aed,
//             0 0 40px #6d28d9;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CertificationsSlider;
