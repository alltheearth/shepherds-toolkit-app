import api from './api';
import type {
  Finance,
  FinancePayload,
  FinanceListResponse,
  FinanceSummary,
  FinanceCategoryTotal,
  FinanceType,
  InstallmentPayload,
  RecurringPayload,
  DeleteSeriesScope,
} from '../types/finance.types';

export interface FinanceListParams {
  type?: FinanceType;
  category?: string;
  payment_method?: string;
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
  ordering?: string;
  page?: number;
}

export interface FinancePeriodParams {
  start_date?: string;
  end_date?: string;
  type?: FinanceType;
  status?: string;
}

class FinanceService {
  async list(params: FinanceListParams = {}): Promise<FinanceListResponse> {
    const response = await api.get<FinanceListResponse>('/finances/', { params });
    return response.data;
  }

  async listByUrl(url: string): Promise<FinanceListResponse> {
    const response = await api.get<FinanceListResponse>(url);
    return response.data;
  }

  async getSummary(params: FinancePeriodParams = {}): Promise<FinanceSummary> {
    const response = await api.get<FinanceSummary>('/finances/summary/', { params });
    return response.data;
  }

  async getByCategory(params: FinancePeriodParams = {}): Promise<FinanceCategoryTotal[]> {
    const response = await api.get<FinanceCategoryTotal[]>('/finances/by_category/', { params });
    return response.data;
  }

  async create(payload: FinancePayload): Promise<Finance> {
    const response = await api.post<Finance>('/finances/', payload);
    return response.data;
  }

  async update(id: string, payload: FinancePayload): Promise<Finance> {
    const response = await api.put<Finance>(`/finances/${id}/`, payload);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await api.delete(`/finances/${id}/`);
  }

  async createInstallments(payload: InstallmentPayload): Promise<Finance[]> {
    const response = await api.post<Finance[]>('/finances/create-installments/', payload);
    return response.data;
  }

  async createRecurring(payload: RecurringPayload): Promise<Finance[]> {
    const response = await api.post<Finance[]>('/finances/create-recurring/', payload);
    return response.data;
  }

  async deleteSeries(id: string, scope: DeleteSeriesScope): Promise<{ deleted: number }> {
    const response = await api.post<{ deleted: number }>(`/finances/${id}/delete-series/`, { scope });
    return response.data;
  }

  async confirm(id: string, confirmedDate?: string): Promise<Finance> {
    const response = await api.post<Finance>(`/finances/${id}/confirm/`, confirmedDate ? { confirmed_date: confirmedDate } : {});
    return response.data;
  }

  async unconfirm(id: string): Promise<Finance> {
    const response = await api.post<Finance>(`/finances/${id}/unconfirm/`);
    return response.data;
  }
}

export default new FinanceService();
