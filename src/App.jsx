/* ============================================================
   PehchaanMediaPortfolioFull — Merged App.jsx (Parts 1–3)
   ============================================================ */

import React, { useState, useEffect, useRef, useMemo, Suspense, createContext } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Sphere, Float, Environment, OrbitControls, Html, useProgress, Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import * as THREE from 'three';

/* ============================================================
   THEME AND CONTEXT
   ============================================================ */
const theme = {
  colors: {
    bg: '#050307',
    surface: '#0b0614',
    indigo: '#8B5CF6',
    cyan: '#00F5FF',
    coral: '#FF6F61',
    white: '#FFFFFF',
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Satoshi", sans-serif',
  },
};

const AppContext = createContext({ dark: true, toggleTheme: () => {} });

export function AppProvider({ children }) {
  const [dark, setDark] = useState(true);
  const toggleTheme = () => setDark(prev => !prev);
  return <AppContext.Provider value={{ dark, toggleTheme }}>{children}</AppContext.Provider>;
}

/* ============================================================
   WEBGL SUPPORT CHECK
   ============================================================ */
function isWebGLSupported() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
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
      gl.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [camera, gl]);
  return null;
}

/* ============================================================
   LENIS SMOOTH SCROLL
   ============================================================ */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothTouch: true, touchMultiplier: 1.5 });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

/* ============================================================
   BASIC WRAPPERS
   ============================================================ */
