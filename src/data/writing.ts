export interface Post {
  title: string;
  description: string;
  link: string;
  topic: "Artificial Intelligence" | "System Design";
}

export const posts: Post[] = [
  {
    title: "Servers, Cloud, Edge, and Serverless",
    description:
      "The spectrum of deployment models, from traditional servers through cloud, edge and serverless, and how to pick one for a given workload.",
    link: "https://generative-ai-handbook.hashnode.dev/servers-cloud-edge-and-serverless",
    topic: "Artificial Intelligence",
  },
  {
    title: "Decoding AI Jargon",
    description:
      "Ten terms that show up constantly in AI discussion, explained without assuming a machine learning background.",
    link: "https://generative-ai-handbook.hashnode.dev/decoding-ai-jargons-with-chai",
    topic: "Artificial Intelligence",
  },
  {
    title: "A Beginner's System Design Guide",
    description:
      "What changes once an application has traffic: the fundamentals of designing web systems that hold up under load.",
    link: "https://system-design-journey.hashnode.dev/beginner-s-system-design-guide-building-high-performance-web-apps",
    topic: "System Design",
  },
];

export interface Publication {
  title: string;
  venue: string;
  year: string;
  description: string;
  link?: string;
}

export const publications: Publication[] = [
  {
    title: "Facial Expression Recognition on Mobile Devices",
    venue: "International Research Journal of Engineering and Technology (IRJET)",
    year: "2021",
    description:
      "Facial expression recognition using CNN and ResNet architectures, optimised for mobile deployment against the accuracy versus efficiency trade-off.",
    // Recovered from the link annotations in Manish_Chavan_CV.pdf.
    link: "https://www.irjet.net/archives/V8/i5/IRJET-V8I5338.pdf",
  },
];
