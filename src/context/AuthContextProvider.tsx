'use client';

import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

export default function AuthContextProvider({ children }: Props) {
  const { user, login, logout, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
