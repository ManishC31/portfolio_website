export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  problemStatement: string;
  architecture: string;
  techStack: string[];
  category: "Generative AI" | "Full Stack" | "Machine Learning & AI";
  githubLink?: string;
  githubLinks?: { label: string; url: string }[];
  liveLink?: string;
  image?: string;
  testCredentials?: { username: string; password: string }[];
}

export const projects: Project[] = [
  // {
  //   id: "assesshub-platform",
  //   title: "Assesshub Platform",
  //   shortDescription:
  //     "Enterprise assessment engine serving 25K+ users/month — built end-to-end with React, Node.js & PostgreSQL.",
  //   description:
  //     "Designed and scaled a full-stack assessment platform that powers talent evaluation for organizations. The system handles concurrent test sessions with real-time scoring, anti-cheat proctoring, and comprehensive analytics dashboards — all serving 25K+ monthly active users at 99.9% uptime.",
  //   problemStatement:
  //     "Existing assessment tools buckled under load — they couldn't handle thousands of concurrent test-takers while delivering real-time scoring, detailed analytics, and a smooth candidate experience.",
  //   architecture:
  //     "React frontend with server-side rendering, Express.js API layer, dedicated scoring microservice, and PostgreSQL with read replicas for heavy analytics queries. Redis handles session caching and rate limiting. Docker-based CI/CD with rolling deploys.",
  //   techStack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Docker", "TypeScript"],
  //   category: "Full Stack",
  //   githubLink: "https://github.com/ManishC31",
  //   liveLink: "https://www.assesshub.com",
  // },
  // {
  //   id: "ai-interview-platform",
  //   title: "AI Interview Platform",
  //   shortDescription:
  //     "AI-powered interviews that auto-generate questions, evaluate responses in real-time, and adapt difficulty on the fly.",
  //   description:
  //     "Built an intelligent interview platform using Next.js and TypeScript that leverages LLMs to dynamically generate technical questions, evaluate candidate responses in real-time, and adapt difficulty based on performance. The system produces detailed scoring breakdowns and interviewer-ready reports.",
  //   problemStatement:
  //     "Technical interviews are inconsistent, time-consuming, and don't scale. Companies needed a way to standardize assessments without losing the nuance of human evaluation.",
  //   architecture:
  //     "Next.js with SSR for snappy UX, OpenAI API integration with prompt chaining for multi-turn interviews, PostgreSQL for session persistence, and Redis for real-time state management. Prompt templates are versioned and A/B tested.",
  //   techStack: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "Redis", "Tailwind CSS"],
  //   category: "Generative AI",
  //   githubLink: "https://github.com/ManishC31",
  // },
  // {
  //   id: "generative-ai-suite",
  //   title: "Generative AI Integration Suite",
  //   shortDescription:
  //     "Production-grade AI features — content generation, intelligent search, and NLP — shipped into live apps serving thousands.",
  //   description:
  //     "Integrated generative AI capabilities into multiple production applications at Assesshub: automated content generation for assessments, intelligent semantic search across question banks, and NLP-powered feedback summarization. Every feature had to meet production SLAs.",
  //   problemStatement:
  //     "Adding AI to production isn't a weekend hack — it requires rate limiting, graceful fallbacks, prompt versioning, cost control, and zero-downtime deploys without impacting existing users.",
  //   architecture:
  //     "Modular AI service layer behind an API gateway with per-tenant rate limiting. Prompt management system with versioning. Response caching to reduce API costs. Circuit-breaker pattern for LLM provider failures. Deployed as serverless functions for elastic scaling.",
  //   techStack: ["Node.js", "OpenAI API", "LangChain", "PostgreSQL", "Redis", "Docker"],
  //   category: "Generative AI",
  //   githubLink: "https://github.com/ManishC31",
  // },
  // {
  //   id: "futurekraft-portal",
  //   title: "FutureKraft Admin Portal",
  //   shortDescription:
  //     "Solo-built company website + admin portal with Django & PostgreSQL — from first commit to production on Heroku.",
  //   description:
  //     "Developed the entire FutureKraft web presence and internal admin portal single-handedly. The admin system streamlined business operations with role-based access control, data management dashboards, and automated reporting — all built with Django and deployed on Heroku.",
  //   problemStatement:
  //     "The company had no digital presence and relied on spreadsheets for operations. They needed a website and an internal tool — fast, on a startup budget, built by one developer.",
  //   architecture:
  //     "Django monolith with PostgreSQL, Celery for background tasks, and Redis for caching. Deployed on Heroku with automated CI/CD. Responsive frontend with Django templates.",
  //   techStack: ["Django", "PostgreSQL", "Python", "Heroku", "Celery", "Redis"],
  //   category: "Full Stack",
  //   githubLink: "https://github.com/ManishC31",
  // },
  {
    id: "lumochat",
    title: "LumoChat",
    shortDescription:
      "A full-stack real-time chat app with JWT auth, Socket.io messaging, typing indicators and Cloudinary media uploads.",
    description:
      "LumoChat is a real-time messaging app I built with React and TypeScript on the frontend and Express/Node.js on the backend. It supports live typing indicators, online presence, lazy-loaded message pagination and a media gallery for images, videos and audio. Auth is handled with JWT stored in HTTP-only cookies.",
    problemStatement:
      "Most chat projects are just demos that never see production. I wanted to build something complete enough to actually ship, with proper auth, file uploads and the kind of UX details that make it feel like a real app.",
    architecture:
      "The frontend is built with React 18 and Vite, using Socket.io for real-time events and TanStack Query for server state. The backend runs on Express 5 with Socket.io, PostgreSQL for storage and Cloudinary for media. Files get compressed with Sharp before upload. The two services are deployed separately on their own subdomains.",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.io",
      "PostgreSQL",
      "Cloudinary",
      "Tailwind CSS",
    ],
    category: "Full Stack",
    githubLinks: [
      { label: "Frontend", url: "https://github.com/ManishC31/lumochat_frontend" },
      { label: "Backend", url: "https://github.com/ManishC31/lumochat_backend" },
    ],
    liveLink: "https://lumochat-app.manishchavan.in",
    testCredentials: [
      { username: "testing1@gmail.com", password: "Password123" },
      { username: "testing2@gmail.com", password: "Password123" },
    ],
  },
  {
    id: "expression-music-recommendation",
    title: "Emotion-Based Music Recommender",
    shortDescription:
      "Flutter app that reads your facial expression via CNN and queues up music to match your mood — in real-time.",
    description:
      "Built an Android app using Flutter that integrates a CNN-based facial expression recognition model. The system performs real-time emotion detection through the device camera and maps detected moods to curated playlists. Published research on the underlying model in IRJET 2021.",
    problemStatement:
      "Music selection doesn't adapt to how you're actually feeling. Manual playlist curation is slow — what if your phone could just read the room (or your face)?",
    architecture:
      "Flutter frontend with TensorFlow Lite for on-device inference. The CNN was trained on the FER2013 dataset and quantized for mobile. A recommendation engine maps 7 emotion categories to curated Spotify playlists via API.",
    techStack: [
      "Flutter",
      "TensorFlow Lite",
      "CNN",
      "Python",
      "Computer Vision",
      "Firebase",
    ],
    category: "Machine Learning & AI",
    githubLink: "https://github.com/ManishC31/flutter_fer",
  },
];

export const categories = [
  "All",
  "Generative AI",
  "Full Stack",
  "Machine Learning & AI",
] as const;
