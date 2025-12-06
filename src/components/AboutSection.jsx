import {
  Briefcase,
  Code,
  User,
  Sparkles,
  ArrowRight,
  Download,
} from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Background decoration - theme-aware */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/90 bg-clip-text text-transparent">
                  Passionate Web Developer
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  & Tech Enthusiast
                </span>
              </h3>

              <div className="space-y-4 text-lg leading-relaxed">
                <p className="text-muted-foreground/90">
                  With over{" "}
                  <span className="text-primary font-semibold">3 years</span> of
                  experience as a full-stack developer, I specialize in creating
                  responsive, accessible, and performant web applications using
                  modern technologies.
                </p>

                <p className="text-muted-foreground/90">
                  I'm passionate about creating elegant solutions to complex
                  problems, and I'm constantly learning new technologies and
                  techniques to stay at the forefront of the ever-evolving web
                  landscape.
                </p>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="https://www.linkedin.com/in/manish-chavan-58676019a"
                className="group relative inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-primary via-purple-600 to-cyan-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
                target="_blank"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="/manish_chavan_cv.pdf"
                download="manish_chavan_cv.pdf"
                className="group relative inline-flex items-center justify-center px-6 py-3 text-primary border-2 border-primary rounded-full overflow-hidden transition-all duration-500 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right content - Enhanced cards */}
          <div className="space-y-6">
            <div className="group relative glass-card-theme p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-foreground mb-2">
                    Web Development
                  </h4>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Creating responsive websites and web applications with
                    modern frameworks and cutting-edge technologies.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative glass-card-theme p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
                  <User className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-foreground mb-2">
                    GenAI Applications
                  </h4>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Building innovative applications with Generative AI
                    technologies and machine learning integration.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative glass-card-theme p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-primary/20 border border-cyan-500/30">
                  <Briefcase className="h-6 w-6 text-cyan-500" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-foreground mb-2">
                    Project Management
                  </h4>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Leading projects from conception to completion with agile
                    methodologies and efficient team collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional info section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-6 px-8 py-6 glass-theme rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            {/* <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">50+</div>
              <div className="text-sm text-muted-foreground">
                Projects Completed
              </div>
            </div> */}
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-500">15+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
