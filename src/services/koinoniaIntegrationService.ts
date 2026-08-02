import api from './api';

export async function authorizeKoinonia(): Promise<{ code: string }> {
  const response = await api.post<{ code: string }>('/integrations/koinonia/authorize/');
  return response.data;
}
