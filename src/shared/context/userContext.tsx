import React, { ReactNode, createContext, useState } from 'react';
import { User } from '@/shared/interfaces/user';

// Define the shape of the context value
interface UserContextType {
  user: User;
  updateUser: (newUser: User) => void;
}

// Create the context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    room: '',
  });

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
