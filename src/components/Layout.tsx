
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, FolderOpen, LayoutDashboard, MessageSquare, Users } from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [{
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/counselor'
  }, {
    icon: FolderOpen,
    label: 'Cases',
    path: '/cases'
  }, {
    icon: Users,
    label: 'Community Members',
    path: '/stakeholders'
  }, {
    icon: CalendarDays,
    label: 'Schedule',
    path: '/schedule'
  }, {
    icon: MessageSquare,
    label: 'Messages',
    path: '/messages'
  }];

  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <div className="flex flex-col h-full">
            <div className="p-6 cursor-pointer" onClick={() => navigate('/')}>
              <h1 className="text-xl font-semibold tracking-tight">BridgePath
            </h1>
              <p className="text-xs text-muted-foreground mt-1">Conflict Mediation</p>
            </div>
            <SidebarContent className="px-2 flex-1">
              <SidebarMenu>
                {menuItems.map(item => <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton onClick={() => navigate(item.path)} className={location.pathname === item.path ? "bg-accent text-accent-foreground" : ""}>
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarContent>
            <div className="p-6 border-t border-border">
              <RoleSwitcher />
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
    </SidebarProvider>;
};

export default Layout;
