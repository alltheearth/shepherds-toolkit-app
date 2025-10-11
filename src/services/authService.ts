import api from './api';
import type { User, LoginCredentials, RegisterData, AuthResponse, AuthResult } from '../types/auth.types';

class AuthService {
  /**
   * Faz login do usuário
   */
  async login(email: string, password: string): Promise<AuthResult> {
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
