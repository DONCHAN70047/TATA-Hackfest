import React, { createContext, useState, ReactNode } from 'react';

export interface User {
  username: string;
  email?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// ✅ Type-safe context
export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};