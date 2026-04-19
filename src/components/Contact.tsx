import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail size={22} />,
    label: "Email",
    value: "manishchavan80@gmail.com",
    href: "mailto:manishchavan80@gmail.com",
  },
  {
    icon: <MapPin size={22} />,
    label: "Location",
    value: "Koblenz, Germany",
    href: null,
  },
];

const socials = [
  {
    icon: <Github size={22} />,
    label: "GitHub",
    handle: "@ManishC31",
    href: "https://github.com/ManishC31",
  },
  {
    icon: <Linkedin size={22} />,
    label: "LinkedIn",
    handle: "Manish Chavan",
    href: "https://www.linkedin.com/in/manish-chavan-58676019a/",
  },
  {
    icon: <Twitter size={22} />,
    label: "X / Twitter",
    handle: "@ManishC31",
    href: "https://twitter.com/ManishC31",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title mb-4">
            Get in <span className="neon-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Whether it's a Werkstudent opportunity, an open-source collab, or
            just a nerdy conversation about AI — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact info cards */}
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-futuristic flex items-start gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-foreground font-medium hover:text-primary transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}

          {/* Currently card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-futuristic"
          >
            <p className="text-sm text-muted-foreground mb-1">Currently</p>
            <p className="text-foreground font-medium">
              M.Sc. Web & Data Science
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Universität Koblenz · Open to Werkstudent roles
            </p>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-futuristic flex items-center gap-3 !py-4 !px-6 group"
            >
              <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {s.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.handle}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="section-container mt-24 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Manish Chavan. All rights reserved.
          </p>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
