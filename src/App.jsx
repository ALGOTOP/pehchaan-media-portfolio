/* ============================================================
   App.jsx — Expanded Pehchaan Media Portfolio (Part 1/6)
   ------------------------------------------------------------
   Detailed Work/Case Studies, Services, About, and Contact
   Preserves visuals, Three.js effects, animations, deploy-ready
   ============================================================ */
import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
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

/* ============================================================
   THEME CONSTANTS
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
   WEBGL SUPPORT CHECK
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
   CANVAS RESIZE HANDLER
   ============================================================ */
function ResizeHandler() {
  const { camera, gl } = useThree();
  useEffect(() => {
    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      gl.setPixelRatio(dpr);
      gl.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [camera, gl]);
  return null;
}

/* ============================================================
   LENIS SMOOTH SCROLL
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
   BASIC WRAPPERS
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
   HERO SPHERE 3D OBJECT
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
   CANVAS LOADER
   ============================================================ */
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <motion.div className="text-white text-sm font-medium tracking-wider">
        {progress.toFixed(0)}% loaded
      </motion.div>
    </Html>
  );
}

/* ============================================================
   HERO SECTION
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

      {/* Hero Text */}
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
          We create cinematic experiences that blend film, motion graphics,
          and interactive digital design. Each project is a unique narrative
          journey, merging visual excellence with immersive storytelling to
          leave lasting impressions.
        </p>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   CUSTOM CURSOR
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
   ABOUT SECTION (Expanded)
   ============================================================ */
