import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Blog />
      <Contact />
    </div>
  );
};

export default Index;
