import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import HeaderSection from "./components/HeaderSection";
import Navbar from "./components/Navbar";
import Technologies from "./components/Technologies";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeaderSection />
      <Technologies />
      <Education />
      <Experience />
      <Contact />
    </div>
  );
}
