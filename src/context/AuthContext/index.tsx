import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import authService from '../../services/authService';
import type { User, LoginCredentials, RegisterData, AuthResult } from '../../types/auth.types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (userData: RegisterData) => Promise<AuthResult>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Carregar usuário ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      if (authService.isAuthenticated()) {
        const userData = authService.getUser();
        setUser(userData);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const result = await authService.login(email, password);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    return result;
  };

  const register = async (userData: RegisterData): Promise<AuthResult> => {
    const result = await authService.register(userData);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    return result;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
