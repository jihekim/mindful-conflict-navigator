
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'counselor' | 'student' | 'parent' | 'teacher' | 'police';

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const predefinedUsers: User[] = [
  {
    id: '1',
    name: 'Chris Counselor',
    role: 'counselor',
  },
  {
    id: '2',
    name: 'Sam Student',
    role: 'student',
  },
  {
    id: '3',
    name: 'Paula Parent',
    role: 'parent',
  },
  {
    id: '4',
    name: 'Terry Teacher',
    role: 'teacher',
  },
  {
    id: '5',
    name: 'Officer Parker',
    role: 'police',
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(predefinedUsers[0]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
