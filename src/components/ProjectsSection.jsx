import { useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Sparkles,
  X,
  Code,
  Zap,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "TaskMind AI",
      description:
        "AI-powered productivity platform that intelligently manages, prioritizes, and automates your daily tasks using generative AI.",
      detailedDescription: `
    <div class="space-y-4 text-muted-foreground leading-relaxed">
  <p>
    <strong>TaskMind AI</strong> is an intelligent task management web application built with <strong>Next.js</strong> and powered by <strong>AI</strong>. It combines modern task management with smart automation to help users create, organize, and prioritize tasks effortlessly.
  </p>

  <p>
    Users can enter tasks in natural language — for example, <em>"Finish the client proposal by Friday"</em> — and the AI automatically identifies the task, sets deadlines, and assigns categories. The system provides intelligent suggestions for priorities, dependencies, and subtasks.
  </p>

  <p>
    The interface, designed with <strong>Tailwind CSS</strong> and <strong>Shadcn UI</strong>, delivers a clean and responsive experience. With <strong>Framer Motion</strong> animations and built-in dark mode, the app ensures smooth performance and modern aesthetics across all devices.
  </p>

  <p>
    On the backend, <strong>Next.js API routes</strong> and <strong>MongoDB</strong> power data storage, authentication, and synchronization for seamless productivity. 
    <strong>TaskMind AI</strong> transforms daily task management into an intelligent, adaptive workflow that evolves with the user.
  </p>
</div>
`,
      image: "/projects/taskmindai.png",
      tags: ["Next.js", "TypeScript", "AI", "TailwindCSS"],
      demoUrl: "https://taskmind-ai.manishchavan.in",
      githubUrl: "https://github.com/ManishC31/AI-Task-Manager",
      features: [
        "AI-Powered Task Creation",
        "Natural Language Input",
        "Priority Suggestions",
        "Dark Mode Support",
        "Responsive UI",
        "Smooth Animations",
      ],
      techStack: {
        frontend: ["NextJS", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
        backend: ["NextJS API Routes", "MongoDB"],
        deployment: ["Vercel"],
        language: ["TypeScript"],
        aiIntegration: ["OpenAI API", "Natural Language Processing"],
      },
      usage:
        "TaskMind AI can be used by individuals, students, and teams to plan projects, set smart goals, and let AI handle repetitive organization tasks. It's ideal for developers, freelancers, and professionals who want a personal productivity assistant that adapts to their workflow.",
      underDevelopment: false,
    },

    {
      id: 2,
      title: "MindVista",
      description:
        "An online learning platform where teachers can create courses and students can enroll to learn from educators worldwide.",
      image: "/projects/mindvista.png",
      tags: ["React", "Javascript", "NodeJS", "TailwindCSS"],
      demoUrl: "https://mindvista.manishchavan.in",
      githubUrl: "https://github.com/ManishC31/AI-Task-Manager",
      githubBackendUrl: "",
      features: [
        "Responsive UI",
        "Course Creation and Management",
        "Student Enrollment System",
        "Instructor and Student Dashboards",
        "Secure Authentication",
        "Payment Integration",
      ],
      techStack: {
        frontend: ["React", "Tailwind CSS"],
        backend: ["NodeJS", "PostgreSQL"],
        deployment: ["AWS"],
        language: ["Javascript"],
      },
      usage:
        "MindVista is an edtech platform where teachers can create and manage courses, and students can enroll and learn from educators around the world.",
      underDevelopment: true,
    },
  ];

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section id="projects" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Featured{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects. Click on any to learn more.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group relative bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Under Development Badge */}
              {project.underDevelopment && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-full shadow-lg">
                    Under Development
                  </span>
                </div>
              )}

              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Under Development Badge */}
                {project.underDevelopment && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs font-medium bg-red-500/90 text-white rounded-full border border-red-400/50 backdrop-blur-sm">
                      Under Development
                    </span>
                  </div>
                )}
              </div>

              {/* Card content */}
              <div className="p-6 relative z-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground border border-muted/30 rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Features preview */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Key Features
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs bg-muted/30 text-muted-foreground rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 2 && (
                      <span className="px-2 py-1 text-xs bg-muted/30 text-muted-foreground rounded-md">
                        +{project.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Featured</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary via-purple-600 to-cyan-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
            target="_blank"
            href="https://github.com/manishc31"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>Check My Github</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-md p-3">
          <div className="relative bg-background rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden border border-white/10 shadow-2xl">
            {/* Modal Header */}
            <div className="relative h-80 md:h-96 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-colors text-white"
              >
                <X size={20} />
              </button>

              {/* Header content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium hover:bg-white/30 transition-colors border border-white/30"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {selectedProject.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(92vh-20rem)]">
              {/* Description */}
              {/* <div className="mb-8">
                <h4 className="text-lg md:text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Code className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  About This Project
                </h4>
                <div
                  className="prose prose-xs md:prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: selectedProject.detailedDescription,
                  }}
                />
              </div> */}

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg md:text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 md:p-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-xl border border-muted/30 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-xs md:text-sm font-medium text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground flex items-center gap-2">
                  <Code className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Technology Stack
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {Object.entries(selectedProject.techStack).map(
                    ([category, technologies]) => (
                      <div key={category} className="space-y-2 md:space-y-3">
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <div className="w-1 h-5 md:h-6 bg-gradient-to-b from-primary to-purple-500 rounded-full"></div>
                          <h5 className="font-semibold text-foreground capitalize text-xs md:text-sm">
                            {category.replace(/([A-Z])/g, " $1").trim()}
                          </h5>
                        </div>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[10px] md:text-xs font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Usage */}
              <div className="mb-12">
                <h4 className="text-lg md:text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Use Cases
                </h4>
                <div className="p-4 md:p-6 bg-gradient-to-r from-muted/10 via-muted/20 to-muted/10 rounded-xl border border-muted/30 backdrop-blur-sm">
                  <p className="text-muted-foreground leading-relaxed text-xs md:text-sm">
                    {selectedProject.usage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
