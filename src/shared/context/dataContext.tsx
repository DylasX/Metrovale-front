import React, { ReactNode, createContext, useState } from 'react';
import { User } from '@/shared/interfaces/user';

// Define the shape of the context value
interface DataContextType {
  user: User;
  gameStatus: string;
  updateUser: (newUser: User) => void;
  updateGameStatus: (status: string) => void;
}

// Create the context
export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

// Provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    chatId: 0,
    gameId: 0,
    name: '',
    room: '',
    isAdmin: false,
    role: '',
  });

  const [gameStatus, setGameStatus] = useState<string>('');

  const updateUser = (newUser: User) => {
    setUser((prev: User) => ({ ...prev, ...newUser }));
  };

  const updateGameStatus = (status: string) => {
    setGameStatus(status);
  };

  return (
    <DataContext.Provider
      value={{ user, updateUser, gameStatus, updateGameStatus }}
    >
      {children}
    </DataContext.Provider>
  );
};
