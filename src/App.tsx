import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import ProjectDetails from "./pages/ProjectDetails.tsx";
import AllProjects from "./pages/AllProjects.tsx";
import AllBlogs from "./pages/AllBlogs.tsx";
import NotFound from "./pages/NotFound.tsx";

// Routes are unchanged from the previous site so existing shared links resolve.
// Split out from the router so the build can render them through a StaticRouter
// (see entry-server.tsx) while the browser gets a BrowserRouter.
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/project/:id" element={<ProjectDetails />} />
    <Route path="/projects" element={<AllProjects />} />
    <Route path="/blogs" element={<AllBlogs />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
