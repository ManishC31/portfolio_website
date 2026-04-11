import { motion } from "framer-motion";
import { Server, Monitor, Brain, Wrench } from "lucide-react";
import { skillGroups, experiences } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={20} />,
  Monitor: <Monitor size={20} />,
  Brain: <Brain size={20} />,
  Wrench: <Wrench size={20} />,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title mb-4">
            About <span className="neon-text">Me</span>
          </h2>
          <p className="section-subtitle">
            I'm a developer who thrives at the intersection of backend engineering and AI.
            Over 3 years at Assesshub, I led teams, scaled apps to 25K+ monthly users, and
            wrangled 1M+ database records — all while weaving generative AI into real products.
            Now I'm pursuing my Master's in Web & Data Science at Universität Koblenz, Germany,
            sharpening the research side of what I build.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUp} className="card-futuristic">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  {iconMap[group.icon]}
                </div>
                <h3 className="font-display font-semibold text-base text-foreground">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-8">
            Experience
          </h3>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {experiences.map((exp) => (
              <motion.div key={exp.company + exp.role} variants={fadeUp} className="relative pl-12 md:pl-20">
                {/* Dot */}
                <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-primary glow-effect" />
                <div className="card-futuristic">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h4 className="font-display font-semibold text-foreground">{exp.role}</h4>
                      <p className="text-primary text-sm">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 sm:mt-0 glass px-3 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
