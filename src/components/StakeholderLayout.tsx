
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, FileText, Settings, Share2, FileUp, ArrowRight } from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import CustomCursor from './CustomCursor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface StakeholderLayoutProps {
  children: React.ReactNode;
}

const StakeholderLayout: React.FC<StakeholderLayoutProps> = ({
  children
}) => {
  const {
    currentUser
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const getNextPage = () => {
    const currentPath = location.pathname;
    if (currentPath === '/stakeholder/chat') {
      return '/stakeholder/report';
    } else if (currentPath === '/stakeholder/report') {
      return '/stakeholder/share';
    } else if (currentPath === '/stakeholder/share') {
      return '/stakeholder/mediation-prep';
    }
    return '';
  };

  // Get personalized chat label based on user role
  const getChatLabel = () => {
    switch (currentUser?.role) {
      case 'parent': return 'Parent Partner';
      case 'teacher': return 'Educator Ally';
      case 'student': 
      default: return 'Peer Connect';
    }
  };

  const nextPage = getNextPage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Custom cursor for prototype demonstrations */}
      <CustomCursor enabled={true} />
      
      <header className="border-b border-border">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-xl font-semibold tracking-tight">BridgePath</h1>
            <span className="text-xs bg-[#5fb455]/10 text-[#5fb455] px-2 py-1 rounded-full">
              Community
            </span>
          </div>
          <RoleSwitcher />
        </div>
      </header>
      
      <div className="flex-1 container mx-auto py-6 px-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 space-y-6">
            <div className="bg-card rounded-lg shadow-subtle p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#5fb455] flex items-center justify-center text-primary-foreground">
                  {currentUser?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser?.role}</p>
                </div>
              </div>
              
              <div className="space-y-1 mt-4">
                <button onClick={() => navigate('/stakeholder/chat')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${isActivePath('/stakeholder/chat') ? 'bg-[#5fb455] text-white' : 'hover:bg-accent'}`}>
                  <MessageSquare className="h-4 w-4" />
                  <span>{getChatLabel()}</span>
                </button>
                <button onClick={() => navigate('/stakeholder/report')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${isActivePath('/stakeholder/report') ? 'bg-[#5fb455] text-white' : 'hover:bg-accent'}`}>
                  <FileText className="h-4 w-4" />
                  <span>My Insight Report</span>
                </button>
                <button onClick={() => navigate('/stakeholder/mediation-prep')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${isActivePath('/stakeholder/mediation-prep') ? 'bg-[#5fb455] text-white' : 'hover:bg-accent'}`}>
                  <FileUp className="h-4 w-4" />
                  <span>Mediation Prep</span>
                </button>
                <button onClick={() => navigate('/stakeholder/share')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${isActivePath('/stakeholder/share') ? 'bg-[#5fb455] text-white' : 'hover:bg-accent'}`}>
                  <Share2 className="h-4 w-4" />
                  <span>Sharing Settings</span>
                </button>
                <button onClick={() => navigate('/stakeholder/settings')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${isActivePath('/stakeholder/settings') ? 'bg-[#5fb455] text-white' : 'hover:bg-accent'}`}>
                  <Settings className="h-4 w-4" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-subtle p-4">
              <h3 className="font-medium mb-2">Your Goal</h3>
              <p className="text-sm text-muted-foreground">
                {currentUser?.role === 'student' ? "Understand the situation better and find a resolution that brings healing." : "Support the mediation process and foster a positive resolution for all parties."}
              </p>
            </div>
          </aside>
          
          <main className="flex-1 space-y-6">
            {children}
            
            {nextPage && <div className="flex justify-end mt-4">
                <Button onClick={() => navigate(nextPage)} className="bg-[#5fb455] hover:bg-[#4ea344]">
                  Continue to Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>}
          </main>
        </div>
      </div>
    </div>
  );
};

export default StakeholderLayout;
