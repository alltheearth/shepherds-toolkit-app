export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  church_name?: string;
  role: 'pastor' | 'leader' | 'member';
  avatar_url?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  church_name?: string;
  ministry?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}