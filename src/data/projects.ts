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
  {
    id: "invoicer",
    title: "Invoicer",
    shortDescription:
      "Invoice generation app with PDF export, client management, and a live dashboard — built with Next.js 14 and PostgreSQL.",
    description:
      "Invoicer is a full-stack invoice management web app built with Next.js 14, TypeScript, and PostgreSQL. It lets you manage clients, create itemized invoices with tax rates and due dates, preview across 3 themes, and auto-generate PDFs uploaded to Cloudinary. A dashboard tracks total billed, collected, and outstanding amounts at a glance.",
    problemStatement:
      "Freelancers and small businesses needed a simple self-hosted tool to create professional invoices, track payment status, and download PDFs — without paying for bloated SaaS tools.",
    architecture:
      "Next.js 14 App Router with server actions, Prisma ORM over PostgreSQL, Google OAuth via NextAuth, and Cloudinary for PDF storage. Invoice PDFs are generated server-side using Puppeteer and uploaded on save. Deployed on a VPS with a custom subdomain.",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Cloudinary",
      "Tailwind CSS",
    ],
    category: "Full Stack",
    githubLink: "https://github.com/ManishC31/invoicer",
    liveLink: "https://invoicer.manishchavan.in/login",
  },
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
      {
        label: "Frontend",
        url: "https://github.com/ManishC31/lumochat_frontend",
      },
      {
        label: "Backend",
        url: "https://github.com/ManishC31/lumochat_backend",
      },
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