export const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative w-full min-h-screen flex items-center justify-center ${className}`}>
    {children}
  </section>
);

export const CanvasWrapper = ({ children, height = '100vh' }) => (
  <div data-lenis-prevent className='canvas-wrapper relative w-full overflow-hidden' style={{ height }}>
    {children}
  </div>
);

/* ============================================================
   HERO SPHERE
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

  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: theme.colors.indigo,
    emissive: new THREE.Color(theme.colors.cyan).multiplyScalar(0.3),
    roughness: 0.15,
    metalness: 0.9,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
    transmission: 0.7,
    ior: 1.3,
  }), []);

  return <Float speed={2} rotationIntensity={1} floatIntensity={1}>
    <Sphere args={[1, 64, 64]} ref={mesh} material={mat} />
  </Float>;
}

/* ============================================================
   CANVAS LOADER
   ============================================================ */
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <motion.div className='text-white text-sm font-medium tracking-wider'>
        {progress.toFixed(0)}% loaded
      </motion.div>
    </Html>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
export function HeroSection() {
  const supported = isWebGLSupported();
  return (
    <Section id='hero' className='bg-black text-white flex-col select-none overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        {supported ? (
          <CanvasWrapper height='100vh'>
            <Canvas
              style={{ width: '100%', height: '100%', display: 'block', background: theme.colors.bg }}
              camera={{ position: [0, 0, 2.5], fov: 45 }}
              gl={{ antialias: true }}
            >
              <ResizeHandler />
              <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight intensity={1.2} position={[5, 5, 5]} color={theme.colors.coral} />
                <HeroSphere />
                <Environment preset='studio' />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
              </Suspense>
            </Canvas>
          </CanvasWrapper>
        ) : (
          <div className='flex items-center justify-center h-screen bg-gradient-to-br from-indigo-700 to-cyan-500'>
            <h1 className='text-5xl font-bold text-white' style={{ fontFamily: theme.fonts.heading }}>Pehchaan Media</h1>
          </div>
        )}
      </div>
      <motion.div className='z-10 text-center px-6' initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: 'easeOut' }}>
        <h1 className='text-6xl md:text-7xl font-bold mb-4 tracking-tight' style={{ fontFamily: theme.fonts.heading }}>Digital Storytelling Redefined</h1>
        <p className='text-lg md:text-xl text-gray-300 max-w-2xl mx-auto' style={{ fontFamily: theme.fonts.body }}>Crafting cinematic, interactive, and digital narratives for brands and creators worldwide.</p>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   WORK / CASE STUDIES SECTION V1
   ============================================================ */
export function WorkSectionV1() {
  const works = [
    {
      title: "Interactive Brand Experience",
      img: "/assets/work1.jpg",
      desc: "Designed a fully interactive brand experience integrating AR and web.",
      client: "Globex Corp",
      tools: ["React", "Three.js", "Blender"],
      duration: "6 months",
    },
    {
      title: "Cinematic Campaign",
      img: "/assets/work2.jpg",
      desc: "Created a cinematic digital campaign for social and web channels.",
      client: "Initech",
      tools: ["After Effects", "Premiere Pro", "Figma"],
      duration: "4 months",
    },
    {
      title: "Product Launch Website",
      img: "/assets/work3.jpg",
      desc: "Built a dynamic product launch site with immersive visuals and storytelling.",
      client: "Umbrella Corp",
      tools: ["Next.js", "Tailwind CSS", "Three.js"],
      duration: "3 months",
    },
  ];

  return (
    <section id="work" className="bg-surface text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: '"Playfair Display", serif' }}>Work / Case Studies</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {works.map((w, i) => (
            <WorkCardV1 key={i} {...w} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WORK CARD COMPONENT V1
   ============================================================ */
export function WorkCardV1({ title, img, desc, client, tools, duration }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="cursor-pointer bg-gray-900 rounded-xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.03 }}
    >
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden text-gray-300 text-sm"
            >
              <p className="mb-2">{desc}</p>
              <p><strong>Client:</strong> {client}</p>
              <p><strong>Tools:</strong> {tools.join(", ")}</p>
              <p><strong>Duration:</strong> {duration}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
/* ============================================================
   SERVICES SECTION V1
   ============================================================ */
export function ServicesSectionV1() {
  const services = [
    {
      icon: "🎬",
      title: "Cinematic Storytelling",
      desc: "We craft cinematic narratives that captivate and engage audiences.",
      examples: ["Brand films", "Product launches", "Documentaries"],
      tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      duration: "Ongoing projects",
    },
    {
      icon: "💻",
      title: "Interactive Experiences",
      desc: "Creating immersive web and AR experiences for brands and creators.",
      examples: ["Web AR", "3D WebGL", "Interactive campaigns"],
      tools: ["React", "Three.js", "Blender"],
      duration: "Varies per project",
    },
    {
      icon: "🎨",
      title: "Design & Branding",
      desc: "Delivering visual design and branding that resonates with your audience.",
      examples: ["Brand identity", "UX/UI design", "Campaign graphics"],
      tools: ["Figma", "Adobe XD", "Photoshop"],
      duration: "3–6 months",
    },
  ];

  return (
    <section id="services" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: '"Playfair Display", serif' }}>Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ServiceCardV1 key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICE CARD COMPONENT V1
   ============================================================ */
export function ServiceCardV1({ icon, title, desc, examples, tools, duration }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-gray-900 rounded-xl p-6 shadow-lg cursor-pointer"
      whileHover={{ scale: 1.04 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-2">{desc}</p>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden text-sm text-gray-400 mt-2"
        >
          <p><strong>Examples:</strong> {examples.join(", ")}</p>
          <p><strong>Tools:</strong> {tools.join(", ")}</p>
          <p><strong>Duration:</strong> {duration}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ============================================================
   ABOUT SECTION V1
   ============================================================ */
export function AboutSectionV1() {
  const teamMembers = [
    { name: "Aarav Sharma", role: "Creative Director", img: "/assets/team1.jpg" },
    { name: "Meera Kapoor", role: "Lead Designer", img: "/assets/team2.jpg" },
    { name: "Rohan Verma", role: "3D & Motion Artist", img: "/assets/team3.jpg" },
    { name: "Sanya Patel", role: "Front-end Developer", img: "/assets/team4.jpg" },
  ];

  return (
    <section id="about" className="bg-gray-900 text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: '"Playfair Display", serif' }}>About Us</h2>

        {/* Mission / Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-gray-300 text-lg md:text-xl"
        >
          <p>
            Pehchaan Media is a global creative studio redefining digital storytelling. We combine cinematic visuals,
            interactive technology, and design thinking to craft immersive experiences for brands and creators.
          </p>
          <p className="mt-4">
            Our team thrives on collaboration, creativity, and precision, delivering projects that not only engage
            audiences but also leave a lasting impact.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid md:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <TeamMemberCardV1 key={idx} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TEAM MEMBER CARD COMPONENT V1
   ============================================================ */
export function TeamMemberCardV1({ name, role, img }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-gray-800"
      whileHover={{ scale: 1.03 }}
    >
      <img src={img} alt={name} className="w-full h-64 object-cover" />
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-300">{role}</p>
      </motion.div>
    </motion.div>
  );
}
/* ============================================================
   CONTACT SECTION V1
   ============================================================ */
export function ContactSectionV1() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // Placeholder
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="bg-gray-900 text-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: '"Playfair Display", serif' }}>Get in Touch</h2>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-green-700 rounded text-white text-center"
          >
            Thank you! Your message has been sent.
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="grid gap-6">
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="p-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </form>
        <div className="mt-12 text-gray-400 text-sm text-center">
          Or reach us at <a href="mailto:contact@pehchaanmedia.com" className="text-indigo-400 hover:underline">contact@pehchaanmedia.com</a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER SECTION V1
   ============================================================ */
export function FooterSectionV1() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} Pehchaan Media. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://instagram.com/pehchaanmedia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://linkedin.com/company/pehchaanmedia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://twitter.com/pehchaanmedia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   PARTICLE FIELD COMPONENT V1
   ============================================================ */
export function ParticleFieldV1({ count = 500, radius = 10 }) {
  const pointsRef = useRef();
  const [positions] = useState(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push((Math.random() - 0.5) * radius);
      arr.push((Math.random() - 0.5) * radius);
      arr.push((Math.random() - 0.5) * radius);
    }
    return new Float32Array(arr);
  });

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#8B5CF6" size={0.05} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

/* ============================================================
   BACKGROUND CANVAS V1
   ============================================================ */
export function BackgroundCanvasV1() {
  if (typeof window === 'undefined') return null;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <ParticleFieldV1 count={1000} radius={15} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ============================================================
   THEME TOGGLE BUTTON V1
   ============================================================ */
export function ThemeToggleV1({ dark, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 bg-gray-800 text-white p-2 rounded shadow-lg hover:bg-gray-700 transition-colors"
      whileHover={{ scale: 1.1 }}
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </motion.button>
  );
}

/* ============================================================
   SCROLL TO TOP BUTTON V1
   ============================================================ */
export function ScrollToTopButtonV1() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500"
      whileHover={{ scale: 1.1 }}
    >
      ↑
    </motion.button>
  );
}

/* ============================================================
   ERROR BOUNDARY V1
   ============================================================ */
export class PortfolioErrorBoundaryV1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error.toString() };
  }

  componentDidCatch(error, info) {
    console.error("PortfolioErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-900 text-white p-6">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-sm">{this.state.errorInfo}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
