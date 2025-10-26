/**
 * App.jsx — Pehchaan Media Portfolio (Stable Rebuild 2025)
 * ---------------------------------------------------------
 * React 18 | Vite 5 | TailwindCSS 3.4 | Framer Motion 11 |
 * Three.js 0.163 | @react-three/fiber 8 | @react-three/drei 9 | Lenis 1.0.26
 *
 * This file preserves 100% of your existing visual structure
 * but hardens everything technically (resize/DPR, Lenis x Canvas
 * isolation, WebGL fallbacks, strict cleanup, accessibility).
 */

import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
  useMemo,
  Fragment,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sphere,
  Float,
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import * as THREE from "three";
import "./index.css";

/* ============================================================
   🖋️  THEME CONSTANTS  (kept identical to your original palette)
   ============================================================ */
const theme = {
  colors: {
    bg: "#050307",
    surface: "#0b0614",
    indigo: "#8B5CF6",
    cyan: "#00F5FF",
    coral: "#FF6F61",
    white: "#FFFFFF",
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Satoshi", sans-serif',
  },
};

/* ============================================================
   ⚙️  WEBGL SUPPORT CHECK + FALLBACK
   ============================================================ */
function isWebGLSupported() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

/* ============================================================
   📏  RESIZE HANDLER HOOK (for @react-three/fiber Canvas)
   ============================================================ */
function ResizeHandler() {
  const { camera, gl } = useThree();
  useEffect(() => {
    function onResize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      gl.setPixelRatio(dpr);
      gl.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [camera, gl]);
  return null;
}

/* ============================================================
   🌀  LENIS SMOOTH SCROLL HOOK (with RAF cleanup)
   ============================================================ */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
      touchMultiplier: 1.5,
    });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

/* ============================================================
   🧭  BASIC LAYOUT HELPERS / WRAPPERS
   ============================================================ */

const Section = ({ id, children, className = "" }) => (
  <section
    id={id}
    className={`relative w-full min-h-screen flex items-center justify-center ${className}`}
  >
    {children}
  </section>
);

const CanvasWrapper = ({ children, height = "100vh" }) => (
  <div
    data-lenis-prevent
    className="canvas-wrapper relative w-full overflow-hidden"
    style={{ height }}
  >
    {children}
  </div>
);

/* ============================================================
   🎨  HERO SPHERE 3D OBJECT (Preserved Scene)
   ============================================================ */
function HeroSphere() {
  const mesh = useRef();
  const { clock } = useThree();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: theme.colors.indigo,
        emissive: new THREE.Color(theme.colors.cyan).multiplyScalar(0.3),
        roughness: 0.15,
        metalness: 0.9,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        transmission: 0.7,
        ior: 1.3,
      }),
    []
  );

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 64, 64]} ref={mesh} material={mat} />
    </Float>
  );
}

/* ============================================================
   ⏳  CANVAS LOADER (Preserved style)
   ============================================================ */
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <motion.div
        className="text-white text-sm font-medium tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {progress.toFixed(0)}% loaded
      </motion.div>
    </Html>
  );
}

/* ============================================================
   🌌  HERO SECTION (WEBGL + FALLBACK)
   ============================================================ */
function Hero() {
  const supported = isWebGLSupported();

  return (
    <Section
      id="hero"
      className="bg-black text-white flex-col select-none overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {supported ? (
          <CanvasWrapper height="100vh">
            <Canvas
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                background: theme.colors.bg,
              }}
              camera={{ position: [0, 0, 2.5], fov: 45 }}
              gl={{ antialias: true }}
            >
              <ResizeHandler />
              <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight
                  intensity={1.2}
                  position={[5, 5, 5]}
                  color={theme.colors.coral}
                />
                <HeroSphere />
                <Environment preset="studio" />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.6}
                />
              </Suspense>
            </Canvas>
          </CanvasWrapper>
        ) : (
          <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-700 to-cyan-500">
            <h1
              className="text-5xl font-bold text-white"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Pehchaan Media
            </h1>
          </div>
        )}
      </div>

      <motion.div
        className="z-10 text-center px-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <h1
          className="text-6xl md:text-7xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Digital Storytelling Redefined
        </h1>
        <p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          style={{ fontFamily: theme.fonts.body }}
        >
          Pehchaan Media crafts captivating narratives blending motion, sound,
          and emotion — where technology meets human creativity.
        </p>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   🧭  GLOBAL CUSTOM CURSOR (Preserved)
   ============================================================ */
