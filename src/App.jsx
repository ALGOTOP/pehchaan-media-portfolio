/**
 * Pehchaan Media Portfolio
 * Single-file monolithic edition
 * Framework: Vite + React + Framer Motion + Lenis + r3f/drei
 */

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import * as THREE from "three";
import "./index.css";

/* ────────────────────────────────────────────────────────────────
   THEME CONSTANTS
──────────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────────────
   3D SCENE COMPONENT (EXAMPLE – GLOBE)
──────────────────────────────────────────────────────────────── */
function Globe() {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.15;
  });
  return (
    <Float speed={1} rotationIntensity={0.5}>
      <Sphere ref={ref} args={[1.2, 64, 64]}>
        <meshStandardMaterial
          color={theme.colors.indigo}
          emissive={theme.colors.cyan}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

/* ────────────────────────────────────────────────────────────────
   PRELOADER
──────────────────────────────────────────────────────────────── */
const Preloader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 2600);
    return () => clearTimeout(timer);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 1.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black z-[100]"
    >
      <motion.h1
        className="text-5xl font-bold text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={{ fontFamily: theme.fonts.heading }}
      >
        Pehchaan Media
      </motion.h1>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────────
   HERO SECTION (WITH 3D CANVAS)
──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{ height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Globe />
        <OrbitControls enableZoom={false} />
        <Environment preset="city" />
      </Canvas>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1
          className="text-6xl font-bold"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Crafting Stories for a Global Audience
        </h1>
        <p
          className="mt-4 text-lg text-gray-300 max-w-xl"
          style={{ fontFamily: theme.fonts.body }}
        >
          A full-service agency blending design, media and technology —
          operating globally and remotely.
        </p>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN APP COMPONENT – Lenis + Preloader + Sections
──────────────────────────────────────────────────────────────── */
export default function App() {
  const lenis = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const l = new Lenis({ lerp: 0.1, smooth: true });
    lenis.current = l;
    function raf(time) {
      l.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => l.destroy();
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Preloader onFinish={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Hero />
          {/* ↓ More sections will follow here */}
        </motion.div>
      )}
    </>
  );
}
/* ────────────────────────────────────────────────────────────────
   ABOUT SECTION – Story-driven narrative block
──────────────────────────────────────────────────────────────── */
function About() {
  const ref = useRef();

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.95] }}
      style={{
        background: "linear-gradient(180deg, #0b0614 0%, #050307 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "8rem 2rem",
      }}
    >
      <motion.h2
        className="text-5xl font-bold"
        style={{ fontFamily: theme.fonts.heading, color: theme.colors.white }}
      >
        Our Philosophy
      </motion.h2>
      <motion.p
        className="mt-6 max-w-3xl text-gray-300 leading-relaxed text-lg"
        style={{ fontFamily: theme.fonts.body }}
      >
        Pehchaan Media is a full-service agency building global identities
        through design, media, and technology. We believe in merging human
        emotion with digital precision — creating experiences that connect
        people, brands, and culture worldwide.
      </motion.p>
      <motion.div
        className="mt-12 grid md:grid-cols-3 gap-10 max-w-5xl"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        {[
          {
            title: "Global Collaboration",
            text: "Remote-first teams that operate seamlessly across time zones and cultures.",
          },
          {
            title: "Craft & Innovation",
            text: "We balance design intuition with technological mastery to deliver award-worthy outcomes.",
          },
          {
            title: "Sustainable Growth",
            text: "Every solution scales ethically — respecting users, data, and environment.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          >
            <h3
              className="text-2xl mb-3"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.cyan }}
            >
              {item.title}
            </h3>
            <p
              className="text-gray-400"
              style={{ fontFamily: theme.fonts.body, lineHeight: 1.6 }}
            >
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

/* ────────────────────────────────────────────────────────────────
   SERVICES SECTION – Animated service cards
──────────────────────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      title: "Brand Strategy & Identity",
      desc: "Developing cohesive brand systems, tone, and design languages that transcend borders.",
      iconColor: theme.colors.coral,
    },
    {
      title: "Digital Experience Design",
      desc: "UX, UI, and interactive storytelling for web, mobile, and installations.",
      iconColor: theme.colors.cyan,
    },
    {
      title: "Media Production",
      desc: "Cinematic campaigns, video, and photography that evoke emotion and drive results.",
      iconColor: theme.colors.indigo,
    },
    {
      title: "Development & Technology",
      desc: "Building performant, scalable digital platforms using modern stacks and WebGL.",
      iconColor: theme.colors.white,
    },
  ];

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2 }}
      style={{
        background: theme.colors.bg,
        padding: "8rem 2rem",
        textAlign: "center",
      }}
    >
      <h2
        className="text-5xl font-bold mb-10"
        style={{ fontFamily: theme.fonts.heading, color: theme.colors.white }}
      >
        Services
      </h2>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.04,
              boxShadow: `0 0 20px ${s.iconColor}55`,
            }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: s.iconColor + "22",
                border: `1px solid ${s.iconColor}55`,
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: s.iconColor,
                }}
              />
            </div>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {s.title}
            </h3>
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: theme.fonts.body }}
            >
              {s.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
/* ────────────────────────────────────────────────────────────────
   PART 3 — Global Reach (3D) + Work (Portfolio Grid + Case Modal)
   Paste this after Services() and before the App() export.
──────────────────────────────────────────────────────────────── */

/* Utilities used below */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------------------------
   GLOBAL REACH — 3D GLOBE SCENE
   - Uses r3f Canvas
   - Shows rotating globe, nodes for sample client locations,
     and animated connection lines.
---------------------------- */
function GlobeNodes({ points = [], radius = 1.2 }) {
  // We render small spheres positioned on the globe's surface for each location
  return (
    <group>
      {points.map((p, i) => {
        // lat / lon -> 3D Cartesian conversion
        const { lat, lon, label } = p;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshStandardMaterial
              emissive={theme.colors.cyan}
              emissiveIntensity={0.9}
              color={theme.colors.indigo}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* Animated connecting arcs between nodes (simple lerp lines) */
function Connections({ points = [], radius = 1.2 }) {
  // Create curved lines between first point and others for demonstration
  const lines = [];
  if (points.length > 1) {
    const a = points[0];
    const aPhi = (90 - a.lat) * (Math.PI / 180);
    const aTheta = (a.lon + 180) * (Math.PI / 180);
    const ax = -radius * Math.sin(aPhi) * Math.cos(aTheta);
    const az = radius * Math.sin(aPhi) * Math.sin(aTheta);
    const ay = radius * Math.cos(aPhi);

    for (let i = 1; i < points.length; i++) {
      const b = points[i];
      const bPhi = (90 - b.lat) * (Math.PI / 180);
      const bTheta = (b.lon + 180) * (Math.PI / 180);
      const bx = -radius * Math.sin(bPhi) * Math.cos(bTheta);
      const bz = radius * Math.sin(bPhi) * Math.sin(bTheta);
      const by = radius * Math.cos(bPhi);

      // Build a curved path by interpolating toward an elevated midpoint
      const midpoint = [(ax + bx) / 2, (ay + by) / 2, (az + bz) / 2];
      midpoint[1] += 0.3; // raise midpoint for arc effect

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(ax, ay, az),
        new THREE.Vector3(midpoint[0], midpoint[1], midpoint[2]),
        new THREE.Vector3(bx, by, bz),
      ]);

      const pts = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(pts);
      lines.push(
        <line key={i} geometry={geometry}>
          <lineBasicMaterial
            attach="material"
            color={theme.colors.cyan}
            linewidth={2}
            transparent={true}
            opacity={0.6}
          />
        </line>
      );
    }
  }

  return <group>{lines}</group>;
}

/* GlobeCanvas composes the globe, nodes, and atmosphere */
function GlobeCanvas({ className = "w-full h-[60vh]" }) {
  // sample nodes (latitude, longitude, label)
  const sampleNodes = [
    { lat: 37.7749, lon: -122.4194, label: "San Francisco" },
    { lat: 51.5074, lon: -0.1278, label: "London" },
    { lat: 24.8607, lon: 67.0011, label: "Karachi" },
    { lat: -33.8688, lon: 151.2093, label: "Sydney" },
    { lat: 35.6895, lon: 139.6917, label: "Tokyo" },
  ];

  // rotating group via useFrame inside a small inner component
  function RotatingGroup({ children }) {
    const ref = useRef();
    useFrame((state, delta) => {
      if (ref.current) {
        ref.current.rotation.y += delta * 0.08;
      }
    });
    return <group ref={ref}>{children}</group>;
  }

  return (
    <div style={{ width: "100%", height: "60vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 3.6], fov: 35 }} style={{ zIndex: 1 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} color={theme.colors.cyan} />
        <RotatingGroup>
          {/* Main globe: glossy material */}
          <mesh>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshStandardMaterial
              color={theme.colors.surface}
              metalness={0.6}
              roughness={0.25}
              emissive={theme.colors.indigo}
              emissiveIntensity={0.03}
            />
          </mesh>

          {/* subtle cloud / atmosphere layer */}
          <mesh scale={[1.04, 1.04, 1.04]}>
            <sphereGeometry args={[1.205, 64, 64]} />
            <meshPhongMaterial
              color={theme.colors.cyan}
              transparent
              opacity={0.03}
              shininess={50}
            />
          </mesh>

          {/* nodes and connections */}
          <GlobeNodes points={sampleNodes} radius={1.2} />
          <Connections points={sampleNodes} radius={1.2} />
        </RotatingGroup>

        {/* minor environment */}
        <Environment preset="studio" />
      </Canvas>

      {/* Overlay textual summary for global reach */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <h3 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: "1.6rem", margin: 0 }}>
          Global Reach
        </h3>
        <p style={{ color: "#cbd5e1", marginTop: "0.5rem", maxWidth: "46ch" }}>
          Distributed teams across timezones, delivering film, digital, and brand systems globally.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------
   WORK SECTION — Grid + Modal Case Study
   - Clicking a project opens a cinematic modal with deep storytelling.
---------------------------- */

function ProjectModal({ project, onClose }) {
  // lock background scroll – simple approach
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-stretch justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: "linear-gradient(180deg, rgba(5,3,7,0.95), rgba(5,3,7,0.98))" }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", margin: "auto", padding: "3rem 2rem" }}>
        <motion.button
          onClick={onClose}
          style={{
            background: "transparent",
            color: theme.colors.white,
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "0.5rem 0.8rem",
            borderRadius: 8,
            cursor: "pointer",
            position: "absolute",
            right: 28,
            top: 28,
          }}
          whileHover={{ scale: 1.02 }}
        >
          Close
        </motion.button>

        {/* Cinematic header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}>
            <img
              src={project.hero}
              alt={project.title}
              style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
            />
          </div>

          <div style={{ color: theme.colors.white }}>
            <h2 style={{ fontFamily: theme.fonts.heading, fontSize: "2rem", marginBottom: "0.6rem" }}>
              {project.title}
            </h2>
            <p style={{ color: "#cbd5e1", marginBottom: "1rem" }}>{project.subtitle}</p>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: "0.35rem 0.6rem",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    color: theme.colors.cyan,
                    fontSize: "0.85rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ color: "#e2e8f0", lineHeight: 1.7 }}>
              <h4 style={{ marginTop: 4, marginBottom: 8 }}>The Challenge</h4>
              <p style={{ marginBottom: 12 }}>{project.challenge}</p>

              <h4 style={{ marginTop: 12, marginBottom: 8 }}>Our Approach</h4>
              <p style={{ marginBottom: 12 }}>{project.approach}</p>

              <h4 style={{ marginTop: 12, marginBottom: 8 }}>Outcome</h4>
              <p style={{ marginBottom: 12 }}>{project.outcome}</p>
            </div>
          </div>
        </motion.div>

        {/* Gallery / supporting visuals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}
        >
          {project.gallery.map((g, i) => (
            <div key={i} style={{ height: 160, overflow: "hidden", borderRadius: 8 }}>
              <img src={g} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Work() {
  // sample projects
  const projects = [
    {
      id: "luxehouse",
      title: "LuxeHouse Campaign",
      subtitle: "Cinematic narrative and digital experience for a luxury brand.",
      hero: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1542662564-9f8b88f0b9d8?w=1200&q=60",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=60",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60",
      ],
      tags: ["Film", "Brand", "Web"],
      challenge:
        "LuxeHouse needed a refined digital campaign that bridged in-store craftsmanship with immersive storytelling online.",
      approach:
        "We produced a cinematic hero film, built a responsive microsite, and created an editorial-led social series to maintain momentum.",
      outcome: "Launch +18% sales lift in 3 months; global PR features and increased MQLs.",
    },
    {
      id: "urban-perspective",
      title: "Urban Perspective",
      subtitle: "Architectural film & brand identity for a design collective.",
      hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60",
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1200&q=60",
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=1200&q=60",
      ],
      tags: ["Cinematography", "Identity", "Experiential"],
      challenge: "Translate spatial storytelling into a brand expression with visual hierarchy.",
      approach: "A combined shoot and 3D visualization workflow for consistent design language.",
      outcome: "Awarded Best Campaign (regional) and secured international partnerships.",
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <section id="work" style={{ padding: "6rem 2rem", background: theme.colors.surface }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.white }}
        >
          Selected Work
        </motion.h2>

        <motion.p
          className="max-w-3xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ fontFamily: theme.fonts.body }}
        >
          A curated selection of deep case studies that show our process — strategy,
          production, and measurable outcomes.
        </motion.p>

        {/* Grid */}
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.12 }}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer",
              }}
              onClick={() => setActive(p)}
            >
              <div style={{ position: "relative", height: 220 }}>
                <img
                  src={p.hero}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    bottom: 16,
                    color: theme.colors.white,
                    textShadow: "0 6px 18px rgba(0,0,0,0.6)",
                  }}
                >
                  <h4 style={{ margin: 0, fontFamily: theme.fonts.heading }}>{p.title}</h4>
                  <p style={{ margin: 0, color: "#cbd5e1" }}>{p.tags.join(" • ")}</p>
                </div>
              </div>

              <div style={{ padding: "1rem 1.1rem" }}>
                <p style={{ margin: 0, color: "#e2e8f0", fontFamily: theme.fonts.body, fontSize: "0.95rem" }}>
                  {p.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal portal for active case */}
      <AnimatePresence>{active && <ProjectModal project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}
/* ────────────────────────────────────────────────────────────────
   PART 4 — Custom Cursor, Testimonials, Contact, Footer, Final App
   Paste after Work() component in App.jsx
──────────────────────────────────────────────────────────────── */

/* ---------------------------
   HOOK: prefers-reduced-motion
   - Use this to disable non-essential motion on request
---------------------------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    try {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } catch {
      // Safari fallback
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
  }, []);
  return reduced;
}

/* ---------------------------
   CUSTOM CURSOR
   - Simple custom cursor that follows pointer
   - Hides on touch devices and when reduced-motion is enabled
   - Shows a subtle hover scale effect when hovering interactive elements
---------------------------- */
function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const cursorRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    // Do not show custom cursor on touch devices
    if ("ontouchstart" in window || reduced) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      return;
    }

    const el = cursorRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;

    const lerp = (start, end, t) => start + (end - start) * t;

    function onMove(e) {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
    }

    function loop() {
      vx = lerp(vx, x, 0.16);
      vy = lerp(vy, y, 0.16);
      el.style.transform = `translate3d(${vx - 12}px, ${vy - 12}px, 0)`;
      requestAnimationFrame(loop);
    }

    document.addEventListener("mousemove", onMove);
    loop();

    // Hover effects for interactive elements
    function addHover() {
      hoverRef.current = true;
      el.style.transform += " scale(1.28)";
      el.style.width = "28px";
      el.style.height = "28px";
      el.style.borderRadius = "8px";
      el.style.boxShadow = `0 6px 24px ${theme.colors.cyan}33`;
    }
    function removeHover() {
      hoverRef.current = false;
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.borderRadius = "50%";
      el.style.boxShadow = "none";
    }

    const interactiveSelectors = [
      "a",
      "button",
      "input",
      "textarea",
      "[data-cursor]",
      ".interactive",
    ];
    const hoverables = document.querySelectorAll(interactiveSelectors.join(","));
    hoverables.forEach((h) => {
      h.addEventListener("mouseenter", addHover);
      h.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      hoverables.forEach((h) => {
        h.removeEventListener("mouseenter", addHover);
        h.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [usePrefersReducedMotion()]); // re-run if reduced-motion preference changes

  return (
    <div
      ref={cursorRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate3d(-50%, -50%, 0)",
        background:
          "radial-gradient(circle at 30% 30%, rgba(0,245,255,0.9) 0%, rgba(139,92,246,0.15) 40%, rgba(5,3,7,0.0) 70%)",
        mixBlendMode: "screen",
        zIndex: 9999,
        transition: "width 180ms ease, height 180ms ease, box-shadow 180ms ease, transform 120ms linear",
        opacity: 0,
      }}
    />
  );
}

/* ---------------------------
   TESTIMONIALS
   - Animated cards with simple fade/slide reveal
---------------------------- */
function Testimonials() {
  const data = [
    {
      quote:
        "Pehchaan Media elevated our visual language and launched a campaign that doubled our engagement.",
      name: "Sara Malik",
      role: "Creative Director, LuxeHouse",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "A thoughtful team — their remote workflow and clarity made the complex feel simple.",
      name: "Adil Hussain",
      role: "Marketing Head, UrbanVista",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "From strategy to production, their approach was rigorous, beautifully executed, and effective.",
      name: "Noor Fatima",
      role: "Brand Manager, AuroraTech",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ];

  return (
    <section
      id="testimonials"
      style={{
        padding: "6rem 2rem",
        background: "linear-gradient(180deg, rgba(11,6,20,0.7), rgba(5,3,7,0.95))",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <motion.h3
          className="text-3xl font-bold"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.white }}
        >
          What Clients Say
        </motion.h3>

        <motion.div
          className="mt-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}
        >
          {data.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              style={{
                padding: "1.4rem",
                borderRadius: 12,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 18px 60px rgba(2,6,23,0.6)",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: 48, height: 48, borderRadius: 999, objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: theme.colors.white }}>{t.name}</div>
                  <div style={{ color: "#9aa4b2", fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
              <p style={{ color: "#dbe6f0", lineHeight: 1.7 }}>{t.quote}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------
   CONTACT SECTION
   - Accessible form with client-side demo success
---------------------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const reduced = usePrefersReducedMotion();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Demo UX: set sent state, then reset
    setSent(true);
    setTimeout(() => setSent(false), 4500);

    // Optional: open mail client as fallback
    // window.location.href = `mailto:info@pehchaanmedia.com?subject=${encodeURIComponent("Inquiry from site")}&body=${encodeURIComponent(form.message)}`;
  }

  return (
    <section id="contact" style={{ padding: "6rem 2rem", background: theme.colors.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: "2rem" }}
        >
          Let's Collaborate
        </motion.h3>

        <motion.p style={{ color: "#cbd5e1", marginTop: 10 }}>
          Tell us about your project — we’ll reply with a proposed approach and availability.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: 28, display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}
        >
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              color: theme.colors.white,
              gridColumn: "1 / span 1",
              fontFamily: theme.fonts.body,
            }}
          />
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              color: theme.colors.white,
              gridColumn: "2 / span 1",
              fontFamily: theme.fonts.body,
            }}
          />
          <textarea
            name="message"
            rows="5"
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your brief"
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              color: theme.colors.white,
              gridColumn: "1 / span 2",
              fontFamily: theme.fonts.body,
            }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: reduced ? 1 : 1.02 }}
            whileTap={{ scale: reduced ? 1 : 0.98 }}
            style={{
              gridColumn: "1 / span 2",
              padding: "14px 18px",
              borderRadius: 12,
              border: "none",
              background: `linear-gradient(90deg, ${theme.colors.indigo}, ${theme.colors.cyan})`,
              color: "#04111f",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {sent ? "Thanks — we'll follow up" : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------------------------
   FOOTER
---------------------------- */
function Footer() {
  return (
    <footer style={{ padding: "3.5rem 2rem", background: "#03040a", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: theme.fonts.heading, fontSize: 18, color: theme.colors.white }}>Pehchaan Media</div>
          <div style={{ color: "#9aa4b2", marginTop: 6 }}>Global • Remote • Cinematic</div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#" aria-label="Instagram" style={{ color: "#9aa4b2" }}>Instagram</a>
          <a href="#" aria-label="LinkedIn" style={{ color: "#9aa4b2" }}>LinkedIn</a>
          <a href="#" aria-label="Twitter" style={{ color: "#9aa4b2" }}>Twitter</a>
        </div>

        <div style={{ color: "#9aa4b2", fontSize: 13 }}>© {new Date().getFullYear()} Pehchaan Media — Crafted with care</div>
      </div>
    </footer>
  );
}

/* ---------------------------
   FINAL APP — Lenis init, Preloader flow, Cursor and Sections
   - Replace any earlier simple App() with this full version if you had one.
---------------------------- */
export default function App() {
  const lenisRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const reduced = usePrefersReducedMotion();

  // Lenis initialization (smooth scroll)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // cleanup
    return () => {
      try {
        lenis.destroy();
      } catch (e) {
        // ignore destroy errors in dev
      }
    };
  }, []);

  // Preloader simulated timing (keeps it cinematic)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  // keyboard shortcut: press "m" to toggle reduced-motion hint (dev aid)
  useEffect(() => {
    function onKey(e) {
      // For debugging only — no persistent changes
      if (e.key === "m") {
        // show a brief hint
        const el = document.createElement("div");
        el.textContent = "Reduced-motion preference: " + (reduced ? "ON" : "OFF");
        el.style.position = "fixed";
        el.style.right = "18px";
        el.style.bottom = "18px";
        el.style.background = "rgba(0,0,0,0.6)";
        el.style.color = "#fff";
        el.style.padding = "8px 12px";
        el.style.borderRadius = "8px";
        el.style.zIndex = 99999;
        document.body.appendChild(el);
        setTimeout(() => document.body.removeChild(el), 1200);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);

  return (
    <>
      {/* Cinematic preloader */}
      <AnimatePresence>{loading && <Preloader onFinish={() => setLoading(false)} />}</AnimatePresence>

      {/* Custom cursor (hidden on reduced motion / touch devices) */}
      <CustomCursor />

      {/* Main app content */}
      {!loading && (
        <motion.div
          key="site"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
          style={{ background: theme.colors.bg, minHeight: "100vh" }}
        >
          <header style={{ position: "sticky", top: 0, zIndex: 60 }}>
            {/* Minimal navigation */}
            <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <a href="#hero" style={{ fontFamily: theme.fonts.heading, fontWeight: 700, color: theme.colors.white, textDecoration: "none" }}>
                Pehchaan Media
              </a>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <a href="#work" className="interactive" style={{ color: "#cbd5e1", textDecoration: "none" }}>Work</a>
                <a href="#contact" className="interactive" style={{ color: "#cbd5e1", textDecoration: "none" }}>Contact</a>
                <a href="#about" className="interactive" style={{ color: "#cbd5e1", textDecoration: "none" }}>About</a>
              </div>
            </nav>
          </header>

          <main>
            {/* Hero -> About -> Services -> Global -> Work -> Testimonials -> Contact -> Footer */}
            <Hero />
            <About />
            <Services />
            {/* Global reach 3D canvas; we defined GlobeCanvas earlier */}
            <motion.section id="globalreach" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ padding: "4rem 2rem" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <GlobeCanvas />
              </div>
            </motion.section>

            <Work />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
