import React from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ResumeSection from "./components/ResumeSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";

const App = () => {
  return (
    <div>
      {/* navbar starts */}
      <header
        id="header"
        className="header d-flex align-items-center sticky-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="#" className="logo d-flex align-items-center">
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1 className="sitename">MANISH CHAVAN</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a
                  href="#hero"
                  // className="active"
                >
                  Home
                  <br />
                </a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#portfolio">Resume</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </header>

      {/* navbar ends here */}

      <main className="main">
        <section id="hero" className="hero section dark-background">
          <HeroSection />
        </section>

        <section id="about" className="about section">
          <AboutSection />
        </section>

        <section id="portfolio" className="resume section">
          <ResumeSection />
        </section>

        <section id="work" className="services section">
          <ServicesSection />
        </section>

        <section id="contact" className="contact section">
          <ContactSection />
        </section>
      </main>

      {/* Scroll to top  */}
      <a
        href="#"
        id="scroll-top"
        class="scroll-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>

      {/* Preloader */}
      {/* <div id="preloader"></div> */}
    </div>
  );
};

export default App;
