export type FinanceType = 'income' | 'expense';

export type FinanceStatus = 'pending' | 'confirmed';

export type FinanceCategory =
  | 'tithes'
  | 'offerings'
  | 'salaries'
  | 'utilities'
  | 'maintenance'
  | 'missions'
  | 'events'
  | 'other';

export type PaymentMethod = 'cash' | 'transfer' | 'card' | 'check' | 'pix';

export interface Finance {
  id: string;
  user: string;
  type: FinanceType;
  category: FinanceCategory;
  description: string | null;
  amount: string;
  transaction_date: string;
  status: FinanceStatus;
  confirmed_date: string | null;
  payment_method: PaymentMethod | '' | null;
  reference_number: string | null;
  notes: string | null;
  group_id: string | null;
  installment_number: number | null;
  installment_total: number | null;
  is_recurring: boolean;
  created_at: string;
  updated_at: string;
}

export interface FinancePayload {
  type: FinanceType;
  category: FinanceCategory;
  description?: string;
  amount: number | string;
  transaction_date: string;
  status?: FinanceStatus;
  confirmed_date?: string | null;
  payment_method?: PaymentMethod | '';
}

export interface InstallmentPayload {
  type: FinanceType;
  category: FinanceCategory;
  description?: string;
  total_amount: number | string;
  installments_count: number;
  start_date: string;
  payment_method?: PaymentMethod | '';
  skip_past?: boolean;
}

export interface RecurringPayload {
  type: FinanceType;
  category: FinanceCategory;
  description?: string;
  amount: number | string;
  months: number;
  start_date: string;
  payment_method?: PaymentMethod | '';
  skip_past?: boolean;
}

export type DeleteSeriesScope = 'future' | 'all';

export interface FinanceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Finance[];
}

export interface FinanceSummary {
  total_income: string;
  total_expense: string;
  balance: string;
  period_start: string | null;
  period_end: string | null;
}

export interface FinanceCategoryTotal {
  category: FinanceCategory;
  total: string;
}

export const FINANCE_TYPE_LABELS: Record<FinanceType, string> = {
  income: 'Entrada',
  expense: 'Saída',
};

export const FINANCE_STATUS_LABELS: Record<FinanceStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
};

export const FINANCE_CATEGORY_LABELS: Record<FinanceCategory, string> = {
  tithes: 'Dízimos',
  offerings: 'Ofertas',
  salaries: 'Salários',
  utilities: 'Contas',
  maintenance: 'Manutenção',
  missions: 'Missões',
  events: 'Eventos',
  other: 'Outro',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: 'Dinheiro',
  transfer: 'Transferência',
  card: 'Cartão',
  check: 'Cheque',
  pix: 'PIX',
};

export const FINANCE_CATEGORY_COLORS: Record<FinanceCategory, string> = {
  tithes: 'bg-purple-500',
  offerings: 'bg-pink-500',
  salaries: 'bg-blue-500',
  utilities: 'bg-green-500',
  maintenance: 'bg-yellow-500',
  missions: 'bg-indigo-500',
  events: 'bg-orange-500',
  other: 'bg-gray-500',
};
