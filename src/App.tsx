import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { I18nProvider } from "./lib/i18n";
import { Layout } from "./components/layout/Layout";
import { SmoothScrollProvider } from "./components/motion/SmoothScroll";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Visual from "./pages/Visual";
import NotFound from "./pages/NotFound";

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export function AppContent() {
  return (
      <I18nProvider>
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<ProjectDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/visual" element={<Visual />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </SmoothScrollProvider>
        </MotionConfig>
      </I18nProvider>
  );
}
