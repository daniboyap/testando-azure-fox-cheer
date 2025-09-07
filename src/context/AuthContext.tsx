import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

// Tipagem para o usuário
interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Senha é opcional para não expor
}

// Tipagem para o contexto
interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => void;
  register: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      showSuccess('Login realizado com sucesso!');
      navigate('/');
    } else {
      showError('Email ou senha inválidos.');
    }
  };

  const register = (name: string, email: string, pass: string): boolean => {
    if (users.some(u => u.email === email)) {
      showError('Este email já está em uso.');
      return false;
    }
    const newUser: User = { id: Date.now(), name, email, password: pass };
    setUsers(prevUsers => [...prevUsers, newUser]);
    showSuccess('Conta criada com sucesso!');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};