import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
  Github,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/manish-chavan-58676019a",
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/manishc31",
      color: "text-gray-400",
      bgColor: "bg-gray-500/20",
      borderColor: "border-gray-500/30",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "#",
      color: "text-sky-500",
      bgColor: "bg-sky-500/20",
      borderColor: "border-sky-500/30",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-500/30",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      {/* Background decoration - theme-aware */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Get In{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach
            out. I'm always open to discussing new opportunities and exciting
            projects.
          </p>
        </div>

        <div className="grid grid-cols-1">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground mb-8">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Contact Information
                </span>
              </h3>

              {/* Side by side on desktop, stacked on mobile */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="flex-1">
                  <div className="group relative glass-card-theme p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10 flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-start">
                        <h4 className="font-bold text-lg text-foreground mb-2">
                          Email
                        </h4>
                        <a
                          href="mailto:manishchavan80@gmail.com"
                          className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-lg"
                        >
                          manishchavan80@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="group relative glass-card-theme p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10 flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
                        <MapPin className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="text-start">
                        <h4 className="font-bold text-lg text-foreground mb-2">
                          Location
                        </h4>
                        <span className="text-muted-foreground/80 text-lg">
                          Mumbai, Maharashtra, India
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced social media section */}
            <div className="pt-8">
              <h4 className="font-bold text-xl text-foreground mb-6">
                Connect With Me
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group relative p-4 rounded-xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1",
                        social.bgColor,
                        social.borderColor,
                        "hover:shadow-lg hover:shadow-primary/25"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent
                          className={cn("h-5 w-5", social.color)}
                        />
                        <span className="font-medium text-foreground">
                          {social.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
