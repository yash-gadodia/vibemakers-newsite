import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";

// Index loads eagerly — it's the homepage and the most-likely-first-paint route.
import Index from "./pages/Index";

// Every other page is lazy-loaded so each route ships its own JS chunk.
// First-paint download drops dramatically since users only pay for the page
// they actually open. Vite/Rollup auto-creates a chunk per dynamic import.
const Hackathon = lazy(() => import("./pages/Hackathon"));
const Schools = lazy(() => import("./pages/Schools"));
const Parents = lazy(() => import("./pages/Parents"));
const Programme = lazy(() => import("./pages/Programme"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const PrintFlyer = lazy(() => import("./pages/PrintFlyer"));
const PrintSlides = lazy(() => import("./pages/PrintSlides"));
const PrintPrivateClasses = lazy(() => import("./pages/PrintPrivateClasses"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DemoLoyangView = lazy(() => import("./pages/DemoLoyangView"));
const IntlSummerCamp = lazy(() => import("./pages/IntlSummerCamp"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "hsl(var(--muted-foreground))",
      fontFamily: '"Satoshi", system-ui, sans-serif',
      fontSize: 14,
    }}
    aria-busy="true"
    aria-live="polite"
  >
    <span>Loading…</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="/programme" element={<Programme />} />
              <Route path="/hackathon" element={<Hackathon />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/print" element={<PrintFlyer />} />
              <Route path="/print-slides" element={<PrintSlides />} />
              <Route path="/print-private-classes" element={<PrintPrivateClasses />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/demo/loyang-view" element={<DemoLoyangView />} />
              <Route path="/intl-summer-camp" element={<IntlSummerCamp />} />
              <Route path="/summer-camp" element={<IntlSummerCamp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