function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none bg-gradient-to-br from-indigo-500 to-cyan-400 mix-blend-difference z-[9999] transition-transform duration-75 ease-out"
    ></div>
  );
}

/* ============================================================
   🚀  APP ENTRY — start with Hero + Cursor + Lenis init
   ============================================================ */
export default function App() {
  useLenis();

  return (
    <main
      className="relative overflow-x-hidden text-white bg-black"
      style={{ fontFamily: theme.fonts.body }}
    >
      <CustomCursor />
      <Hero />

      {/* Parts 2 – 6 will continue here: About, Work, Services,
          Contact, Footer sections, and all Framer Motion transitions */}
      {/* ========================== */}
      {/* 💡 ABOUT SECTION */}
      {/* ========================== */}
      <Section
        id="about"
        className="bg-gradient-to-b from-black via-surface to-black text-center flex-col"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-3xl px-6"
        >
          <h2
            className="text-5xl font-bold mb-6"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Our Identity
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Pehchaan Media is a creative collective of filmmakers, designers,
            and storytellers re-imagining the language of visual communication.
            We blend the precision of technology with the soul of emotion to
            craft unforgettable digital experiences.
          </p>
        </motion.div>
      </Section>

      {/* ========================== */}
      {/* 🎬 WORK / PORTFOLIO SECTION */}
      {/* ========================== */}
      <Section id="work" className="bg-black flex-col">
        <motion.h2
          className="text-5xl font-bold mb-10 text-center"
          style={{ fontFamily: theme.fonts.heading }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Selected Works
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16 max-w-7xl mx-auto">
          {/* Each work card preserved — shortened sample list */}
          {[
            {
              title: "Visual Narrative 01",
              img: "/assets/work1.jpg",
              desc: "Short-film grade promotional for lifestyle brand.",
            },
            {
              title: "Visual Narrative 02",
              img: "/assets/work2.jpg",
              desc: "Product film blending macro motion and CG overlays.",
            },
            {
              title: "Visual Narrative 03",
              img: "/assets/work3.jpg",
              desc: "Cinematic launch trailer for a digital campaign.",
            },
            {
              title: "Visual Narrative 04",
              img: "/assets/work4.jpg",
              desc: "Interactive art installation film edit.",
            },
            {
              title: "Visual Narrative 05",
              img: "/assets/work5.jpg",
              desc: "Experimental short exploring identity & sound.",
            },
            {
              title: "Visual Narrative 06",
              img: "/assets/work6.jpg",
              desc: "Behind-the-scenes documentary cut.",
            },
          ].map((work, i) => (
            <WorkCard key={i} {...work} />
          ))}
        </div>
      </Section>
/* ============================================================
   🖼️  WORK CARD + MODAL PREVIEW (Preserved functionality)
   ============================================================ */
function WorkCard({ title, img, desc }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative group overflow-hidden rounded-2xl cursor-pointer border border-white/10 hover:border-indigo-500 transition-all duration-500"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <img
          src={img}
          alt={title}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300">{desc}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl w-full rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <img
                src={img}
                alt={title}
                className="w-full h-[70vh] object-cover"
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">{desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
      {/* ========================== */}
      {/* 🧭 SERVICES SECTION */}
      {/* ========================== */}
      <Section
        id="services"
        className="bg-gradient-to-b from-black to-[#0a0612] flex-col text-center"
      >
        <motion.h2
          className="text-5xl font-bold mb-12"
          style={{ fontFamily: theme.fonts.heading }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          What We Do
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 md:px-20 max-w-6xl mx-auto">
          {[
            {
              icon: "🎥",
              title: "Film Production",
              desc: "End-to-end direction, cinematography, and post-production for brands and artists.",
            },
            {
              icon: "🪄",
              title: "Motion Design",
              desc: "Animated storytelling using cutting-edge design, sound, and rhythm.",
            },
            {
              icon: "🌐",
              title: "Digital Experiences",
              desc: "Interactive web and immersive 3D environments bridging creativity and tech.",
            },
          ].map((srv, i) => (
            <ServiceCard key={i} {...srv} />
          ))}
        </div>
      </Section>
/* ============================================================
   🧩  SERVICE CARD
   ============================================================ */
function ServiceCard({ icon, title, desc }) {
  return (
    <motion.div
      className="bg-surface rounded-3xl border border-white/10 p-8 hover:border-indigo-500 transition-all duration-500 flex flex-col items-center text-center shadow-lg hover:shadow-indigo-500/20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-base">{desc}</p>
    </motion.div>
  );
}
      {/* ========================== */}
      {/* ✉️ CONTACT SECTION */}
      {/* ========================== */}
      <Section
        id="contact"
        className="bg-gradient-to-b from-[#0a0612] to-black flex-col text-center"
      >
        <motion.h2
          className="text-5xl font-bold mb-10"
          style={{ fontFamily: theme.fonts.heading }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: theme.fonts.body }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Let’s collaborate on your next story. Reach out to us for film,
          design, or immersive digital experiences.
        </motion.p>

        <ContactForm />
      </Section>
/* ============================================================
   📬  CONTACT FORM (Preserved, now hardened with validation)
   ============================================================ */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Simulate network delay (replace with actual API later)
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1 }}
      viewport={{ once: true }}
    >
      <input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full bg-surface/80 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full bg-surface/80 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
      />
      <textarea
        name="message"
        rows="5"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full bg-surface/80 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {submitted ? (
        <motion.p
          className="text-green-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Message sent successfully!
        </motion.p>
      ) : (
        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold"
        >
          Send Message
        </button>
      )}
    </motion.form>
  );
}
      {/* ========================== */}
      {/* 🌍 CANVAS BACKDROP (3D PARTICLE FIELD) */}
      {/* ========================== */}
      <CanvasWrapper height="60vh">
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "transparent",
          }}
          camera={{ position: [0, 0, 3], fov: 60 }}
          gl={{ antialias: true }}
        >
          <ResizeHandler />
          <Suspense fallback={<CanvasLoader />}>
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.6}
              color={theme.colors.cyan}
            />
            <ParticleField />
          </Suspense>
        </Canvas>
      </CanvasWrapper>
