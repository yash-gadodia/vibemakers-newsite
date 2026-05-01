import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Hackathon from "./pages/Hackathon";
import Schools from "./pages/Schools";
import Parents from "./pages/Parents";
import Programme from "./pages/Programme";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrintFlyer from "./pages/PrintFlyer";
import PrintSlides from "./pages/PrintSlides";
import PrintPrivateClasses from "./pages/PrintPrivateClasses";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import DemoLoyangView from "./pages/DemoLoyangView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/programme" element={<Programme />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/print" element={<PrintFlyer />} />
            <Route path="/print-slides" element={<PrintSlides />} />
            <Route path="/print-private-classes" element={<PrintPrivateClasses />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/demo/loyang-view" element={<DemoLoyangView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
