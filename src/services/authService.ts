import api from './api';
import type { User, LoginCredentials, RegisterData, AuthResponse, AuthResult } from '../types/auth.types';
import { isMockMode } from '../mocks/mockMode';
import { mockUser, mockToken } from '../mocks/mockUser';

const mockDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

class AuthService {
  /**
   * Faz login do usuário
   */
  async login(email: string, password: string): Promise<AuthResult> {
    if (isMockMode) {
      await mockDelay();
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    }

    try {
      const response = await api.post<AuthResponse>('/auth/login/', {
        email,
        password,
      });
      
      const { token, user } = response.data;
      
      // Salvar token e usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login',
      };
    }
  }

  /**
   * Registra novo usuário
   */
  async register(userData: RegisterData): Promise<AuthResult> {
    if (isMockMode) {
      await mockDelay();
      const user: User = {
        ...mockUser,
        username: userData.username || mockUser.username,
        email: userData.email || mockUser.email,
        first_name: userData.first_name || mockUser.first_name,
        last_name: userData.last_name || mockUser.last_name,
        church_name: userData.church_name || mockUser.church_name,
      };
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    }

    try {
      const response = await api.post<AuthResponse>('/auth/register/', userData);
      
      const { token, user } = response.data;
      
      // Salvar token e usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data || 'Erro ao registrar',
      };
    }
  }

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<void> {
    if (isMockMode) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return;
    }

    try {
      await api.post('/auth/logout/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Remover token e usuário do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  /**
   * Obtém dados do usuário logado
   */
  async getCurrentUser(): Promise<User | null> {
    if (isMockMode) {
      return mockUser;
    }

    try {
      const response = await api.get<User>('/auth/me/');
      return response.data;
    } catch (error) {
      return null;
    }
  }

  /**
   * Verifica se usuário está logado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Obtém usuário do localStorage
   */
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Obtém token do localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
