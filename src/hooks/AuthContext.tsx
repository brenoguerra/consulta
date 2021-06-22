import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: {
    expireAt: Date;
    role: string;
    username: string;
    _id: string;
  };
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: {
    expireAt: Date;
    role: string;
    username: string;
    _id: string;
  };
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Consulta:token');
    const user = localStorage.getItem('@Consulta:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/sessions', {
      username,
      password,
    });

    const { token, user } = response.data.data;

    localStorage.setItem('@Consulta:token', token);
    localStorage.setItem('@Consulta:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Consulta:token');
    localStorage.removeItem('@Consulta:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
