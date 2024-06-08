import { useContext } from 'react';
import { UserContext } from '@/shared/context/userContext';

// Custom hook to access the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
