export type InvestmentType =
  | 'cdb'
  | 'lci_lca'
  | 'tesouro_direto'
  | 'poupanca'
  | 'acoes'
  | 'fiis'
  | 'fundos'
  | 'criptomoeda'
  | 'previdencia'
  | 'outro';

export type RateType = 'prefixado' | 'pos_cdi' | 'pos_ipca' | 'sem_taxa';

export type Liquidity = 'daily' | 'at_maturity';

export type InvestmentStatus = 'active' | 'redeemed';

export interface Investment {
  id: string;
  user: string;
  name: string;
  investment_type: InvestmentType;
  institution: string | null;
  currency: string;
  exchange_rate: string | null;
  principal_amount: string;
  current_value: string;
  rate_type: RateType;
  rate_value: string | null;
  fees_percentage: string | null;
  start_date: string;
  maturity_date: string | null;
  liquidity: Liquidity;
  status: InvestmentStatus;
  notes: string | null;
  counts_as_reserve: boolean;
  current_value_brl: string;
  created_at: string;
  updated_at: string;
}

export interface InvestmentPayload {
  name: string;
  investment_type: InvestmentType;
  institution?: string;
  currency: string;
  exchange_rate?: number | string | null;
  principal_amount: number | string;
  current_value?: number | string;
  rate_type: RateType;
  rate_value?: number | string | null;
  fees_percentage?: number | string | null;
  start_date: string;
  maturity_date?: string | null;
  liquidity: Liquidity;
  status?: InvestmentStatus;
  notes?: string;
}

export interface InvestmentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Investment[];
}

export interface InvestmentSummary {
  total_invested: string;
  total_current_value: string;
  reserve_total: string;
  yield_total: string;
}

export const INVESTMENT_TYPE_LABELS: Record<InvestmentType, string> = {
  cdb: 'CDB',
  lci_lca: 'LCI/LCA',
  tesouro_direto: 'Tesouro Direto',
  poupanca: 'Poupança',
  acoes: 'Ações',
  fiis: 'Fundos Imobiliários',
  fundos: 'Fundos de Investimento',
  criptomoeda: 'Criptomoeda',
  previdencia: 'Previdência Privada',
  outro: 'Outro',
};

export const RATE_TYPE_LABELS: Record<RateType, string> = {
  prefixado: 'Prefixado (% a.a.)',
  pos_cdi: 'Pós-fixado (% do CDI)',
  pos_ipca: 'IPCA+',
  sem_taxa: 'Sem taxa fixa (renda variável)',
};

export const LIQUIDITY_LABELS: Record<Liquidity, string> = {
  daily: 'Liquidez diária',
  at_maturity: 'Somente no vencimento',
};

export const INVESTMENT_STATUS_LABELS: Record<InvestmentStatus, string> = {
  active: 'Ativo',
  redeemed: 'Resgatado',
};
