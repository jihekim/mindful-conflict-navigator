
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, FolderOpen, LayoutDashboard, MessageSquare, Users } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FolderOpen, label: 'Cases', path: '/cases' },
    { icon: Users, label: 'Stakeholders', path: '/stakeholders' },
    { icon: CalendarDays, label: 'Schedule', path: '/schedule' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <div className="flex flex-col h-full">
            <div className="p-6">
              <h1 className="text-xl font-semibold tracking-tight">PDR</h1>
              <p className="text-xs text-muted-foreground mt-1">Conflict Mediation</p>
            </div>
            <SidebarContent className="px-2 flex-1">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      className={location.pathname === item.path ? "bg-accent text-accent-foreground" : ""}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <div className="p-6 border-t border-border">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  C
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Counselor</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
        <main className="flex-1 flex flex-col min-h-screen">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h2 className="text-lg font-medium">Counselor Dashboard</h2>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
