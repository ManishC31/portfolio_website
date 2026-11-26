import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import PublicationCard from "@/components/PublicationCard";
import Reveal from "@/components/Reveal";
import { posts, publications } from "@/data/writing";

const AllBlogs = () => (
  <Layout>
    <div className="px-6 pt-[clamp(128px,17vw,176px)]">
      <div className="container-site">
        <header className="max-w-[900px]">
          <p className="eyebrow">Writing</p>
          <h1 className="h-page mt-2.5">
            Notes on system design and applied AI,{" "}
            <span className="text-faint">published on Hashnode.</span>
          </h1>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.link}>
              <PostCard post={post} index={index} heading="h2" />
            </li>
          ))}
        </ul>

        <section aria-labelledby="publications-h" className="pt-[clamp(72px,9vw,112px)]">
          <Reveal>
            <p className="eyebrow">Research</p>
            <h2
              id="publications-h"
              className="mt-2.5 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.14] tracking-[-0.035em]"
            >
              Publications
            </h2>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-3">
            {publications.map((publication) => (
              <Reveal key={publication.title} className="flex">
                <PublicationCard
                  publication={publication}
                  className="min-h-[260px] w-full"
                />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  </Layout>
);

export default AllBlogs;
