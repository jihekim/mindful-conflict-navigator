
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, FileText, Settings, Share2 } from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';
import { useAuth } from '@/contexts/AuthContext';

interface StakeholderLayoutProps {
  children: React.ReactNode;
}

const StakeholderLayout: React.FC<StakeholderLayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-xl font-semibold tracking-tight">PDR</h1>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Stakeholder
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
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {currentUser?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser?.role}</p>
                </div>
              </div>
              
              <div className="space-y-1 mt-4">
                <button
                  onClick={() => navigate('/stakeholder/chat')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>AI Chat</span>
                </button>
                <button
                  onClick={() => navigate('/stakeholder/report')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>My Insight Report</span>
                </button>
                <button
                  onClick={() => navigate('/stakeholder/share')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Sharing Settings</span>
                </button>
                <button
                  onClick={() => navigate('/stakeholder/settings')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-subtle p-4">
              <h3 className="font-medium mb-2">Your Goal</h3>
              <p className="text-sm text-muted-foreground">
                {currentUser?.role === 'student' 
                  ? "Understand the situation better and find a resolution."
                  : "Support the mediation process and foster resolution."}
              </p>
            </div>
          </aside>
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default StakeholderLayout;