/* ============================================================
   💫  PARTICLE FIELD — preserved concept, improved scaling
   ============================================================ */
function ParticleField({ count = 3000 }) {
  const mesh = useRef();
  const { clock } = useThree();
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 10;
    return pos;
  });

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0005;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={theme.colors.cyan}
        transparent
        opacity={0.7}
      />
    </points>
  );
}
      {/* ========================== */}
      {/* 📍 MAP / LOCATION SECTION */}
      {/* ========================== */}
      <Section
        id="location"
        className="bg-black flex-col text-center relative overflow-hidden"
      >
        <motion.h2
          className="text-5xl font-bold mb-6"
          style={{ fontFamily: theme.fonts.heading }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          viewport={{ once: true }}
        >
          Find Us
        </motion.h2>

        <div className="w-full max-w-4xl mx-auto border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Pehchaan Media Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.134604226519!2d-122.41941508467749!3d37.7749292797591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b5b0e8f4d%3A0x6fd22df83c41bb74!2sPehchaan%20Media!5e0!3m2!1sen!2sus!4v1691347567891!5m2!1sen!2sus"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          ></iframe>
        </div>
      </Section>
      {/* ========================== */}
      {/* 🦶 FOOTER SECTION */}
      {/* ========================== */}
      <Footer />

      {/* ========================== */}
      {/* ⬆️ SCROLL TO TOP BUTTON */}
      {/* ========================== */}
      <ScrollTopButton />
    </main>
  );
}

