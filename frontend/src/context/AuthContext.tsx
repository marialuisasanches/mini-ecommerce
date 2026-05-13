import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '@/services/authService';
import { User } from '@/types/user';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { user: loggedUser, token: jwt } = await authService.login({ email, password });

      setUser(loggedUser);
      setToken(jwt);

      navigate('/');
    },
    [navigate],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
    navigate('/login');
  }, [navigate]);

  const value = useMemo(
    () => ({ user, token, login, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
