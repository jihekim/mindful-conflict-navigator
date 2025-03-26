import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import CaseDetail from "./pages/CaseDetail";
import Stakeholders from "./pages/Stakeholders";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import StakeholderChat from "./pages/stakeholder/StakeholderChat";
import StakeholderReport from "./pages/stakeholder/StakeholderReport";
import StakeholderShare from "./pages/stakeholder/StakeholderShare";
import StakeholderSettings from "./pages/stakeholder/StakeholderSettings";
import StakeholderMediationPrep from './pages/stakeholder/StakeholderMediationPrep';
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Splash />} />
            
            {/* Counselor Routes */}
            <Route path="/counselor" element={<Index />} />
            <Route path="/case/:id" element={<CaseDetail />} />
            <Route path="/stakeholders" element={<Stakeholders />} />
            <Route path="/schedule" element={<Schedule />} />
            
            {/* Stakeholder Routes */}
            <Route path="/stakeholder" element={<Navigate to="/stakeholder/chat" replace />} />
            <Route path="/stakeholder/chat" element={<StakeholderChat />} />
            <Route path="/stakeholder/report" element={<StakeholderReport />} />
            <Route path="/stakeholder/share" element={<StakeholderShare />} />
            <Route path="/stakeholder/settings" element={<StakeholderSettings />} />
            <Route path="/stakeholder/mediation-prep" element={<StakeholderMediationPrep />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
