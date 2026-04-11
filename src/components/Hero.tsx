import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

const InteractiveHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dots: Array<{
      x: number; y: number; baseX: number; baseY: number;
      size: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const spacing = 35;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;
          const hue = 220 + Math.random() * 40;
          dots.push({
            x, y, baseX: x, baseY: y,
            size: 1.2,
            color: `hsla(${hue}, 80%, 60%, 0.25)`,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const radius = 180;

      dots.forEach((d) => {
        const dx = mx - d.baseX;
        const dy = my - d.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          d.x = d.baseX - Math.cos(angle) * force * 30;
          d.y = d.baseY - Math.sin(angle) * force * 30;
          const brightness = 50 + force * 30;
          const opacity = 0.3 + force * 0.7;
          const hue = 220 + force * 40;
          ctx.fillStyle = `hsla(${hue}, 90%, ${brightness}%, ${opacity})`;
          ctx.shadowColor = `hsla(${hue}, 90%, 60%, ${force * 0.6})`;
          ctx.shadowBlur = force * 15;
          d.size = 1.2 + force * 2.5;
        } else {
          d.x += (d.baseX - d.x) * 0.08;
          d.y += (d.baseY - d.y) * 0.08;
          d.size += (1.2 - d.size) * 0.08;
          ctx.fillStyle = d.color;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Glow ring around cursor
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, radius);
      gradient.addColorStop(0, "hsla(240, 80%, 60%, 0.06)");
      gradient.addColorStop(0.5, "hsla(220, 80%, 50%, 0.02)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive mouse-driven background */}
      <InteractiveHeroCanvas />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="glass px-4 py-2 rounded-full text-xs sm:text-sm text-muted-foreground tracking-wider uppercase">
              Full-Stack Developer • GenAI Explorer • Master's @ Uni Koblenz
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6">
            <span className="text-foreground">Manish </span>
            <span className="neon-text">Chavan</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Software Engineer & AI Enthusiast — pursuing a Master's in Computer
            Science with a focus on Machine Learning and Artificial Intelligence.
            Passionate about building intelligent systems that solve real-world problems.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary-glow"
            >
              View Projects
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-glow"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center justify-center gap-5"
          >
            <a href="https://github.com/ManishC31" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com/in/manish-chavan-58676019a" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Linkedin size={22} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown size={20} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
