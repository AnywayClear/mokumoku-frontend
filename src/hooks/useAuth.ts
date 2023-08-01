'use client';

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { User, useUser } from './useUser';

export const useAuth = () => {
  const { user, setUser, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, setUser, login, logout };
};
