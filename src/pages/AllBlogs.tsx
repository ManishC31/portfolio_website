import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { posts, publications } from "@/data/writing";

const AllBlogs = () => (
  <Layout>
    <div className="measure py-12 sm:py-16">
      <Link
        to="/#writing"
        className="link-quiet inline-flex items-center gap-1.5 text-[0.9375rem]"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Back
      </Link>

      <h1 className="mt-8 text-balance text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
        Writing
      </h1>
      <p className="prose-measure mt-3 text-pretty text-muted">
        Notes on system design and applied AI, published on Hashnode.
      </p>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.link} delay={(i % 2) * 70}>
            <SpotlightCard
              as="article"
              glow="border"
              className="group h-full p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="eyebrow">{post.topic}</p>
              <h2 className="mt-3 text-[1.125rem] font-semibold leading-snug tracking-tight">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </a>
              </h2>
              <p className="mt-3 text-pretty text-muted">{post.description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-[0.875rem] text-accent">
                Read on Hashnode
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-20">
        <div className="flex items-center gap-4">
          <h2 className="eyebrow whitespace-nowrap">Publications</h2>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      <ul className="mt-8 space-y-5">
        {publications.map((pub) => (
          <Reveal as="li" key={pub.title}>
            <article className="card p-7">
              <h3 className="text-[1.125rem] font-semibold tracking-tight">
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <p className="mt-1.5 tag">
                {pub.venue}, {pub.year}
              </p>
              <p className="prose-measure mt-3 text-pretty text-muted">
                {pub.description}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </div>
  </Layout>
);

export default AllBlogs;
