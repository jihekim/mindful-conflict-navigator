
import React from 'react';
import { useAuth, predefinedUsers, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { LogOut, User, Users, School, Shield } from 'lucide-react';

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'counselor':
      return <User className="h-4 w-4" />;
    case 'student':
      return <School className="h-4 w-4" />;
    case 'parent':
      return <Users className="h-4 w-4" />;
    case 'teacher':
      return <School className="h-4 w-4" />;
    case 'police':
      return <Shield className="h-4 w-4" />;
    default:
      return <User className="h-4 w-4" />;
  }
};

const RoleSwitcher = () => {
  const { currentUser, setCurrentUser } = useAuth();

  const handleUserChange = (userId: string) => {
    const selectedUser = predefinedUsers.find(user => user.id === userId);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <span className="text-xs">{currentUser?.name.charAt(0)}</span>
          </Avatar>
          <div className="flex flex-col items-start text-sm">
            <span className="font-medium">{currentUser?.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{currentUser?.role}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {predefinedUsers.map(user => (
          <DropdownMenuItem
            key={user.id}
            onClick={() => handleUserChange(user.id)}
            className={`${user.id === currentUser?.id ? 'bg-accent' : ''}`}
          >
            <div className="flex items-center gap-2">
              {getRoleIcon(user.role)}
              <span>{user.name}</span>
              <span className="ml-auto text-xs text-muted-foreground capitalize">{user.role}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
