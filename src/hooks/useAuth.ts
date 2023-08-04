'use client';

import { useEffect } from 'react';
import { User, useUser } from './useUser';
import { redirect } from 'next/navigation';

export const useAuth = () => {
  const { user, setUser, addUser, removeUser } = useUser();

  // useEffect(() => {
  //   if (!user?.id) {
  //     console.log(user);
  //     // redirect('/');
  //   }
  // }, [user]);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, setUser, login, logout };
};
