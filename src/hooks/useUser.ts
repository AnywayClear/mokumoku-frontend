import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  authToekn?: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);

  const addUser = (user: User) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  return { user, setUser, addUser, removeUser };
};
