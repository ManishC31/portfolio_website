import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Sparkles,
  Calendar,
  Clock,
  Users,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import { StarBackground } from "@/components/StarBackground";

// Import the same projects data
const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    longDescription:
      "A modern, responsive SaaS landing page built with React and Tailwind CSS. Features include smooth animations, dark mode support, and optimized performance. The design focuses on conversion optimization with clear call-to-actions and engaging visual elements.",
    detailedDescription: `
      This SaaS landing page represents a comprehensive solution for businesses looking to establish a strong online presence. Built with modern web technologies, it delivers exceptional user experience across all devices.

      **Key Features:**
      - Responsive design that adapts seamlessly to desktop, tablet, and mobile devices
      - Dark mode support with smooth theme transitions
      - Optimized performance with lazy loading and code splitting
      - SEO-friendly structure with meta tags and semantic HTML
      - Accessibility compliant with ARIA labels and keyboard navigation
      - Contact form integration with validation and spam protection
      - Analytics integration for tracking user behavior and conversions

      **Technical Implementation:**
      The project utilizes React 18 with hooks for state management and component lifecycle. Tailwind CSS provides utility-first styling with custom design tokens. The build process is optimized with Vite for fast development and production builds. The site includes comprehensive error boundaries and loading states for robust user experience.

      **Performance Optimizations:**
      - Image optimization with WebP format and responsive sizing
      - CSS and JavaScript minification and compression
      - Critical CSS inlining for above-the-fold content
      - Service worker implementation for offline functionality
      - CDN integration for global content delivery

      **Usage:**
      This landing page template can be easily customized for any SaaS business. Simply update the content, branding, and color scheme to match your business requirements. The modular component structure allows for easy maintenance and feature additions.
    `,
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Responsive Design",
      "Dark Mode",
      "Smooth Animations",
      "SEO Optimized",
    ],
    techStack: {
      frontend: [
        "React 18",
        "Tailwind CSS",
        "Framer Motion",
        "React Hook Form",
      ],
      backend: ["Supabase", "PostgreSQL", "Edge Functions"],
      deployment: ["Vercel", "Cloudflare", "GitHub Actions"],
      tools: ["Vite", "ESLint", "Prettier", "TypeScript"],
    },
    usage:
      "Perfect for SaaS startups, tech companies, and digital agencies looking for a professional, conversion-optimized landing page.",
    stats: {
      developmentTime: "3 months",
      teamSize: "2 developers",
      users: "10K+ monthly visitors",
      performance: "95+ Lighthouse score",
    },
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description:
      "Interactive analytics dashboard with data visualization and filtering capabilities.",
    longDescription:
      "A comprehensive analytics dashboard that provides real-time data visualization using D3.js and TypeScript. Features interactive charts, customizable filters, and real-time data updates. Built with Next.js for optimal performance and SEO.",
    detailedDescription: `
      Orbit Analytics Dashboard is a powerful, enterprise-grade analytics platform designed to transform complex data into actionable insights. Built with cutting-edge technologies, it provides real-time monitoring, advanced data visualization, and comprehensive reporting capabilities.

      **Core Functionality:**
      - Real-time data streaming and processing with WebSocket connections
      - Interactive data visualization using D3.js with custom chart components
      - Advanced filtering and drill-down capabilities for detailed analysis
      - Customizable dashboards with drag-and-drop widget placement
      - Export functionality for reports in PDF, CSV, and Excel formats
      - Role-based access control with granular permissions
      - Multi-tenant architecture supporting multiple organizations

      **Data Visualization Features:**
      The dashboard includes over 20 different chart types including line charts, bar charts, pie charts, heatmaps, scatter plots, and custom visualizations. Each chart supports interactive features like zoom, pan, tooltips, and data point selection. The system also includes advanced features like anomaly detection, trend analysis, and predictive analytics.

      **Technical Architecture:**
      Built with Next.js 14 using the App Router for optimal performance and SEO. The frontend uses TypeScript for type safety and better development experience. D3.js handles complex data visualizations while React Query manages server state and caching. The backend API is built with Node.js and Express, with PostgreSQL as the primary database and Redis for caching.

      **Performance Optimizations:**
      - Server-side rendering for improved initial load times
      - Code splitting and lazy loading for optimal bundle sizes
      - Database query optimization with indexing and connection pooling
      - CDN integration for static assets and API responses
      - Progressive Web App features for offline functionality

      **Usage:**
      Ideal for businesses requiring comprehensive data analysis, including e-commerce platforms, SaaS applications, financial services, and marketing agencies. The dashboard can be integrated with various data sources including Google Analytics, Facebook Ads, Shopify, and custom APIs.
    `,
    image: "/projects/project2.png",
    tags: ["TypeScript", "D3.js", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Real-time Data",
      "Interactive Charts",
      "Custom Filters",
      "Performance Optimized",
    ],
    techStack: {
      frontend: [
        "Next.js 14",
        "TypeScript",
        "D3.js",
        "React Query",
        "Tailwind CSS",
      ],
      backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
      visualization: ["D3.js", "Chart.js", "Recharts", "Victory"],
      deployment: ["Docker", "AWS", "Terraform", "GitHub Actions"],
      tools: ["ESLint", "Prettier", "Jest", "Cypress"],
    },
    usage:
      "Perfect for data-driven businesses, analytics teams, and organizations requiring comprehensive business intelligence and reporting capabilities.",
    stats: {
      developmentTime: "6 months",
      teamSize: "4 developers",
      users: "50K+ monthly users",
      performance: "98+ Lighthouse score",
    },
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    longDescription:
      "A complete e-commerce solution with user authentication, product management, shopping cart functionality, and secure payment processing via Stripe. Built with React frontend and Node.js backend for scalability and performance.",
    detailedDescription: `
      A comprehensive e-commerce platform designed to handle the complete online shopping experience from product discovery to order fulfillment. This full-stack solution provides everything needed to run a successful online store with enterprise-level features and scalability.

      **Core Features:**
      - Advanced product catalog with categories, filters, and search functionality
      - User authentication and authorization with social login options
      - Shopping cart and wishlist management with persistent storage
      - Secure payment processing with Stripe integration
      - Order management and tracking system
      - Inventory management with low stock alerts
      - Customer review and rating system
      - Email marketing integration with automated campaigns
      - Multi-language and multi-currency support
      - Mobile-responsive design with PWA capabilities

      **User Experience:**
      The platform features an intuitive user interface with advanced search capabilities including autocomplete, filters, and sorting options. The checkout process is optimized for conversion with guest checkout, saved payment methods, and order confirmation emails. The admin dashboard provides comprehensive analytics and management tools.

      **Technical Implementation:**
      Built with React for the frontend and Node.js/Express for the backend. The database uses MongoDB for flexibility and scalability. Redis handles session management and caching. The payment system integrates with Stripe for secure transactions. The platform includes comprehensive API documentation and SDK for third-party integrations.

      **Security Features:**
      - PCI DSS compliant payment processing
      - JWT-based authentication with refresh tokens
      - Rate limiting and DDoS protection
      - Input validation and sanitization
      - HTTPS enforcement and security headers
      - Regular security audits and penetration testing

      **Performance & Scalability:**
      - Microservices architecture for horizontal scaling
      - CDN integration for global content delivery
      - Database sharding and read replicas
      - Caching strategies with Redis and CDN
      - Load balancing and auto-scaling capabilities
      - Monitoring and alerting with comprehensive logging

      **Usage:**
      Suitable for small to large e-commerce businesses, dropshipping operations, and B2B/B2C marketplaces. The platform can handle thousands of products and millions of users with proper infrastructure scaling.
    `,
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "User Authentication",
      "Payment Processing",
      "Product Management",
      "Shopping Cart",
    ],
    techStack: {
      frontend: ["React", "Redux Toolkit", "React Router", "Styled Components"],
      backend: ["Node.js", "Express", "MongoDB", "Redis"],
      payment: ["Stripe", "PayPal", "Apple Pay", "Google Pay"],
      deployment: ["Docker", "Kubernetes", "AWS", "Nginx"],
      tools: ["Webpack", "Babel", "Jest", "Supertest"],
    },
    usage:
      "Ideal for online retailers, dropshipping businesses, and anyone looking to establish a professional e-commerce presence with enterprise-level features.",
    stats: {
      developmentTime: "8 months",
      teamSize: "6 developers",
      users: "100K+ monthly users",
      performance: "92+ Lighthouse score",
    },
  },
];

