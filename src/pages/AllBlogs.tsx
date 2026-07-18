import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { posts, publications } from "@/data/writing";

const AllBlogs = () => (
  <Layout>
    <div className="measure py-12">
      <p className="text-[0.9375rem]">
        <Link to="/#writing" className="link-quiet">
          ← Back
        </Link>
      </p>

      <h1 className="mt-6 text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-tight">
        Writing
      </h1>
      <p className="mt-2 text-muted">
        Notes on system design and applied AI, published on Hashnode.
      </p>

      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.link} className="border-t border-border pt-6">
            <h2 className="text-[1.0625rem] font-semibold">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {post.title}
              </a>
            </h2>
            <p className="mt-2 text-muted">{post.description}</p>
            <p className="mt-2 tag">{post.topic}</p>
          </li>
        ))}
      </ul>

      <h2 className="eyebrow mt-16 block">Publications</h2>
      <ul className="mt-6 space-y-8">
        {publications.map((pub) => (
          <li key={pub.title} className="border-t border-border pt-6">
            <h3 className="text-[1.0625rem] font-semibold">
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
            <p className="mt-1 tag">
              {pub.venue}, {pub.year}
            </p>
            <p className="mt-2 text-muted">{pub.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default AllBlogs;
