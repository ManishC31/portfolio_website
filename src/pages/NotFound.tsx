import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <div className="measure py-12">
      <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 text-muted">
        That URL doesn't exist on this site.
      </p>
      <p className="mt-6 text-[0.9375rem]">
        <Link to="/" className="link">
          Home
        </Link>
        <span className="text-muted"> · </span>
        <Link to="/projects" className="link">
          Projects
        </Link>
        <span className="text-muted"> · </span>
        <Link to="/blogs" className="link">
          Writing
        </Link>
      </p>
    </div>
  </Layout>
);

export default NotFound;
