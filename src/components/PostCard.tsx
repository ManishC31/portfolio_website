import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/data/writing";

/*
 * An article card. The posts live on Hashnode, so the title link opens there;
 * as with the project tiles, its ::after makes the whole card the target.
 */
const PostCard = ({
  post,
  index,
  heading: Heading = "h3",
}: {
  post: Post;
  /** Position in the list, shown as the big numeral. */
  index: number;
  heading?: "h2" | "h3";
}) => (
  <article className="group relative flex h-full flex-col gap-4 rounded-[24px] bg-surface px-2.5 pb-6 pt-2.5 transition-colors duration-200 hover:bg-surface-hover [&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-[3px] [&:has(:focus-visible)]:outline-ink">
    <div
      aria-hidden="true"
      className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-2xl bg-white p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="chip">{post.topic}</span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight size={17} strokeWidth={2} />
        </span>
      </div>
      <span className="text-[clamp(56px,7vw,88px)] font-semibold leading-[0.8] tracking-[-0.05em] text-line">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    <div className="flex flex-col gap-1.5 px-3.5">
      <Heading className="text-[19px] font-semibold leading-[1.3] tracking-[-0.015em]">
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="outline-none after:absolute after:inset-0 after:content-['']"
        >
          {post.title}
        </a>
      </Heading>
      <p className="copy">{post.description}</p>
      {/* The chip above is decorative, so the topic is repeated for readers. */}
      <p className="sr-only">Topic: {post.topic}. Opens on Hashnode.</p>
    </div>
  </article>
);

export default PostCard;