export const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === parseInt(id));
    setProject(foundProject);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Effects */}
      <StarBackground />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="group flex items-center space-x-2 px-4 py-2 glass-theme rounded-full hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Project Title */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium glass-theme rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {project.longDescription}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-16">
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="glass-theme p-6 rounded-2xl text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">
              {project.stats.developmentTime}
            </div>
            <div className="text-sm text-muted-foreground">
              Development Time
            </div>
          </div>
          <div className="glass-theme p-6 rounded-2xl text-center">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">
              {project.stats.teamSize}
            </div>
            <div className="text-sm text-muted-foreground">Team Size</div>
          </div>
          <div className="glass-theme p-6 rounded-2xl text-center">
            <Globe className="h-8 w-8 text-cyan-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">
              {project.stats.users}
            </div>
            <div className="text-sm text-muted-foreground">Monthly Users</div>
          </div>
          <div className="glass-theme p-6 rounded-2xl text-center">
            <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">
              {project.stats.performance}
            </div>
            <div className="text-sm text-muted-foreground">
              Performance Score
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="glass-theme p-8 rounded-2xl mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Project Overview
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
              {project.detailedDescription}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="glass-theme p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 hover:scale-105 transition-all duration-300"
              >
                <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-3"></div>
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="glass-theme p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(project.techStack).map(
              ([category, technologies]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground capitalize bg-gradient-to-r from-primary/20 to-purple-500/20 px-4 py-2 rounded-lg border border-primary/30">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm glass-theme rounded-md"
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

        {/* Usage Section */}
        <div className="glass-theme p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Usage & Applications
          </h2>
          <p className="text-lg text-muted-foreground text-center leading-relaxed max-w-4xl mx-auto">
            {project.usage}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ExternalLink size={20} />
            <span>Live Preview</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center space-x-3 px-8 py-4 glass-theme font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Github size={20} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
};