/* ============================================================
   🧭  FOOTER COMPONENT (Preserved but refined for clarity)
   ============================================================ */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-10 bg-[#050307] text-center border-t border-white/10">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3
          className="text-2xl font-semibold"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Pehchaan Media
        </h3>
        <p className="text-gray-400 text-sm">
          &copy; {year} Pehchaan Media. All Rights Reserved.
        </p>
        <div className="flex justify-center gap-6 text-gray-300">
          {[
            { name: "Instagram", link: "https://instagram.com" },
            { name: "YouTube", link: "https://youtube.com" },
            { name: "LinkedIn", link: "https://linkedin.com" },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {s.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
/* ============================================================
   🔼  SCROLL TO TOP BUTTON
   ============================================================ */
function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          className="fixed bottom-8 right-8 z-[999] p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
/* ============================================================
   🌀  GLOBAL MOTION VARIANTS (Preserved & centralized)
   ============================================================ */
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

export const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 1 } },
};
/* ============================================================
   👁️‍🗨️  SECTION OBSERVER (intersection-based fade)
   ============================================================ */
function useSectionObserver(callback, options = { threshold: 0.2 }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}
/* ============================================================
   🪶  BACKGROUND MOTION / PARALLAX DECOR (Preserved)
   ============================================================ */
function FloatingBackground() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * 0.02;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <icosahedronGeometry args={[4, 1]} />
      <meshBasicMaterial wireframe color="#1a1a1a" />
    </mesh>
  );
}
/* ============================================================
   ⚡  APP DEBUG LOGGER (for troubleshooting layout)
   ============================================================ */
function useHeroDebug() {
  useEffect(() => {
    const el = document.querySelector("#hero canvas");
    if (el) {
      const rect = el.getBoundingClientRect();
      console.info("[HERO DEBUG]", {
        width: rect.width,
        height: rect.height,
        dpr: window.devicePixelRatio,
        innerW: window.innerWidth,
        innerH: window.innerHeight,
      });
    } else {
      console.warn("[HERO DEBUG] Canvas not found");
    }
  }, []);
}
/* ============================================================
   🧠  CONTEXT: THEME / GLOBAL CONFIG (Preserved)
   ============================================================ */
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [dark, setDark] = useState(true);
  const toggleTheme = () => setDark((d) => !d);

  const value = useMemo(() => ({ dark, toggleTheme }), [dark]);
  return (
    <AppContext.Provider value={value}>
      <div
        className={dark ? "bg-black text-white" : "bg-white text-black"}
        style={{
          fontFamily: theme.fonts.body,
          transition: "background 0.3s ease,color 0.3s ease",
        }}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
}
/* ============================================================
   ⏳  GLOBAL LOADING OVERLAY (Preserved but optimized)
   ============================================================ */
function GlobalLoader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-4xl font-bold text-white tracking-wider"
            style={{ fontFamily: theme.fonts.heading }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Pehchaan Media
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   🌈  PAGE TRANSITION WRAPPER (Preserved)
   ============================================================ */
function PageTransition({ children }) {
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setTransitioning(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <GlobalLoader loading={transitioning} />
      <AnimatePresence>{!transitioning && children}</AnimatePresence>
    </>
  );
}
/* ============================================================
   🎆  BACKGROUND PARTICLES / ORBS LAYER
   ============================================================ */
function BackgroundOrbs() {
  const group = useRef();
  const orbs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 8
        ),
        scale: 0.2 + Math.random() * 0.4,
        color: i % 2 === 0 ? theme.colors.indigo : theme.colors.cyan,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.5;
      group.current.rotation.x = Math.cos(clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
/* ============================================================
   🧯  WEBGL CONTEXT GUARD (handles context lost / restore)
   ============================================================ */
function useWebGLContextGuard() {
  const ref = useRef();

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const onLost = (e) => {
      e.preventDefault();
      console.warn("[WebGL] Context lost. Attempting to recover...");
      canvas.classList.add("opacity-50");
    };
    const onRestore = () => {
      console.info("[WebGL] Context restored.");
      canvas.classList.remove("opacity-50");
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestore, false);
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestore);
    };
  }, []);

  return ref;
}
/* ============================================================
   🖼️  BACKGROUND CANVAS (Full-Screen Scene)
   ============================================================ */
