// 1. PRIMEIRO: Verifique se o token está sendo enviado corretamente
// Adicione isso no src/services/api.ts para ver todas as requisições

import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor MELHORADO para debug
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    console.log('🔍 DEBUG REQUEST:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      token: token ? token.substring(0, 10) + '...' : 'NO TOKEN',
      data: config.data
    });
    
    if (token && config.headers) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      console.error('❌ ATENÇÃO: Token não encontrado no localStorage!');
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Erro no request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta MELHORADO
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ RESPONSE:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ ERROR RESPONSE:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Se receber 401 (não autorizado), fazer logout
    if (error.response && error.response.status === 401) {
      console.error('❌ ERRO 401: Usuário não autenticado! Fazendo logout...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;