function About() {
  return (
    <Section
      id="about"
      className="bg-gradient-to-b from-black via-surface to-black text-center flex-col"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="max-w-4xl px-6 space-y-6"
      >
        <h2
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Our Identity
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Pehchaan Media is a collective of filmmakers, designers, and
          digital strategists passionate about telling stories that resonate.
          From conceptualization to final execution, we craft narratives that
          captivate and inspire. Our expertise spans live-action cinematography,
          animation, immersive web experiences, and interactive campaigns.
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          Founded in 2018, we have collaborated with global brands, independent
          artists, and emerging startups, translating ideas into visually stunning
          and emotionally compelling content. Every project is approached with
          meticulous attention to detail, leveraging both technology and artistry
          to create meaningful experiences.
        </p>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   PART 1 END — Hero + About + Core Wrappers
   ============================================================ */
/* ============================================================
   WORK / CASE STUDIES SECTION — Expanded
   ============================================================ */
function Work() {
  const works = [
    {
      title: "Visual Narrative 01",
      img: "/assets/work1.jpg",
      desc: "Short-film grade promotional for lifestyle brand, blending cinematic framing, macro cinematography, and color-graded storytelling for maximum impact.",
      client: "Lifestyle Co.",
      duration: "6 weeks",
      tools: ["Cinema4D", "After Effects", "DaVinci Resolve"],
    },
    {
      title: "Visual Narrative 02",
      img: "/assets/work2.jpg",
      desc: "Product film combining practical shooting and motion graphics overlays, highlighting textures, materials, and dynamic lighting.",
      client: "Tech Brand",
      duration: "5 weeks",
      tools: ["Premiere Pro", "After Effects", "Blender"],
    },
    {
      title: "Visual Narrative 03",
      img: "/assets/work3.jpg",
      desc: "Cinematic launch trailer for a digital campaign, integrating drone footage, 3D elements, and immersive sound design.",
      client: "Digital Campaign Inc.",
      duration: "8 weeks",
      tools: ["Red Camera", "After Effects", "Logic Pro X"],
    },
    {
      title: "Visual Narrative 04",
      img: "/assets/work4.jpg",
      desc: "Interactive art installation film edit, blending projected visuals with live motion capture to create engaging experiences.",
      client: "Art Collective",
      duration: "10 weeks",
      tools: ["TouchDesigner", "Premiere Pro", "Cinema4D"],
    },
    {
      title: "Visual Narrative 05",
      img: "/assets/work5.jpg",
      desc: "Experimental short exploring identity and sound through visual motifs and non-linear editing, pushing artistic boundaries.",
      client: "Independent Artist",
      duration: "7 weeks",
      tools: ["DaVinci Resolve", "After Effects", "Pro Tools"],
    },
    {
      title: "Visual Narrative 06",
      img: "/assets/work6.jpg",
      desc: "Behind-the-scenes documentary capturing the making of campaigns and highlighting creative processes.",
      client: "Production House",
      duration: "4 weeks",
      tools: ["Canon C300", "Premiere Pro", "Lightroom"],
    },
    // Expanded Case Studies — more entries for richness
    {
      title: "Visual Narrative 07",
      img: "/assets/work7.jpg",
      desc: "Branded short film for an eco-conscious startup, emphasizing sustainability through natural lighting and storytelling.",
      client: "GreenStart",
      duration: "5 weeks",
      tools: ["Sony FX6", "DaVinci Resolve", "After Effects"],
    },
    {
      title: "Visual Narrative 08",
      img: "/assets/work8.jpg",
      desc: "Music video production integrating choreography, visual effects, and immersive lighting design.",
      client: "Indie Musician",
      duration: "6 weeks",
      tools: ["Red Komodo", "After Effects", "Premiere Pro"],
    },
    {
      title: "Visual Narrative 09",
      img: "/assets/work9.jpg",
      desc: "3D motion design for digital product launch, combining interactive UI elements and cinematic camera moves.",
      client: "FinTech App",
      duration: "7 weeks",
      tools: ["Blender", "Figma", "After Effects"],
    },
    {
      title: "Visual Narrative 10",
      img: "/assets/work10.jpg",
      desc: "Narrative-driven promotional content for a lifestyle brand, integrating storytelling and visual metaphors.",
      client: "Fashion House",
      duration: "5 weeks",
      tools: ["Canon EOS R5", "Premiere Pro", "DaVinci Resolve"],
    },
    {
      title: "Visual Narrative 11",
      img: "/assets/work11.jpg",
      desc: "Immersive VR teaser combining 360° footage, motion tracking, and spatial audio for experiential marketing.",
      client: "VR Studio",
      duration: "8 weeks",
      tools: ["Unity", "After Effects", "Premiere Pro"],
    },
    {
      title: "Visual Narrative 12",
      img: "/assets/work12.jpg",
      desc: "Documentary short highlighting creative entrepreneurship, utilizing handheld cinematography and naturalistic lighting.",
      client: "Startup Alliance",
      duration: "6 weeks",
      tools: ["Sony A7S III", "DaVinci Resolve", "Logic Pro X"],
    },
    {
      title: "Visual Narrative 13",
      img: "/assets/work13.jpg",
      desc: "Animated explainer video blending 2D and 3D motion design for tech education content.",
      client: "EdTech Platform",
      duration: "4 weeks",
      tools: ["After Effects", "Blender", "Illustrator"],
    },
    {
      title: "Visual Narrative 14",
      img: "/assets/work14.jpg",
      desc: "High-speed product cinematography for e-commerce, focusing on detail, texture, and materiality.",
      client: "Luxury Retail",
      duration: "3 weeks",
      tools: ["Canon C300", "Premiere Pro", "DaVinci Resolve"],
    },
    {
      title: "Visual Narrative 15",
      img: "/assets/work15.jpg",
      desc: "Experimental art short using generative visuals, glitch effects, and AI-assisted post-production.",
      client: "Digital Artist Collective",
      duration: "8 weeks",
      tools: ["Blender", "After Effects", "TouchDesigner"],
    },
  ];

  return (
    <Section id="work" className="bg-black flex-col">
      <motion.h2
        className="text-5xl font-bold mb-12 text-center"
        style={{ fontFamily: theme.fonts.heading }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        Selected Works & Case Studies
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16 max-w-7xl mx-auto">
        {works.map((work, i) => (
          <WorkCard key={i} {...work} />
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   WORK CARD COMPONENT — Expanded Modal Details
   ============================================================ */
function WorkCard({ title, img, desc, client, duration, tools }) {
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
            className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-6 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl w-full rounded-xl overflow-hidden shadow-2xl bg-surface"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <img src={img} alt={title} className="w-full h-[60vh] object-cover" />
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
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm mb-2">{desc}</p>
                <p className="text-gray-400 text-xs mb-1">
                  <strong>Client:</strong> {client} | <strong>Duration:</strong> {duration}
                </p>
                <p className="text-gray-400 text-xs">
                  <strong>Tools Used:</strong> {tools.join(", ")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   PART 2 END — Expanded Work/Case Studies
   ============================================================ */
/* ============================================================
   SERVICES SECTION — Expanded with Case Details
   ============================================================ */
function Services() {
  const services = [
    {
      icon: "🎥",
      title: "Film Production",
      desc: "End-to-end direction, cinematography, and post-production for brands, music videos, and short films. Emphasis on storytelling, pacing, and visual aesthetics.",
      caseStudies: [
        {
          title: "Lifestyle Short Promo",
          client: "Lifestyle Co.",
          duration: "6 weeks",
          tools: ["Cinema4D", "After Effects", "DaVinci Resolve"],
          link: "/assets/work1.jpg",
        },
        {
          title: "Music Video Narrative",
          client: "Indie Artist",
          duration: "5 weeks",
          tools: ["Red Komodo", "Premiere Pro", "After Effects"],
          link: "/assets/work8.jpg",
        },
      ],
    },
    {
      icon: "🪄",
      title: "Motion Design",
      desc: "Creative motion graphics, kinetic typography, and visual storytelling that integrates 2D and 3D elements, animation, and compositing.",
      caseStudies: [
        {
          title: "Tech App Explainer",
          client: "FinTech App",
          duration: "7 weeks",
          tools: ["Blender", "After Effects", "Figma"],
          link: "/assets/work9.jpg",
        },
        {
          title: "Animated Educational Content",
          client: "EdTech Platform",
          duration: "4 weeks",
          tools: ["After Effects", "Blender", "Illustrator"],
          link: "/assets/work13.jpg",
        },
      ],
    },
    {
      icon: "🌐",
      title: "Digital Experiences",
      desc: "Interactive web apps, VR/AR experiences, and immersive installations that bridge design, technology, and storytelling.",
      caseStudies: [
        {
          title: "VR Teaser Campaign",
          client: "VR Studio",
          duration: "8 weeks",
          tools: ["Unity", "Premiere Pro", "After Effects"],
          link: "/assets/work11.jpg",
        },
        {
          title: "Art Installation Film",
          client: "Art Collective",
          duration: "10 weeks",
          tools: ["TouchDesigner", "Premiere Pro", "Cinema4D"],
          link: "/assets/work4.jpg",
        },
      ],
    },
    {
      icon: "🎨",
      title: "Branding & Visual Identity",
      desc: "Comprehensive branding, color strategy, typography, and creative direction for campaigns and digital presence.",
      caseStudies: [
        {
          title: "Brand Launch Campaign",
          client: "Fashion House",
          duration: "5 weeks",
          tools: ["Photoshop", "Illustrator", "After Effects"],
          link: "/assets/work10.jpg",
        },
      ],
    },
    {
      icon: "📽️",
      title: "Documentary & BTS",
      desc: "Documentary shorts, behind-the-scenes content, and creative insights into production processes.",
      caseStudies: [
        {
          title: "Creative Process Documentary",
          client: "Production House",
          duration: "4 weeks",
          tools: ["Canon C300", "Premiere Pro", "Lightroom"],
          link: "/assets/work6.jpg",
        },
        {
          title: "Startup Story Documentary",
          client: "Startup Alliance",
          duration: "6 weeks",
          tools: ["Sony A7S III", "DaVinci Resolve", "Logic Pro X"],
          link: "/assets/work12.jpg",
        },
      ],
    },
  ];

  return (
    <Section id="services" className="bg-gradient-to-b from-black to-[#0a0612] flex-col text-center">
      <motion.h2
        className="text-5xl font-bold mb-12"
        style={{ fontFamily: theme.fonts.heading }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        Our Services
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 md:px-20 max-w-6xl mx-auto">
        {services.map((srv, i) => (
          <ServiceCard key={i} {...srv} />
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   SERVICE CARD COMPONENT — Expanded with Case Modal
   ============================================================ */
function ServiceCard({ icon, title, desc, caseStudies }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-surface rounded-3xl border border-white/10 p-8 hover:border-indigo-500 transition-all duration-500 flex flex-col items-center text-center shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-base mb-4">{desc}</p>
        <motion.button
          className="mt-auto px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
        >
          View Case Studies
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-6 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-6xl w-full rounded-xl overflow-hidden shadow-2xl bg-surface p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 z-[10]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-3xl font-bold mb-6">{title}</h3>
              <p className="text-gray-300 mb-6">{desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {caseStudies.map((cs, i) => (
                  <div key={i} className="bg-black/40 p-4 rounded-xl flex flex-col">
                    <img
                      src={cs.link}
                      alt={cs.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                      loading="lazy"
                    />
                    <h4 className="text-xl font-semibold mb-1">{cs.title}</h4>
                    <p className="text-gray-400 text-sm mb-1">
                      <strong>Client:</strong> {cs.client} | <strong>Duration:</strong> {cs.duration}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong>Tools:</strong> {cs.tools.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   PART 3 END — Expanded Services Section
   ============================================================ */
/* ============================================================
   ABOUT SECTION — Expanded with Team & Case Stories
   ============================================================ */
function About() {
  const teamMembers = [
    {
      name: "Ananya Sharma",
      role: "Creative Director",
      bio: "Over a decade of storytelling experience, Ananya leads the creative vision and ensures every project is emotionally engaging.",
      img: "/assets/team1.jpg",
      social: { linkedin: "https://linkedin.com/in/ananya-sharma" },
    },
    {
      name: "Rohan Mehta",
      role: "Cinematographer",
      bio: "Specializes in lighting, composition, and camera movement. Rohan brings cinematic quality to every project.",
      img: "/assets/team2.jpg",
      social: { instagram: "https://instagram.com/rohanmehta" },
    },
    {
      name: "Sara Khan",
      role: "Motion Designer",
      bio: "Blends 2D and 3D motion graphics, creating immersive visual narratives that resonate with viewers.",
      img: "/assets/team3.jpg",
      social: { linkedin: "https://linkedin.com/in/sara-khan" },
    },
    {
      name: "Imran Patel",
      role: "Tech Lead",
      bio: "Handles interactive experiences, VR/AR projects, and advanced web integrations. Ensures smooth and reliable performance.",
      img: "/assets/team4.jpg",
      social: { github: "https://github.com/imranpatel" },
    },
  ];

  const methodology = [
    {
      step: "Discover",
      desc: "Understanding your brand, audience, and goals through research and workshops.",
    },
    {
      step: "Ideate",
      desc: "Brainstorming creative concepts, visual styles, and storytelling approaches.",
    },
    {
      step: "Produce",
      desc: "Execution of shooting, animation, and design while maintaining a high production standard.",
    },
    {
      step: "Deliver",
      desc: "Polished final output including post-production, motion graphics, and interactive deployment.",
    },
    {
      step: "Reflect",
      desc: "Review performance, gather feedback, and optimize for future campaigns.",
    },
  ];

  return (
    <Section id="about" className="bg-gradient-to-b from-black via-surface to-black flex-col">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="max-w-5xl px-6 mx-auto text-center"
      >
        <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: theme.fonts.heading }}>
          Our Identity
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-12" style={{ fontFamily: theme.fonts.body }}>
          At Pehchaan Media, we merge creativity, technology, and human emotion to craft memorable digital stories.
          Our team is built from diverse talents that specialize in film, motion design, and interactive experiences.
        </p>
      </motion.div>

      {/* Team Members */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8 md:px-16 max-w-7xl mx-auto mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        viewport={{ once: true }}
      >
        {teamMembers.map((member, i) => (
          <TeamCard key={i} {...member} />
        ))}
      </motion.div>

      {/* Methodology */}
      <motion.div
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 px-6 mb-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {methodology.map((step, i) => (
          <motion.div
            key={i}
            className="bg-surface rounded-3xl p-6 border border-white/10 shadow-lg hover:shadow-indigo-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-2">{step.step}</h3>
            <p className="text-gray-300 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured Case Studies */}
      <motion.div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        viewport={{ once: true }}
      >
        <CaseStudyCard
          title="Immersive AR Campaign"
          client="Tech Start-Up"
          duration="8 Weeks"
          tools={["Unity", "Blender", "Premiere Pro"]}
          img="/assets/work14.jpg"
          description="Developed an AR interactive experience for a product launch. Focused on user engagement and seamless interaction."
        />
        <CaseStudyCard
          title="Music Video Narrative"
          client="Indie Artist"
          duration="5 Weeks"
          tools={["Red Komodo", "Premiere Pro", "After Effects"]}
          img="/assets/work8.jpg"
          description="Crafted a cinematic short film emphasizing narrative pacing, lighting, and color grading."
        />
        <CaseStudyCard
          title="Documentary Short"
          client="Creative Collective"
          duration="6 Weeks"
          tools={["Canon C300", "DaVinci Resolve", "Logic Pro X"]}
          img="/assets/work6.jpg"
          description="Documented behind-the-scenes processes, showcasing creative collaboration and production workflow."
        />
      </motion.div>
    </Section>
  );
}

/* ============================================================
   TEAM CARD COMPONENT
   ============================================================ */
function TeamCard({ name, role, bio, img, social }) {
  return (
    <motion.div
      className="bg-surface rounded-3xl border border-white/10 p-6 flex flex-col items-center text-center shadow-lg hover:shadow-indigo-500/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
    >
      <img
        src={img}
        alt={name}
        className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-indigo-500"
        loading="lazy"
      />
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-indigo-400 text-sm mb-2">{role}</p>
      <p className="text-gray-300 text-sm mb-4">{bio}</p>
      <div className="flex gap-4">
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
            LinkedIn
          </a>
        )}
        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
            Instagram
          </a>
        )}
        {social.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ============================================================
   CASE STUDY CARD COMPONENT
   ============================================================ */
function CaseStudyCard({ title, client, duration, tools, img, description }) {
  return (
    <motion.div
      className="bg-black/40 rounded-3xl border border-white/10 p-6 flex flex-col shadow-lg hover:shadow-indigo-500/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4"
        loading="lazy"
      />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-1">
        <strong>Client:</strong> {client} | <strong>Duration:</strong> {duration}
      </p>
      <p className="text-gray-400 text-sm mb-2">
        <strong>Tools:</strong> {tools.join(", ")}
      </p>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
}

/* ============================================================
   PART 4 END — Expanded About Section
   ============================================================ */
/* ============================================================
   CONTACT SECTION — Expanded with Multi-Step Form
   ============================================================ */
function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    projectType: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const { name, email, message, projectType, budget } = formData;
    if (!name || !email || !message || !projectType || !budget) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Simulate API submission
    setTimeout(() => setSubmitted(false), 4000);
  };

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
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
          </>
        );
      case 2:
        return (
          <>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full bg-surface/80 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Project Type</option>
              <option value="Film Production">Film Production</option>
              <option value="Motion Design">Motion Design</option>
              <option value="Digital Experience">Digital Experience</option>
            </select>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-surface/80 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">Budget Range</option>
              <option value="<$5k">&lt;$5k</option>
              <option value="$5k-$15k">$5k-$15k</option>
              <option value="$15k-$30k">$15k-$30k</option>
              <option value=">$30k">&gt;$30k</option>
            </select>
          </>
        );
      case 3:
        return (
          <textarea
            name="message"
            rows="5"
            placeholder="Project Details / Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-surface/80 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Section id="contact" className="bg-gradient-to-b from-[#0a0612] to-black flex-col text-center">
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
        Let’s collaborate on your next story. Reach out for film, motion design, or immersive digital experiences.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        viewport={{ once: true }}
      >
        {stepContent()}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex justify-between w-full">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors text-white font-semibold"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold"
            >
              Next
            </button>
          ) : submitted ? (
            <motion.p className="text-green-400 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
        </div>
      </motion.form>
    </Section>
  );
}

/* ============================================================
   PART 5 END — Expanded Contact Section
   ============================================================ */
/* ============================================================
   EXPANDED WORK / CASE STUDIES SECTION
   ============================================================ */
function Work() {
  const works = [
    {
      title: "Visual Narrative 01",
      img: "/assets/work1.jpg",
      desc: "Short-film grade promotional for lifestyle brand with narrative-driven visuals.",
      client: "Lifestyle Co.",
      tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      duration: "3 weeks",
    },
    {
      title: "Visual Narrative 02",
      img: "/assets/work2.jpg",
      desc: "Product film blending macro motion and CG overlays to highlight features.",
      client: "Tech Gadget Inc.",
      tools: ["Cinema 4D", "Blender", "Photoshop"],
      duration: "2 weeks",
    },
    {
      title: "Visual Narrative 03",
      img: "/assets/work3.jpg",
      desc: "Cinematic launch trailer for digital campaign using drone and gimbal shots.",
      client: "Creative Startups",
      tools: ["Premiere Pro", "After Effects", "DJI Drones"],
      duration: "4 weeks",
    },
    {
      title: "Visual Narrative 04",
      img: "/assets/work4.jpg",
      desc: "Interactive art installation film edit combining projection mapping.",
      client: "Art Lab",
      tools: ["TouchDesigner", "After Effects", "Blender"],
      duration: "3 weeks",
    },
    {
      title: "Visual Narrative 05",
      img: "/assets/work5.jpg",
      desc: "Experimental short exploring identity, sound, and motion design.",
      client: "Independent Artist",
      tools: ["After Effects", "Audition", "Premiere Pro"],
      duration: "2 weeks",
    },
    {
      title: "Visual Narrative 06",
      img: "/assets/work6.jpg",
      desc: "Behind-the-scenes documentary capturing production process and interviews.",
      client: "Film Studio",
      tools: ["Premiere Pro", "DaVinci Resolve", "Canon C300"],
      duration: "3 weeks",
    },
    {
      title: "Visual Narrative 07",
      img: "/assets/work7.jpg",
      desc: "Social media teaser videos optimized for engagement and storytelling.",
      client: "Brand Agency",
      tools: ["After Effects", "Premiere Pro", "Photoshop"],
      duration: "1 week",
    },
    {
      title: "Visual Narrative 08",
      img: "/assets/work8.jpg",
      desc: "360° immersive VR experience filmed for gallery exhibition.",
      client: "Museum XYZ",
      tools: ["Unity", "Blender", "GoPro Fusion"],
      duration: "5 weeks",
    },
    {
      title: "Visual Narrative 09",
      img: "/assets/work9.jpg",
      desc: "Documentary short on urban culture, combining interviews and street footage.",
      client: "Culture Hub",
      tools: ["Premiere Pro", "After Effects", "Canon EOS"],
      duration: "4 weeks",
    },
    {
      title: "Visual Narrative 10",
      img: "/assets/work10.jpg",
      desc: "Motion graphics heavy explainer for a tech startup with data visualization.",
      client: "Tech Startup",
      tools: ["After Effects", "Illustrator", "Figma"],
      duration: "2 weeks",
    },
    {
      title: "Visual Narrative 11",
      img: "/assets/work11.jpg",
      desc: "Cinematic lifestyle edit for social media campaigns and brand awareness.",
      client: "Fashion Brand",
      tools: ["Premiere Pro", "Lightroom", "After Effects"],
      duration: "3 weeks",
    },
    {
      title: "Visual Narrative 12",
      img: "/assets/work12.jpg",
      desc: "Short promotional series with multi-location shoots and advanced color grading.",
      client: "Corporate Client",
      tools: ["DaVinci Resolve", "After Effects", "Premiere Pro"],
      duration: "4 weeks",
    },
  ];

  return (
    <Section id="work" className="bg-black flex-col">
      <motion.h2
        className="text-5xl font-bold mb-10 text-center"
        style={{ fontFamily: theme.fonts.heading }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        Selected Works / Case Studies
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16 max-w-7xl mx-auto">
        {works.map((work, i) => (
          <WorkCard key={i} {...work} />
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   WORK CARD COMPONENT — Expanded with client, tools, duration
   ============================================================ */
function WorkCard({ title, img, desc, client, tools, duration }) {
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
            className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-6"
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
              <img src={img} alt={title} className="w-full h-[70vh] object-cover" />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm mb-1">{desc}</p>
                <p className="text-gray-400 text-xs">Client: {client}</p>
                <p className="text-gray-400 text-xs">Tools: {tools.join(", ")}</p>
                <p className="text-gray-400 text-xs">Duration: {duration}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   EXPANDED SERVICES SECTION
   ============================================================ */
function Services() {
  const services = [
    {
      icon: "🎥",
      title: "Film Production",
      desc: "End-to-end direction, cinematography, and post-production for brands and artists with cinematic storytelling.",
      examples: ["Brand Promo", "Music Video", "Documentary Short"],
      tools: ["Camera", "Drone", "Premiere Pro", "DaVinci Resolve"],
      duration: "1-6 weeks",
    },
    {
      icon: "🪄",
      title: "Motion Design",
      desc: "Animated storytelling using cutting-edge design, sound, and rhythm for digital campaigns.",
      examples: ["Logo Animation", "Explainer Video", "Social Media Content"],
      tools: ["After Effects", "Blender", "Cinema 4D"],
      duration: "1-4 weeks",
    },
    {
      icon: "🌐",
      title: "Digital Experiences",
      desc: "Interactive web and immersive 3D environments bridging creativity, technology, and engagement.",
      examples: ["WebAR", "3D Product Demo", "Interactive Installations"],
      tools: ["Three.js", "React", "Unity", "Blender"],
      duration: "2-8 weeks",
    },
  ];

  return (
    <Section id="services" className="bg-gradient-to-b from-black to-[#0a0612] flex-col text-center">
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
        {services.map((srv, i) => (
          <ServiceCard key={i} {...srv} />
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   SERVICE CARD COMPONENT — Expanded
   ============================================================ */
function ServiceCard({ icon, title, desc, examples, tools, duration }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="bg-surface rounded-3xl border border-white/10 p-8 flex flex-col items-center text-center shadow-lg hover:shadow-indigo-500/20 transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-base mb-3">{desc}</p>

      {hovered && (
        <motion.div
          className="text-gray-400 text-sm space-y-1 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>Examples: {examples.join(", ")}</p>
          <p>Tools: {tools.join(", ")}</p>
          <p>Duration: {duration}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ============================================================
   PART 6 END — Expanded Work + Services
   ============================================================ */
/* ============================================================
   EXPANDED ABOUT SECTION
   ============================================================ */
function About() {
  const teamMembers = [
    { name: "Aarav Sharma", role: "Creative Director", img: "/assets/team1.jpg" },
    { name: "Meera Patel", role: "Lead Cinematographer", img: "/assets/team2.jpg" },
    { name: "Rohan Gupta", role: "3D Artist & Motion Designer", img: "/assets/team3.jpg" },
    { name: "Nisha Kapoor", role: "Post-production Lead", img: "/assets/team4.jpg" },
  ];

  const values = [
    "Innovative storytelling through film & design",
    "Seamless blend of technology and creativity",
    "Collaboration & transparency with clients",
    "Attention to every cinematic detail",
  ];

  const timeline = [
    { year: 2018, milestone: "Founded Pehchaan Media" },
    { year: 2019, milestone: "Completed first 10 client projects" },
    { year: 2020, milestone: "Expanded team and introduced motion design studio" },
    { year: 2022, milestone: "Launched immersive digital experiences division" },
    { year: 2025, milestone: "Recognized as top creative studio for storytelling" },
  ];

  return (
    <Section id="about" className="bg-gradient-to-b from-black via-surface to-black text-center flex-col">
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="max-w-4xl px-6 mx-auto space-y-8">
        <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: theme.fonts.heading }}>Our Identity</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Pehchaan Media is a creative studio driven by cinematic storytelling and immersive experiences. We blend innovative techniques, 3D visuals, and motion design to deliver visually stunning projects for global clients.
        </p>

        {/* Values */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {values.map((val, i) => (
            <motion.div key={i} className="bg-surface/80 p-4 rounded-xl shadow-md text-white text-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.8 }} viewport={{ once: true }}>
              <p className="text-gray-200">• {val}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team */}
        <motion.h3 className="text-3xl font-semibold mt-10 mb-4" style={{ fontFamily: theme.fonts.heading }}>Meet the Team</motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div key={i} className="rounded-xl overflow-hidden shadow-lg bg-surface hover:shadow-indigo-500/30 transition-shadow duration-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.8 }} viewport={{ once: true }}>
              <img src={member.img} alt={member.name} className="w-full h-40 object-cover" />
              <div className="p-3 text-white">
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div className="mt-10 relative border-l border-gray-700 pl-6 space-y-6">
          {timeline.map((item, i) => (
            <motion.div key={i} className="relative" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.8 }} viewport={{ once: true }}>
              <div className="absolute -left-3 w-6 h-6 rounded-full bg-indigo-500 border-2 border-black"></div>
              <p className="text-gray-400 text-sm">{item.year}</p>
              <p className="text-white font-semibold">{item.milestone}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   HERO ENHANCEMENTS — Floating 3D elements
   ============================================================ */
function HeroEnhanced() {
  const supported = isWebGLSupported();

  return (
    <Section id="hero" className="bg-black text-white flex-col select-none overflow-hidden">
      <div className="absolute inset-0 z-0">
        {supported ? (
          <CanvasWrapper height="100vh">
            <Canvas style={{ width: "100%", height: "100%", display: "block" }} camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ antialias: true }}>
              <ResizeHandler />
              <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight intensity={1.2} position={[5, 5, 5]} color={theme.colors.coral} />
                <HeroSphere />
                <ParticleField count={4000} />
                <BackgroundOrbs />
                <Environment preset="studio" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
              </Suspense>
            </Canvas>
          </CanvasWrapper>
        ) : (
          <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-700 to-cyan-500">
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: theme.fonts.heading }}>Pehchaan Media</h1>
          </div>
        )}
      </div>

      {/* Hero Text */}
      <motion.div className="z-10 text-center px-6" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: "easeOut" }}>
        <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight" style={{ fontFamily: theme.fonts.heading }}>
          Digital Storytelling Redefined
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: theme.fonts.body }}>
          Experience cinematic narratives, immersive 3D visuals, and motion design that redefines digital media.
        </p>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   Part 7 End — Expanded About + Hero Enhancements
   ============================================================ */
/* ============================================================
   EXPANDED CONTACT SECTION
   ============================================================ */
function ContactExpanded() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Simulated async form submission
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactMethods = [
    { icon: "📧", method: "Email", value: "contact@pehchaanmedia.com" },
    { icon: "📱", method: "Phone", value: "+1 (555) 123-4567" },
    { icon: "🌐", method: "Website", value: "www.pehchaanmedia.com" },
  ];

  return (
    <Section id="contact" className="bg-gradient-to-b from-[#0a0612] to-black flex-col text-center">
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
        Let’s collaborate on your next story. Reach out to us for film, design, or immersive digital experiences.
      </motion.p>

      {/* Contact Methods */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
        {contactMethods.map((method, i) => (
          <motion.div
            key={i}
            className="bg-surface/80 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-500 flex flex-col items-center text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-3">{method.icon}</div>
            <h4 className="font-semibold mb-1">{method.method}</h4>
            <p className="text-gray-300 text-sm">{method.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
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
          <motion.p className="text-green-400 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Message sent successfully!
          </motion.p>
        ) : (
          <button type="submit" className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold">
            Send Message
          </button>
        )}
      </motion.form>

      {/* Newsletter Signup */}
      <motion.div className="mt-12 max-w-lg mx-auto" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: theme.fonts.heading }}>Subscribe to Updates</h3>
        <p className="text-gray-400 mb-4">Get insights into our latest projects and creative tips.</p>
        <form className="flex gap-2">
          <input type="email" placeholder="Your email" className="flex-1 py-2 px-4 rounded-xl bg-surface/80 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"/>
          <button className="px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors">Subscribe</button>
        </form>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   EXPANDED WORK / CASE STUDIES
   ============================================================ */
function WorkExpanded() {
  const works = [
    {
      title: "Visual Narrative 01",
      img: "/assets/work1.jpg",
      desc: "Short-film grade promotional for lifestyle brand with dynamic storytelling and advanced color grading.",
      details: "Filmed across multiple locations, incorporating slow-motion and macro shots, edited to sync with original soundtrack, final color grade in DaVinci Resolve."
    },
    {
      title: "Visual Narrative 02",
      img: "/assets/work2.jpg",
      desc: "Product film blending macro motion and CG overlays to create cinematic motion graphics.",
      details: "CG elements were integrated using Blender and After Effects, motion-tracked with Mocha Pro, providing seamless product visualization."
    },
    {
      title: "Visual Narrative 03",
      img: "/assets/work3.jpg",
      desc: "Cinematic launch trailer for a digital campaign, combining live-action with interactive 3D assets.",
      details: "Storyboarding focused on emotional arcs; 3D assets rendered in Cinema4D; final composite in After Effects with depth passes for immersive look."
    },
    {
      title: "Visual Narrative 04",
      img: "/assets/work4.jpg",
      desc: "Interactive art installation film edit, exploring generative motion and reactive visuals.",
      details: "Motion capture data used to drive procedural animations; generative visuals implemented via TouchDesigner; installation synced with live audio."
    },
    {
      title: "Visual Narrative 05",
      img: "/assets/work5.jpg",
      desc: "Experimental short exploring identity, sound, and spatial storytelling.",
      details: "Cinematography experimented with lens distortions and slow shutter speeds; sound design emphasized binaural audio and layered textures."
    },
    {
      title: "Visual Narrative 06",
      img: "/assets/work6.jpg",
      desc: "Behind-the-scenes documentary cut for an immersive marketing campaign.",
      details: "Included interviews, workflow breakdown, and interactive 3D model showcases to highlight process transparency."
    },
  ];

  return (
    <Section id="work" className="bg-black flex-col">
      <motion.h2
        className="text-5xl font-bold mb-10 text-center"
        style={{ fontFamily: theme.fonts.heading }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        Selected Case Studies
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-16 max-w-7xl mx-auto">
        {works.map((work, i) => (
          <WorkCardDetailed key={i} {...work} />
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   DETAILED WORK CARD COMPONENT
   ============================================================ */
function WorkCardDetailed({ title, img, desc, details }) {
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
        <img src={img} alt={title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300">{desc}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-6 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-6xl w-full rounded-xl overflow-hidden shadow-2xl bg-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <img src={img} alt={title} className="w-full h-[60vh] object-cover" />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">{desc}</p>
                <p className="text-gray-400 text-xs mt-2">{details}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
/* ============================================================
   EXPANDED SERVICES SECTION
   ============================================================ */
function ServicesExpanded() {
  const services = [
    {
      icon: "🎥",
      title: "Film Production",
      desc: "End-to-end direction, cinematography, and post-production for brands and artists.",
      caseStudies: [
        { title: "Luxury Brand Promo", details: "Shot on RED cameras, 6 locations, advanced color grading and motion graphics integration." },
        { title: "Lifestyle Short Film", details: "Drone cinematography combined with on-set practical lighting for cinematic storytelling." },
        { title: "Music Video Production", details: "Dynamic multi-camera setup, choreographed shots, and post-production visual effects." },
      ],
    },
    {
      icon: "🪄",
      title: "Motion Design",
      desc: "Animated storytelling using cutting-edge design, sound, and rhythm.",
      caseStudies: [
        { title: "Product Reveal Animation", details: "3D product renders with seamless motion graphics overlays." },
        { title: "Social Media Campaign", details: "Kinetic typography and sound-synced animations for viral reach." },
        { title: "Brand Identity Motion", details: "Logo animation sequences, brand transitions, and cinematic effects." },
      ],
    },
    {
      icon: "🌐",
      title: "Digital Experiences",
      desc: "Interactive web and immersive 3D environments bridging creativity and tech.",
      caseStudies: [
        { title: "Virtual Art Gallery", details: "WebGL-powered 3D space for interactive viewing of artwork." },
        { title: "Interactive Marketing Landing Page", details: "Scroll-triggered animations with 3D elements for engagement." },
        { title: "AR/VR Immersive Experience", details: "Unity & WebXR implementation with responsive performance optimization." },
      ],
    },
  ];

  return (
    <Section id="services" className="bg-gradient-to-b from-black to-[#0a0612] flex-col text-center">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 md:px-20 max-w-7xl mx-auto">
        {services.map((srv, i) => (
          <ServiceCardExpanded key={i} {...srv} />
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   SERVICE CARD WITH CASE STUDIES
   ============================================================ */
function ServiceCardExpanded({ icon, title, desc, caseStudies }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-surface rounded-3xl border border-white/10 p-8 hover:border-indigo-500 transition-all duration-500 flex flex-col items-center text-center shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1 }}
        viewport={{ once: true }}
        onClick={() => setOpen(true)}
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-base">{desc}</p>
        <button className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">
          Explore
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-6 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl w-full rounded-xl overflow-hidden shadow-2xl bg-black p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-3xl font-bold mb-6">{title}</h3>
              <p className="text-gray-300 mb-6">{desc}</p>
              <div className="grid grid-cols-1 gap-4">
                {caseStudies.map((c, i) => (
                  <div key={i} className="bg-surface/80 p-4 rounded-lg shadow-md hover:shadow-indigo-500/30 transition-shadow duration-500">
                    <h4 className="font-semibold text-lg">{c.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{c.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   BACKGROUND 3D ENHANCEMENTS
   ============================================================ */
function AdvancedBackground3D() {
  const group = useRef();
  const { clock } = useThree();
  const orbs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 10
        ),
        scale: 0.1 + Math.random() * 0.5,
        color: i % 2 === 0 ? theme.colors.indigo : theme.colors.cyan,
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.4;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.1) * 0.3;
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
            emissiveIntensity={0.7}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
   PARALLAX FLOATING SHAPES
   ============================================================ */
function FloatingShapes() {
  const shapes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 10
        ),
        scale: 0.2 + Math.random() * 0.5,
        color: i % 2 === 0 ? theme.colors.coral : theme.colors.cyan,
      });
    }
    return arr;
  }, []);

  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.6;
      group.current.rotation.x = Math.cos(clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.pos} scale={shape.scale}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial
            color={shape.color}
            emissive={shape.color}
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
   INTEGRATED BACKGROUND COMPONENT
   ============================================================ */
function BackgroundScene() {
  const supported = isWebGLSupported();
  if (!supported) return null;

  return (
    <CanvasWrapper height="100vh">
      <Canvas
        style={{ width: "100%", height: "100%", background: theme.colors.bg }}
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ResizeHandler />
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color={theme.colors.indigo} />
          <AdvancedBackground3D />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </CanvasWrapper>
  );
}
