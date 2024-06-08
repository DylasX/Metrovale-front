import { useContext } from 'react';
import { DataContext } from '@/shared/context/dataContext';

// Custom hook to access the context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
