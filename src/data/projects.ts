export interface Project {
  id: string;
  title: string;
  /** One line: what it does. */
  summary: string;
  /** Scope and ownership: what was actually mine. */
  role: string;
  /** The engineering problem worth talking about in an interview. */
  hardPart: string;
  techStack: string[];
  /** Longer form, shown on the detail page. */
  overview: string;
  architecture: string;
  category: "Generative AI" | "Full Stack" | "Machine Learning";
  featured?: boolean;
  /** Closed-source work, shown in place of repository links. */
  proprietaryNote?: string;
  githubLink?: string;
  githubLinks?: { label: string; url: string }[];
  liveLink?: string;
  testCredentials?: { username: string; password: string }[];
}

export const projects: Project[] = [
  {
    id: "ai-interview-platform",
    title: "AI Interview Platform",
    summary:
      "Assessment product that generates technical interview questions on the fly and scores candidate responses automatically.",
    role: "Built at Assesshub on Next.js and TypeScript, covering question generation, the evaluation pipeline and the candidate-facing interface.",
    hardPart:
      "Model output had to be dependable enough to sit in a live assessment flow. Generated questions needed to stay on-scope for the role being tested, and scoring had to stay consistent between runs rather than drifting with phrasing.",
    overview:
      "An interview platform inside Assesshub's assessment product. Rather than drawing from a fixed question bank, it generates technical questions dynamically per candidate and evaluates the responses automatically, so assessments can cover a wider surface without a proportional amount of manual authoring and review.",
    architecture:
      "Next.js and TypeScript across the application, with generative AI driving both question generation and response evaluation.",
    // TODO: this entry is deliberately thin because it is the only project not
    // backed by a public repo. Worth adding, if you can share it: usage numbers
    // (candidates or interviews processed), how you constrained/validated model
    // output, and the rest of the stack (datastore, queueing, model provider).
    techStack: ["Next.js", "TypeScript", "Generative AI"],
    category: "Generative AI",
    featured: true,
    proprietaryNote: "Closed source, built at Assesshub. No public repository.",
  },
  {
    id: "docrag",
    title: "DocRAG",
    summary:
      "Retrieval-augmented Q&A over your own documents. Upload PDFs into groups, ask questions, and get answers grounded in the files rather than the model's general knowledge.",
    role: "Sole engineer. React and shadcn/ui frontend, FastAPI backend, and the full ingestion-to-retrieval pipeline.",
    hardPart:
      "Answer quality is retrieval quality. Keeping responses grounded in the uploaded documents, instead of letting the model fill gaps from training data, meant the chunking and retrieval step was where the work went rather than the prompt.",
    overview:
      "A generative AI application for asking natural language questions against your own documents. Users organise PDFs into groups of up to three, and queries are answered strictly from the content of those files.",
    architecture:
      "React and shadcn/ui frontend against a FastAPI backend handling ingestion, chunking and vector storage. At query time the relevant chunks are retrieved and passed to the model as context. PostgreSQL holds group and document metadata; the vector store handles embeddings for semantic search.",
    techStack: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "LangChain",
      "Tailwind CSS",
    ],
    category: "Generative AI",
    featured: true,
    githubLinks: [
      { label: "Frontend", url: "https://github.com/ManishC31/docrag-frontend" },
      { label: "Backend", url: "https://github.com/ManishC31/docrag-backend" },
    ],
    liveLink: "https://docrag.manishchavan.in",
    testCredentials: [
      { username: "testing1@gmail.com", password: "Password123" },
      { username: "testing2@gmail.com", password: "Password123" },
    ],
  },
  {
    id: "invoicer",
    title: "Invoicer",
    summary:
      "Self-hosted invoicing with client records, itemised invoices carrying tax and due dates, server-generated PDFs, and a dashboard for billed, collected and outstanding totals.",
    role: "Sole engineer. Next.js 14 App Router with server actions, Prisma over PostgreSQL, and the PDF generation and storage path.",
    hardPart:
      "Generating the PDF server-side with Puppeteer on save, rather than in the browser, so the stored document is the invoice of record. That means running a headless browser reliably on a small VPS alongside the app.",
    overview:
      "A full-stack invoice management application. It handles client records, itemised invoices with tax rates and due dates, preview across three themes, and PDF generation on save. A dashboard tracks total billed, collected and outstanding amounts.",
    architecture:
      "Next.js 14 App Router with server actions, Prisma ORM over PostgreSQL, Google OAuth through NextAuth, and Cloudinary for PDF storage. Invoice PDFs are rendered server-side with Puppeteer and uploaded on save. Deployed to a VPS on a custom subdomain.",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Tailwind CSS",
    ],
    category: "Full Stack",
    featured: true,
    githubLink: "https://github.com/ManishC31/invoicer",
    liveLink: "https://invoicer.manishchavan.in/login",
  },
  {
    id: "lumochat",
    title: "LumoChat",
    summary:
      "Real-time messaging with typing indicators, online presence, paginated history and a media gallery for images, video and audio.",
    role: "Sole engineer across both services: a React frontend and an Express and Socket.io backend, deployed separately.",
    hardPart:
      "Keeping live state and historical state coherent: presence and typing events arrive over Socket.io while message history loads lazily in pages, and media uploads had to be compressed before storage so they didn't stall the send path.",
    overview:
      "A real-time messaging application built to production standards rather than as a demo. It covers JWT auth in HTTP-only cookies, file uploads, lazy-loaded message pagination, and a media gallery.",
    architecture:
      "React 18 and Vite on the frontend, using Socket.io for real-time events and TanStack Query for server state. Express 5 with Socket.io on the backend, PostgreSQL for storage and Cloudinary for media, with Sharp compressing files before upload. The two services deploy independently on their own subdomains.",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.io",
      "PostgreSQL",
      "Cloudinary",
    ],
    category: "Full Stack",
    featured: true,
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
    title: "Expression-Based Music Recommendation",
    summary:
      "Android app that reads facial expression through the camera and recommends music matching the detected mood. Basis for a published paper.",
    role: "Built the Flutter application and integrated the CNN model, including the optimisation work for on-device inference.",
    hardPart:
      "Running inference on-device in real time. The model had to be optimised for mobile deployment, trading accuracy against latency to stay responsive on commodity Android hardware.",
    overview:
      "An Android application integrating CNN-based facial expression recognition. It performs real-time emotion detection through the device camera and maps detected moods to music recommendations. The underlying model was published in IRJET in 2021.",
    architecture:
      "Flutter application with the expression recognition model running on-device. Detected emotion categories drive the recommendation step.",
    techStack: ["Flutter", "CNN", "Python", "Computer Vision"],
    category: "Machine Learning",
    githubLink: "https://github.com/ManishC31/flutter_fer",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const categories = [
  "All",
  "Generative AI",
  "Full Stack",
  "Machine Learning",
] as const;
