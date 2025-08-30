import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Code,
  Database,
  Settings,
  Sparkles,
  Zap,
  Globe,
  Server,
} from "lucide-react";

const skills = [
  // Frontend
  {
    name: "HTML/CSS",
    category: "frontend",
    icon: "🌐",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "JavaScript",
    category: "frontend",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "React",
    category: "frontend",
    icon: "⚛️",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: "🔷",
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icon: "🎨",
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: "🚀",
    color: "from-gray-800 to-gray-900",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    icon: "🟢",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Express",
    category: "backend",
    icon: "📡",
    color: "from-gray-600 to-gray-700",
  },
  {
    name: "MongoDB",
    category: "backend",
    icon: "🍃",
    color: "from-green-600 to-green-700",
  },
  {
    name: "PostgreSQL",
    category: "backend",
    icon: "🐘",
    color: "from-blue-700 to-indigo-700",
  },
  {
    name: "GraphQL",
    category: "backend",
    icon: "🔮",
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Python",
    category: "backend",
    icon: "🐍",
    color: "from-yellow-600 to-orange-600",
  },
  {
    name: "FastAPI",
    category: "backend",
    icon: "⚡",
    color: "from-green-500 to-teal-500",
  },

  // Tools
  {
    name: "Git/GitHub",
    category: "tools",
    icon: "📚",
    color: "from-gray-700 to-gray-800",
  },
  {
    name: "Docker",
    category: "tools",
    icon: "🐳",
    color: "from-blue-500 to-indigo-500",
  },
];

const categories = [
  {
    id: "all",
    name: "All Skills",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "tools",
    name: "Tools",
    icon: Zap,
    color: "from-orange-500 to-red-500",
  },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-32 px-4 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Redesigned section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-r from-primary via-purple-500 to-cyan-500 p-3 rounded-full">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed font-light">
            A curated collection of technologies and tools I've mastered through
            years of development
          </p>
        </div>

        {/* Redesigned category filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "group relative px-8 py-4 rounded-2xl transition-all duration-500 font-semibold flex items-center space-x-3 overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r " +
                        category.color +
                        " text-white shadow-2xl shadow-primary/30 scale-105"
                    : "bg-white/10 backdrop-blur-sm border border-white/20 text-foreground/80 hover:scale-105 hover:shadow-xl hover:bg-white/20"
                )}
              >
                <IconComponent
                  className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )}
                />
                <span className="text-lg">{category.name}</span>

                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Redesigned skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group-hover:border-white/40 overflow-hidden">
                {/* Skill icon with gradient background */}
                {/* <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{skill.icon}</span>
                </div> */}

                {/* Skill name */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </h3>

                {/* Category badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-white/20 to-white/10 border border-white/20">
                  <span className="text-sm font-medium text-foreground/80 capitalize">
                    {skill.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills count indicator */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-sm font-medium text-foreground/60">
              Showing {filteredSkills.length} of {skills.length} skills
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
