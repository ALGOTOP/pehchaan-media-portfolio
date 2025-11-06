import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CaseStudiesData from "../CaseStudiesData";
import { fadeInUp } from "@/utils/animations";

export default function CaseStudiesPreview() {
  const preview = CaseStudiesData.slice(0, 3);

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          Featured Case Studies
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {preview.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
            >
              <img src={item.cover} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm mb-4">{item.description}</p>
                <Link to={`/case-studies/${item.slug}`} className="text-indigo-400 hover:text-indigo-300">
                  View Case Study →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/case-studies"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-neutral-200 transition"
          >
            View Detailed Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
