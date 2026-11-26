import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

interface NotFoundProps {
  title?: string;
  message?: string;
}

/** The 404 page, and the body of the "no such project" state. */
export const NotFoundBody = ({
  title = "Page not found",
  message = "That URL doesn't exist on this site.",
}: NotFoundProps) => (
  <div className="px-6 pt-[clamp(140px,19vw,208px)] text-center">
    <p aria-hidden="true" className="display ink-fade pb-[0.08em]">
      404
    </p>
    <h1 className="mt-5 text-[clamp(26px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.03em]">
      {title}
    </h1>
    <p className="lead mx-auto mt-3 max-w-[420px]">{message}</p>

    <div className="mt-9 flex flex-wrap justify-center gap-3">
      <Link to="/" className="btn btn-dark btn-md">
        Home
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </Link>
      <Link to="/projects" className="btn btn-chip btn-md">
        Projects
      </Link>
      <Link to="/blogs" className="btn btn-chip btn-md">
        Writing
      </Link>
    </div>
  </div>
);

const NotFound = () => (
  <Layout>
    <NotFoundBody />
  </Layout>
);

export default NotFound;
