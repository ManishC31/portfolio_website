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
  /**
   * Screenshot of the running app, under public/shots/. Captured by
   * scripts/capture-shots.mjs against the live demo — regenerate it rather
   * than editing the file by hand. Omit for anything with no live URL: the
   * card then renders a typographic panel, which looks deliberate, whereas a
   * stock mockup looks like filler.
   */
  image?: string;
  /**
   * Column span in the featured bento grid, on lg and up. The grid is six
   * columns wide, so each row of entries has to add up to six.
   */
  span?: 2 | 3 | 4 | 6;
  /** Closed-source work, shown in place of repository links. */
  proprietaryNote?: string;
  githubLink?: string;
  githubLinks?: { label: string; url: string }[];
  liveLink?: string;
  testCredentials?: { username: string; password: string }[];
}

/*
 * Order matters twice over: it is the reading order on /projects, and for the
 * four featured entries it is the fill order of the bento grid on the home
 * page. Rows there are 4+2 and 3+3, so moving an entry means checking its
 * `span` still adds up.
 */
export const projects: Project[] = [
  {
    id: "docrag",
    title: "DocRAG",
    summary:
      "Retrieval-augmented Q&A over your own documents. Upload PDFs into groups, ask questions, and get answers grounded in the files rather than the model's general knowledge.",
    role: "I built all of it: the React and shadcn/ui frontend, the FastAPI backend, and everything between a PDF being uploaded and an answer coming back.",
    hardPart:
      "How good the answers are comes down to how good the retrieval is. Most of my time went into how documents get split up and which chunks get pulled back, not into the prompt. Get that wrong and the model quietly fills the gaps from its own training data, which is exactly what this was built to avoid.",
    overview:
      "A generative AI application for asking natural language questions against your own documents. Users organise PDFs into groups of up to three, and queries are answered strictly from the content of those files.",
    architecture:
      "A React and shadcn/ui frontend talking to a FastAPI backend that handles ingestion, chunking and vector storage. When a question comes in, the relevant chunks are fetched and handed to the model as context. PostgreSQL keeps the group and document metadata, and the vector store holds the embeddings used for semantic search.",
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
    /*
     * No image on purpose. docrag-api was returning 502 when the shots were
     * taken, so the automated login could not complete and public/shots/
     * docrag.jpg is the sign-in form over a mostly empty white page — which
     * reads as a broken card on the widest slot in the grid.
     *
     * Bring the backend up, re-run `npm run shots`, check the capture is the
     * document workspace, then add: image: "/shots/docrag.jpg".
     */
    span: 4,
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
    id: "ai-interview-platform",
    title: "AI Interview Platform",
    summary:
      "Assessment product that generates technical interview questions on the fly and scores candidate responses automatically.",
    role: "Built at Assesshub in Next.js and TypeScript. I worked on the question generation, the scoring pipeline and the screen the candidate actually sees.",
    hardPart:
      "The model output had to be trustworthy enough to sit inside a real assessment. Questions had to stay relevant to the role being tested, and two candidates giving the same answer had to get the same score. Consistency was the hard part, not generation.",
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
    // No live URL and no repository, so there is nothing honest to screenshot.
    span: 2,
    proprietaryNote: "Closed source, built at Assesshub. No public repository.",
  },
  {
    id: "invoicer",
    title: "Invoicer",
    summary:
      "Self-hosted invoicing with client records, itemised invoices carrying tax and due dates, server-generated PDFs, and a dashboard for billed, collected and outstanding totals.",
    role: "I built all of it: Next.js 14 with the App Router and server actions, Prisma over PostgreSQL, and the whole PDF generation and storage path.",
    hardPart:
      "I generate the PDF on the server with Puppeteer when the invoice is saved, not in the browser, so the stored file is the invoice of record and looks the same for everyone. The catch is keeping a headless browser running reliably on a small VPS next to the app.",
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
    // Sign-in screen: the demo is behind Google OAuth, which cannot be
    // scripted, so this is as far as the capture can get on its own.
    image: "/shots/invoicer.jpg",
    span: 3,
    githubLink: "https://github.com/ManishC31/invoicer",
    liveLink: "https://invoicer.manishchavan.in/login",
  },
  {
    id: "lumochat",
    title: "LumoChat",
    summary:
      "Real-time messaging with typing indicators, online presence, paginated history and a media gallery for images, video and audio.",
    role: "I built both services: a React frontend and an Express and Socket.io backend, each deployed on its own.",
    hardPart:
      "Keeping the live state and the stored history agreeing with each other. Presence and typing events arrive over Socket.io while old messages load in pages as you scroll, so the two have to meet in the middle without duplicating or dropping anything. Media also had to be compressed before upload, or sending a photo would block the whole conversation.",
    overview:
      "A real-time messaging application built to production standards rather than as a demo. It covers JWT auth in HTTP-only cookies, file uploads, lazy-loaded message pagination, and a media gallery.",
    architecture:
      "React 18 and Vite on the frontend, with Socket.io for live events and TanStack Query for server state. Express 5 and Socket.io on the backend, PostgreSQL for storage, Cloudinary for media, and Sharp compressing files before they go up. The two services deploy independently on their own subdomains.",
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
    image: "/shots/lumochat.jpg",
    span: 3,
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
    role: "I built the Flutter application and integrated the CNN model, including the work to get it running fast enough on the phone itself.",
    hardPart:
      "Running the model on the phone in real time. It had to be trimmed down for mobile, which meant giving up some accuracy to keep it responsive on ordinary Android hardware rather than a test device.",
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
