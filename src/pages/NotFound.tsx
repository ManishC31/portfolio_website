import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Writing" },
];

const NotFound = () => (
  <Layout>
    <div className="measure py-24 sm:py-32">
      <p className="font-mono text-[clamp(3rem,12vw,7rem)] font-bold leading-none tracking-tighter text-faint">
        404
      </p>

      <h1 className="mt-6 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight">
        Page not found
      </h1>
      <p className="prose-measure mt-3 text-muted">
        That URL doesn't exist on this site.
      </p>

      <ul className="mt-8 flex flex-wrap gap-3">
        {LINKS.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="btn-ghost">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default NotFound;
