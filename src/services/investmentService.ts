import api from './api';
import type {
  Investment,
  InvestmentPayload,
  InvestmentListResponse,
  InvestmentSummary,
} from '../types/investment.types';

export interface InvestmentListParams {
  investment_type?: string;
  liquidity?: string;
  status?: string;
  currency?: string;
  search?: string;
  ordering?: string;
  page?: number;
}

class InvestmentService {
  async list(params: InvestmentListParams = {}): Promise<InvestmentListResponse> {
    const response = await api.get<InvestmentListResponse>('/investments/', { params });
    return response.data;
  }

  async getSummary(): Promise<InvestmentSummary> {
    const response = await api.get<InvestmentSummary>('/investments/summary/');
    return response.data;
  }

  async create(payload: InvestmentPayload): Promise<Investment> {
    const response = await api.post<Investment>('/investments/', payload);
    return response.data;
  }

  async update(id: string, payload: InvestmentPayload): Promise<Investment> {
    const response = await api.put<Investment>(`/investments/${id}/`, payload);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await api.delete(`/investments/${id}/`);
  }
}

export default new InvestmentService();
