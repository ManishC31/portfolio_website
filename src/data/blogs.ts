export interface BlogPost {
  title: string;
  description: string;
  link: string;
  publication: "Artificial Intelligence" | "System Design";
}

export const BLOGS: BlogPost[] = [
  {
    title: "🌐 Servers, Cloud, Edge, and Serverless",
    description:
      "A deep dive into the spectrum of deployment models — from traditional servers to cloud infrastructure, edge computing, and serverless architectures — and how to choose the right one for your use case.",
    link: "https://generative-ai-handbook.hashnode.dev/servers-cloud-edge-and-serverless",
    publication: "Artificial Intelligence",
  },
  {
    title: "Decoding AI Jargons with Chai",
    description:
      "Artificial intelligence is the hottest technology of this decade. In this article, I explain 10 key AI jargons so anyone can understand how AI works without getting overwhelmed.",
    link: "https://generative-ai-handbook.hashnode.dev/decoding-ai-jargons-with-chai",
    publication: "Artificial Intelligence",
  },
  {
    title: "Beginner's System Design Guide: Building High-Performance Web Apps",
    description:
      "After weeks of building and launching your app, growing traffic demands more than good code — it demands good system design. This guide covers the fundamentals every developer needs.",
    link: "https://system-design-journey.hashnode.dev/beginner-s-system-design-guide-building-high-performance-web-apps",
    publication: "System Design",
  },
];

export const PUBLICATION_LABELS = ["Artificial Intelligence", "System Design"] as const;
