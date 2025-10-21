import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, ArrowRight } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0D17] to-[#11142a] flex flex-col items-center justify-center px-6 py-12 text-center">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="text-white">Pehchaan Media</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10">
          We craft identity through motion, visuals, and purpose.  
          A modern media house shaping stories that move people.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            <a href="https://instagram.com/pehchaan.media" target="_blank" rel="noopener noreferrer">
              <Instagram className="inline-block mr-2" size={18} />
              Follow us on Instagram
            </a>
          </Button>

          <Button
            asChild
            className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            <a href="#work">
              Explore Our Work <ArrowRight className="inline-block ml-2" size={18} />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Work Section */}
      <motion.section
        id="work"
        className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
        }}
      >
        {[
          { title: "Brand Films", desc: "Visual storytelling that defines your essence." },
          { title: "Digital Campaigns", desc: "Creative strategies that move markets and minds." },
          { title: "Design & Identity", desc: "Creating visuals that breathe life into your story." },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition shadow-lg"
            whileHover={{ scale: 1.04 }}
          >
            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
            <p className="text-gray-400">{card.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
      <footer className="mt-24 text-sm text-gray-500">
        © {new Date().getFullYear()} Pehchaan Media. All rights reserved.
      </footer>
    </div>
  );
}
