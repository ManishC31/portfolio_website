import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const education = [
  {
    degree: "Master of Science in Computer Science",
    university: "University of Koblenz",
    period: "2025 – Present",
    location: "Koblenz, Germany",
    description:
      "Pursuing advanced studies in Computer Science with a focus on Machine Learning, Artificial Intelligence, and modern software engineering practices.",
  },
  {
    degree: "Bachelor of Engineering in Information Technology",
    university: "University of Mumbai",
    period: "2017 – 2021",
    location: "Mumbai, India",
    description:
      "Graduated with a strong foundation in software development, data structures, algorithms, and full-stack web technologies. Published research in IRJET 2021.",
  },
];

const Education = () => {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title mb-4">
            Academic <span className="neon-text">Background</span>
          </h2>
          <p className="section-subtitle">
            Building expertise through rigorous academic programs across two continents.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-5 h-5 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_hsl(var(--primary)/0.4)] hidden sm:block" />

                <div className="card-futuristic group hover:border-primary/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap size={18} className="text-primary" />
                        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                          {edu.degree}
                        </h3>
                      </div>
                      <p className="text-base text-muted-foreground font-medium">
                        {edu.university}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 sm:items-end shrink-0">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar size={14} className="text-primary/70" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin size={14} className="text-primary/70" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