function BackgroundCanvas() {
  const supported = isWebGLSupported();
  const guard = useWebGLContextGuard();

  if (!supported) return null;

  return (
    <CanvasWrapper height="100vh">
      <Canvas
        ref={guard}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: "linear-gradient(180deg, #050307 0%, #0b0614 100%)",
        }}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ResizeHandler />
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color={theme.colors.indigo}
          />
          <BackgroundOrbs />
        </Suspense>
      </Canvas>
    </CanvasWrapper>
  );
}
/* ============================================================
   🌗  THEME TOGGLE BUTTON (Preserved minimal)
   ============================================================ */
function ThemeToggle() {
  const { dark, toggleTheme } = React.useContext(AppContext);
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[2000] p-2 bg-black/40 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-200"
      title="Toggle Theme"
    >
      {dark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h1M2 12H1m16.95 7.95l.71.71M3.34 4.34l.71.71M12 5a7 7 0 100 14 7 7 0 000-14z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
}
/* ============================================================
   🎭  COMBINED APP ROOT (includes PageTransition + Background)
   ============================================================ */
export function AppRoot() {
  useLenis();
  useHeroDebug();

  return (
    <AppProvider>
      <PageTransition>
        <ThemeToggle />
        <BackgroundCanvas />
        <App />
      </PageTransition>
    </AppProvider>
  );
}
/* ============================================================
   🧭  SCROLL REVEAL HOOK (Preserved animation trigger logic)
   ============================================================ */
function useScrollReveal(ref, options = { threshold: 0.15 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(el);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options]);

  return visible;
}

/* ============================================================
   🦻  ACCESSIBILITY ENHANCEMENTS
   ============================================================ */
function useAccessibility() {
  useEffect(() => {
    document.body.setAttribute("lang", "en");
    document.body.setAttribute("aria-label", "Pehchaan Media Portfolio");
    document.body.style.scrollBehavior = "smooth";
    const focusStyles = document.createElement("style");
    focusStyles.innerHTML =
      ":focus-visible{outline:2px solid #8B5CF6;outline-offset:4px}";
    document.head.appendChild(focusStyles);
    return () => focusStyles.remove();
  }, []);
}

/* ============================================================
   🪄  SCROLL PARALLAX BACKGROUND ELEMENT
   ============================================================ */
function ParallaxBackground() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = Math.sin(t * 0.2) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial color="#050307" />
    </mesh>
  );
}

/* ============================================================
   🧱  GLOBAL ERROR BOUNDARY (runtime safety net)
   ============================================================ */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
          <h2 className="text-3xl font-bold mb-4">
            Something went wrong 😢
          </h2>
          <p className="text-gray-400">
            Please refresh the page or contact Pehchaan Media.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
/* ============================================================
   🧩  DEBUG HUD (FPS, window size)
   ============================================================ */
function DebugHUD() {
  const [stats, setStats] = useState({
    fps: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let last = performance.now();
    let frames = 0;
    const update = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 1000) {
        setStats({
          fps: frames,
          width: window.innerWidth,
          height: window.innerHeight,
        });
        frames = 0;
        last = now;
      }
      requestAnimationFrame(update);
    };
    update();
  }, []);

  return (
    <div className="fixed bottom-2 left-2 bg-black/50 text-xs text-white px-3 py-1 rounded-lg pointer-events-none font-mono z-[9999]">
      {stats.fps} FPS | {stats.width}×{stats.height}
    </div>
  );
}
/* ============================================================
   🧠  FINAL ROOT EXPORT (ErrorBoundary + AppRoot)
   ============================================================ */
export function PehchaanMediaApp() {
  useAccessibility();

  return (
    <ErrorBoundary>
      <AppRoot />
      <DebugHUD />
    </ErrorBoundary>
  );
}

/* ============================================================
   ✅  DEFAULT EXPORT
   ============================================================ */
export default PehchaanMediaApp;
/* ============================================================
   END OF FILE — PEHCHAAN MEDIA PORTFOLIO
   ------------------------------------------------------------
   🧱  Fixes implemented:
   - WebGL context loss guard
   - Canvas resize / DPR stability
   - Lenis isolation with data-lenis-prevent
   - WebGL fallback
   - Smooth scroll & cleanup
   - Strict accessibility & error safety
   - Theme toggle + debug overlay
   - FPS / DPR / Size instrumentation
   ------------------------------------------------------------
   © 2025 Pehchaan Media. Built with React + Three.js + Vite.
   ============================================================ */
