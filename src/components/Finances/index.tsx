import React, { useEffect, useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import {
  DollarSign, Plus, TrendingUp, TrendingDown,
  Download, Filter, ArrowUpRight, ArrowDownRight, PieChart,
  Wallet, Edit, Trash2, Loader2, AlertCircle, Search, Layers,
  CheckCircle2, RotateCcw, PiggyBank, ShieldCheck
} from 'lucide-react';
import financeService from '../../services/financeService';
import type { Finance, FinanceCategory, FinancePayload, FinanceSummary, FinanceCategoryTotal, FinanceType, FinanceStatus, PaymentMethod } from '../../types/finance.types';
import { FINANCE_CATEGORY_LABELS, PAYMENT_METHOD_LABELS, FINANCE_CATEGORY_COLORS, FINANCE_STATUS_LABELS } from '../../types/finance.types';
import investmentService from '../../services/investmentService';
import type { Investment, InvestmentPayload, InvestmentSummary, InvestmentType, RateType, Liquidity, InvestmentStatus } from '../../types/investment.types';
import { INVESTMENT_TYPE_LABELS, RATE_TYPE_LABELS, LIQUIDITY_LABELS, INVESTMENT_STATUS_LABELS } from '../../types/investment.types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

type Period = 'week' | 'month' | 'quarter' | 'year';
type CreateMode = 'single' | 'installments' | 'recurring';

const EMPTY_INVESTMENT_FORM: InvestmentPayload = {
  name: '',
  investment_type: 'cdb',
  institution: '',
  currency: 'BRL',
  exchange_rate: '',
  principal_amount: '',
  current_value: '',
  rate_type: 'prefixado',
  rate_value: '',
  fees_percentage: '',
  start_date: '',
  maturity_date: '',
  liquidity: 'daily',
  status: 'active',
  notes: '',
};

const INVESTMENT_TYPE_ENTRIES = Object.entries(INVESTMENT_TYPE_LABELS) as [InvestmentType, string][];
const RATE_TYPE_ENTRIES = Object.entries(RATE_TYPE_LABELS) as [RateType, string][];

const SELECT_CLASSES =
  'w-full px-3 py-2 bg-surface border border-border rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow';

const EMPTY_FORM: FinancePayload = {
  type: 'income',
  category: 'tithes',
  description: '',
  amount: '',
  transaction_date: '',
  status: 'pending',
  confirmed_date: '',
  payment_method: '',
};

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addMonthsLocal(dateStr: string, months: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const totalMonths = m - 1 + months;
  const year = y + Math.floor(totalMonths / 12);
  const month = ((totalMonths % 12) + 12) % 12;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const day = Math.min(d, daysInMonth);
  return toISODate(new Date(year, month, day));
}

function countPastOccurrences(startDate: string, count: number): number {
  if (!startDate || !count || count < 1) return 0;
  const todayStr = toISODate(new Date());
  let past = 0;
  for (let i = 0; i < count; i++) {
    if (addMonthsLocal(startDate, i) < todayStr) past++;
  }
  return past;
}

function getPeriodRange(period: Period): { start_date: string; end_date: string } {
  const end = new Date();
  const start = new Date();
  switch (period) {
    case 'week':
      start.setDate(end.getDate() - 6);
      break;
    case 'quarter':
      start.setMonth(end.getMonth() - 2, 1);
      break;
    case 'year':
      start.setMonth(0, 1);
      break;
    case 'month':
    default:
      start.setDate(1);
      break;
  }
  return { start_date: toISODate(start), end_date: toISODate(end) };
}

function getProjectionEndDate(period: Period): string {
  const end = new Date();
  switch (period) {
    case 'week':
      end.setDate(end.getDate() + 6);
      break;
    case 'quarter':
      end.setMonth(end.getMonth() + 3, 0);
      break;
    case 'year':
      end.setMonth(11, 31);
      break;
    case 'month':
    default:
      end.setMonth(end.getMonth() + 1, 0);
      break;
  }
  return toISODate(end);
}

function parseAmount(value: string | number): number {
  const parsed = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: string | number): string {
  return `R$ ${parseAmount(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDateBR(dateStr: string | null): string {
  if (!dateStr) return '-';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function computeMonthlyData(transactions: Finance[]) {
  const now = new Date();
  const months: { key: string; label: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    months.push({ key, label: label.charAt(0).toUpperCase() + label.slice(1) });
  }
  const totals = new Map(months.map((m) => [m.key, { income: 0, expense: 0 }]));
  transactions.forEach((t) => {
    const key = t.transaction_date.slice(0, 7);
    const bucket = totals.get(key);
    if (!bucket) return;
    const amount = parseAmount(t.amount);
    if (t.type === 'income') bucket.income += amount;
    else bucket.expense += amount;
  });
  return months.map((m) => ({ month: m.label, ...totals.get(m.key)! }));
}

function createReportPdf(title: string, subtitle: string, lines: string[]): jsPDF {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const marginX = 15;
  let y = 20;
  pdf.setFontSize(16);
  pdf.text(title, marginX, y);
  y += 8;
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  pdf.text(subtitle, marginX, y);
  pdf.setTextColor(0);
  y += 10;
  pdf.setFontSize(11);
  lines.forEach((line) => {
    if (y > 280) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(line, marginX, y);
    y += 7;
  });
  return pdf;
}

const CATEGORY_ENTRIES = Object.entries(FINANCE_CATEGORY_LABELS) as [FinanceCategory, string][];
const PAYMENT_METHOD_ENTRIES = Object.entries(PAYMENT_METHOD_LABELS) as [PaymentMethod, string][];

const Finances = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'investments' | 'reports'>('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const [refreshKey, setRefreshKey] = useState(0);
  const [pageError, setPageError] = useState<string | null>(null);

  // Dashboard-period-scoped data
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [projectedSummary, setProjectedSummary] = useState<FinanceSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [expenseCategoryTotals, setExpenseCategoryTotals] = useState<FinanceCategoryTotal[]>([]);

  // Investments summary (used on dashboard: total invested + reserva financeira badge)
  const [investmentSummary, setInvestmentSummary] = useState<InvestmentSummary | null>(null);
  const [loadingInvestmentSummary, setLoadingInvestmentSummary] = useState(true);

  // Investments tab (full list, filterable)
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [investmentsCount, setInvestmentsCount] = useState(0);
  const [loadingInvestments, setLoadingInvestments] = useState(true);
  const [investmentTypeFilter, setInvestmentTypeFilter] = useState<InvestmentType | ''>('');
  const [investmentStatusFilter, setInvestmentStatusFilter] = useState<InvestmentStatus | ''>('active');
  const [investmentSearchTerm, setInvestmentSearchTerm] = useState('');

  // Investment modal
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [investmentFormData, setInvestmentFormData] = useState<InvestmentPayload>(EMPTY_INVESTMENT_FORM);
  const [investmentFormErrors, setInvestmentFormErrors] = useState<Record<string, string>>({});
  const [submittingInvestment, setSubmittingInvestment] = useState(false);

  // Last 7 months of transactions, used for the bar chart, "recent" and "top expenses" panels
  const [recentWindowTransactions, setRecentWindowTransactions] = useState<Finance[]>([]);
  const [loadingRecentWindow, setLoadingRecentWindow] = useState(true);

  // Transactions tab (full history, filterable, paginated)
  const [transactions, setTransactions] = useState<Finance[]>([]);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<FinanceType | ''>('');
  const [categoryFilter, setCategoryFilter] = useState<FinanceCategory | ''>('');
  const [statusFilter, setStatusFilter] = useState<FinanceStatus | ''>('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');

  // Transaction modal
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Finance | null>(null);
  const [createMode, setCreateMode] = useState<CreateMode>('single');
  const [formData, setFormData] = useState<FinancePayload>(EMPTY_FORM);
  const [installmentsCount, setInstallmentsCount] = useState('3');
  const [recurringMonths, setRecurringMonths] = useState('12');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [pastOccurrencesPrompt, setPastOccurrencesPrompt] = useState<{ count: number } | null>(null);

  const [generatingReport, setGeneratingReport] = useState(false);

  const periodRange = useMemo(() => getPeriodRange(selectedPeriod), [selectedPeriod]);
  const projectionRange = useMemo(
    () => ({ start_date: periodRange.start_date, end_date: getProjectionEndDate(selectedPeriod) }),
    [periodRange, selectedPeriod]
  );

  // Fetch summary + projected summary + category breakdown for the selected period
  useEffect(() => {
    let cancelled = false;
    setLoadingSummary(true);
    Promise.all([
      financeService.getSummary({ ...periodRange, status: 'confirmed' }),
      financeService.getSummary(projectionRange),
      financeService.getByCategory({ ...periodRange, type: 'expense', status: 'confirmed' }),
    ])
      .then(([summaryData, projectedData, expenseCategories]) => {
        if (cancelled) return;
        setSummary(summaryData);
        setProjectedSummary(projectedData);
        setExpenseCategoryTotals(expenseCategories);
        setPageError(null);
      })
      .catch(() => {
        if (!cancelled) setPageError('Não foi possível carregar os dados financeiros.');
      })
      .finally(() => {
        if (!cancelled) setLoadingSummary(false);
      });
    return () => {
      cancelled = true;
    };
  }, [periodRange, projectionRange, refreshKey]);

  // Fetch investment summary (total investido + reserva financeira), independent of the selected period
  useEffect(() => {
    let cancelled = false;
    setLoadingInvestmentSummary(true);
    investmentService
      .getSummary()
      .then((data) => {
        if (!cancelled) setInvestmentSummary(data);
      })
      .catch(() => {
        if (!cancelled) setPageError('Não foi possível carregar os investimentos.');
      })
      .finally(() => {
        if (!cancelled) setLoadingInvestmentSummary(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // Fetch last 7 months window (chart + recent + top expenses)
  useEffect(() => {
    let cancelled = false;
    setLoadingRecentWindow(true);
    const start = new Date();
    start.setMonth(start.getMonth() - 6, 1);
    financeService
      .list({ date_from: toISODate(start), date_to: toISODate(new Date()) })
      .then((data) => {
        if (!cancelled) setRecentWindowTransactions(data.results);
      })
      .catch(() => {
        if (!cancelled) setPageError('Não foi possível carregar os dados financeiros.');
      })
      .finally(() => {
        if (!cancelled) setLoadingRecentWindow(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // Fetch transactions table (filters + pagination)
  useEffect(() => {
    let cancelled = false;
    setLoadingTransactions(true);
    const timeout = setTimeout(() => {
      const request = currentPageUrl
        ? financeService.listByUrl(currentPageUrl)
        : financeService.list({
            type: typeFilter || undefined,
            category: categoryFilter || undefined,
            status: statusFilter || undefined,
            search: searchTerm || undefined,
            date_from: dateFromFilter || undefined,
            date_to: dateToFilter || undefined,
          });

      request
        .then((data) => {
          if (cancelled) return;
          setTransactions(data.results);
          setTransactionsCount(data.count);
          setNextPageUrl(data.next);
          setPrevPageUrl(data.previous);
          setPageError(null);
        })
        .catch(() => {
          if (!cancelled) setPageError('Não foi possível carregar as transações.');
        })
        .finally(() => {
          if (!cancelled) setLoadingTransactions(false);
        });
    }, currentPageUrl ? 0 : 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [typeFilter, categoryFilter, statusFilter, dateFromFilter, dateToFilter, searchTerm, currentPageUrl, refreshKey]);

  // Any filter change resets pagination back to page 1
  useEffect(() => {
    setCurrentPageUrl(null);
  }, [typeFilter, categoryFilter, statusFilter, dateFromFilter, dateToFilter, searchTerm]);

  // Fetch investments list (Investimentos tab, filters)
  useEffect(() => {
    if (activeTab !== 'investments') return;
    let cancelled = false;
    setLoadingInvestments(true);
    const timeout = setTimeout(() => {
      investmentService
        .list({
          investment_type: investmentTypeFilter || undefined,
          status: investmentStatusFilter || undefined,
          search: investmentSearchTerm || undefined,
        })
        .then((data) => {
          if (cancelled) return;
          setInvestments(data.results);
          setInvestmentsCount(data.count);
          setPageError(null);
        })
        .catch(() => {
          if (!cancelled) setPageError('Não foi possível carregar os investimentos.');
        })
        .finally(() => {
          if (!cancelled) setLoadingInvestments(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [activeTab, investmentTypeFilter, investmentStatusFilter, investmentSearchTerm, refreshKey]);

  const monthlyData = useMemo(() => computeMonthlyData(recentWindowTransactions), [recentWindowTransactions]);
  const recentTransactions = useMemo(() => recentWindowTransactions.slice(0, 5), [recentWindowTransactions]);
  const topExpenses = useMemo(
    () =>
      recentWindowTransactions
        .filter((t) => t.type === 'expense')
        .sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount))
        .slice(0, 5),
    [recentWindowTransactions]
  );

  const totalExpenseInPeriod = expenseCategoryTotals.reduce((sum, c) => sum + parseAmount(c.total), 0);
  const monthlyChartMax = Math.max(1, ...monthlyData.flatMap((d) => [d.income, d.expense]));

  const projectedIncomeExtra = summary && projectedSummary ? parseAmount(projectedSummary.total_income) - parseAmount(summary.total_income) : 0;
  const projectedExpenseExtra = summary && projectedSummary ? parseAmount(projectedSummary.total_expense) - parseAmount(summary.total_expense) : 0;
  const projectedBalance = projectedSummary ? parseAmount(projectedSummary.balance) : null;

  const refresh = () => setRefreshKey((k) => k + 1);

  const openCreateModal = () => {
    setEditingTransaction(null);
    setCreateMode('single');
    const todayStr = toISODate(new Date());
    setFormData({ ...EMPTY_FORM, transaction_date: todayStr });
    setInstallmentsCount('3');
    setRecurringMonths('12');
    setFormErrors({});
    setPastOccurrencesPrompt(null);
    setShowTransactionModal(true);
  };

  const openEditModal = (transaction: Finance) => {
    setEditingTransaction(transaction);
    setCreateMode('single');
    setFormData({
      type: transaction.type,
      category: transaction.category,
      description: transaction.description ?? '',
      amount: transaction.amount,
      transaction_date: transaction.transaction_date,
      status: transaction.status,
      confirmed_date: transaction.confirmed_date ?? '',
      payment_method: transaction.payment_method ?? '',
    });
    setFormErrors({});
    setPastOccurrencesPrompt(null);
    setShowTransactionModal(true);
  };

  const handleTransactionDateChange = (value: string) => {
    if (editingTransaction) {
      setFormData({ ...formData, transaction_date: value });
      return;
    }
    const todayStr = toISODate(new Date());
    const isPast = value !== '' && value < todayStr;
    setFormData({
      ...formData,
      transaction_date: value,
      status: isPast ? 'confirmed' : 'pending',
      confirmed_date: isPast ? value : '',
    });
  };

  const handleToggleConfirm = async (transaction: Finance) => {
    try {
      if (transaction.status === 'confirmed') {
        await financeService.unconfirm(transaction.id);
      } else {
        await financeService.confirm(transaction.id);
      }
      refresh();
    } catch {
      alert('Erro ao atualizar a situação da transação.');
    }
  };

  const closeModal = () => {
    setShowTransactionModal(false);
    setEditingTransaction(null);
    setFormErrors({});
    setPastOccurrencesPrompt(null);
  };

  const submitSeries = async (skipPast: boolean) => {
    setSubmitting(true);
    setFormErrors({});
    try {
      if (createMode === 'installments') {
        await financeService.createInstallments({
          type: formData.type,
          category: formData.category,
          description: formData.description,
          total_amount: parseAmount(formData.amount),
          installments_count: parseInt(installmentsCount, 10),
          start_date: formData.transaction_date,
          payment_method: formData.payment_method,
          skip_past: skipPast,
        });
      } else {
        await financeService.createRecurring({
          type: formData.type,
          category: formData.category,
          description: formData.description,
          amount: parseAmount(formData.amount),
          months: parseInt(recurringMonths, 10),
          start_date: formData.transaction_date,
          payment_method: formData.payment_method,
          skip_past: skipPast,
        });
      }
      setPastOccurrencesPrompt(null);
      closeModal();
      refresh();
    } catch (error: any) {
      const data = error?.response?.data;
      if (data && typeof data === 'object') {
        const mapped: Record<string, string> = {};
        Object.entries(data).forEach(([key, value]) => {
          mapped[key] = Array.isArray(value) ? String(value[0]) : String(value);
        });
        setFormErrors(mapped);
      } else {
        setFormErrors({ general: 'Erro ao salvar transação.' });
      }
      setPastOccurrencesPrompt(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.transaction_date) errors.transaction_date = createMode === 'single' ? 'Data é obrigatória' : 'Data inicial é obrigatória';
    if (!formData.amount || parseAmount(formData.amount) <= 0) {
      errors.amount = createMode === 'installments' ? 'Informe o valor total da compra' : 'Informe um valor válido';
    }
    if (!formData.category) errors.category = 'Categoria é obrigatória';
    let seriesLength = 0;
    if (createMode === 'installments') {
      seriesLength = parseInt(installmentsCount, 10);
      if (!Number.isInteger(seriesLength) || seriesLength < 2) errors.installments_count = 'Informe pelo menos 2 parcelas';
    }
    if (createMode === 'recurring') {
      seriesLength = parseInt(recurringMonths, 10);
      if (!Number.isInteger(seriesLength) || seriesLength < 1) errors.months = 'Informe ao menos 1 mês';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!editingTransaction && createMode !== 'single') {
      const pastCount = countPastOccurrences(formData.transaction_date, seriesLength);
      if (pastCount > 0) {
        setFormErrors({});
        setPastOccurrencesPrompt({ count: pastCount });
        return;
      }
      await submitSeries(false);
      return;
    }

    setSubmitting(true);
    setFormErrors({});
    try {
      const payload = {
        ...formData,
        amount: parseAmount(formData.amount),
        confirmed_date: formData.status === 'confirmed' ? formData.confirmed_date || formData.transaction_date : null,
      };
      if (editingTransaction) {
        await financeService.update(editingTransaction.id, payload);
      } else {
        await financeService.create(payload);
      }
      closeModal();
      refresh();
    } catch (error: any) {
      const data = error?.response?.data;
      if (data && typeof data === 'object') {
        const mapped: Record<string, string> = {};
        Object.entries(data).forEach(([key, value]) => {
          mapped[key] = Array.isArray(value) ? String(value[0]) : String(value);
        });
        setFormErrors(mapped);
      } else {
        setFormErrors({ general: 'Erro ao salvar transação.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (transaction: Finance) => {
    const label = transaction.description || FINANCE_CATEGORY_LABELS[transaction.category];
    if (!window.confirm(`Excluir a transação "${label}"?`)) return;
    try {
      await financeService.remove(transaction.id);
      refresh();
    } catch {
      alert('Erro ao excluir transação.');
    }
  };

  const handleDeleteSeries = async (transaction: Finance) => {
    if (!transaction.group_id) return;
    const kind = transaction.is_recurring ? 'despesa fixa' : 'compra parcelada';
    if (!window.confirm(`Excluir esta e as próximas ocorrências desta ${kind} (a partir de ${formatDateBR(transaction.transaction_date)})?`)) return;
    try {
      await financeService.deleteSeries(transaction.id, 'future');
      refresh();
    } catch {
      alert('Erro ao excluir a série.');
    }
  };

  const openCreateInvestmentModal = () => {
    setEditingInvestment(null);
    const todayStr = toISODate(new Date());
    setInvestmentFormData({ ...EMPTY_INVESTMENT_FORM, start_date: todayStr });
    setInvestmentFormErrors({});
    setShowInvestmentModal(true);
  };

  const openEditInvestmentModal = (investment: Investment) => {
    setEditingInvestment(investment);
    setInvestmentFormData({
      name: investment.name,
      investment_type: investment.investment_type,
      institution: investment.institution ?? '',
      currency: investment.currency,
      exchange_rate: investment.exchange_rate ?? '',
      principal_amount: investment.principal_amount,
      current_value: investment.current_value,
      rate_type: investment.rate_type,
      rate_value: investment.rate_value ?? '',
      fees_percentage: investment.fees_percentage ?? '',
      start_date: investment.start_date,
      maturity_date: investment.maturity_date ?? '',
      liquidity: investment.liquidity,
      status: investment.status,
      notes: investment.notes ?? '',
    });
    setInvestmentFormErrors({});
    setShowInvestmentModal(true);
  };

  const closeInvestmentModal = () => {
    setShowInvestmentModal(false);
    setEditingInvestment(null);
    setInvestmentFormErrors({});
  };

  const handleInvestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!investmentFormData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!investmentFormData.start_date) errors.start_date = 'Data de início é obrigatória';
    if (!investmentFormData.principal_amount || parseAmount(investmentFormData.principal_amount) <= 0) {
      errors.principal_amount = 'Informe o valor aportado';
    }
    if (investmentFormData.currency !== 'BRL' && !investmentFormData.exchange_rate) {
      errors.exchange_rate = 'Obrigatório quando a moeda não é BRL';
    }
    if (investmentFormData.liquidity === 'at_maturity' && !investmentFormData.maturity_date) {
      errors.maturity_date = 'Obrigatório quando a liquidez é apenas no vencimento';
    }
    if (Object.keys(errors).length > 0) {
      setInvestmentFormErrors(errors);
      return;
    }

    setSubmittingInvestment(true);
    setInvestmentFormErrors({});
    try {
      const payload: InvestmentPayload = {
        ...investmentFormData,
        principal_amount: parseAmount(investmentFormData.principal_amount),
        current_value: investmentFormData.current_value
          ? parseAmount(investmentFormData.current_value)
          : parseAmount(investmentFormData.principal_amount),
        exchange_rate: investmentFormData.currency !== 'BRL' ? parseAmount(investmentFormData.exchange_rate || 0) : null,
        rate_value: investmentFormData.rate_value ? parseAmount(investmentFormData.rate_value) : null,
        fees_percentage: investmentFormData.fees_percentage ? parseAmount(investmentFormData.fees_percentage) : null,
        maturity_date: investmentFormData.maturity_date || null,
      };
      if (editingInvestment) {
        await investmentService.update(editingInvestment.id, payload);
      } else {
        await investmentService.create(payload);
      }
      closeInvestmentModal();
      refresh();
    } catch (error: any) {
      const data = error?.response?.data;
      if (data && typeof data === 'object') {
        const mapped: Record<string, string> = {};
        Object.entries(data).forEach(([key, value]) => {
          mapped[key] = Array.isArray(value) ? String(value[0]) : String(value);
        });
        setInvestmentFormErrors(mapped);
      } else {
        setInvestmentFormErrors({ general: 'Erro ao salvar investimento.' });
      }
    } finally {
      setSubmittingInvestment(false);
    }
  };

  const handleDeleteInvestment = async (investment: Investment) => {
    if (!window.confirm(`Excluir o investimento "${investment.name}"?`)) return;
    try {
      await investmentService.remove(investment.id);
      refresh();
    } catch {
      alert('Erro ao excluir investimento.');
    }
  };

  const handleGenerateMonthlyReport = () => {
    if (!summary) return;
    const lines = [
      `Período: ${formatDateBR(periodRange.start_date)} a ${formatDateBR(periodRange.end_date)}`,
      '',
      `Total de Entradas: ${formatCurrency(summary.total_income)}`,
      `Total de Saídas: ${formatCurrency(summary.total_expense)}`,
      `Saldo: ${formatCurrency(summary.balance)}`,
      '',
      'Despesas por Categoria:',
      ...(expenseCategoryTotals.length
        ? expenseCategoryTotals.map((c) => `  ${FINANCE_CATEGORY_LABELS[c.category]}: ${formatCurrency(c.total)}`)
        : ['  Nenhuma despesa no período.']),
    ];
    const pdf = createReportPdf('Relatório Mensal', 'Gestão Financeira', lines);
    pdf.save(`relatorio-mensal-${periodRange.end_date}.pdf`);
  };

  const handleGenerateCategoryReport = () => {
    const lines = expenseCategoryTotals.length
      ? expenseCategoryTotals.map((c) => {
          const pct = totalExpenseInPeriod > 0 ? (parseAmount(c.total) / totalExpenseInPeriod) * 100 : 0;
          return `${FINANCE_CATEGORY_LABELS[c.category]}: ${formatCurrency(c.total)} (${pct.toFixed(1)}%)`;
        })
      : ['Nenhuma despesa no período.'];
    const pdf = createReportPdf(
      'Relatório por Categoria',
      `Período: ${formatDateBR(periodRange.start_date)} a ${formatDateBR(periodRange.end_date)}`,
      lines
    );
    pdf.save(`relatorio-categoria-${periodRange.end_date}.pdf`);
  };

  const handleGenerateTithesReport = async () => {
    setGeneratingReport(true);
    try {
      const data = await financeService.list({
        category: 'tithes',
        type: 'income',
        date_from: periodRange.start_date,
        date_to: periodRange.end_date,
      });
      const tithesTotal = data.results.reduce((sum, t) => sum + parseAmount(t.amount), 0);
      const lines = [
        `Total de Dízimos no período: ${formatCurrency(tithesTotal)}`,
        '',
        ...(data.results.length
          ? data.results.map((t) => `${formatDateBR(t.transaction_date)}  ${formatCurrency(t.amount)}  ${t.description || ''}`)
          : ['Nenhum dízimo registrado no período.']),
      ];
      const pdf = createReportPdf(
        'Relatório de Dízimos',
        `Período: ${formatDateBR(periodRange.start_date)} a ${formatDateBR(periodRange.end_date)}`,
        lines
      );
      pdf.save(`relatorio-dizimos-${periodRange.end_date}.pdf`);
    } catch {
      alert('Erro ao gerar relatório de dízimos.');
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-bg">
      <header className="bg-surface border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <DollarSign className="text-accent" size={24} />
              <div>
                <h1 className="text-lg font-semibold text-ink">Gestão Financeira</h1>
                <p className="text-sm text-ink-faint">Controle completo das finanças da igreja</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as Period)}
                className={`${SELECT_CLASSES} w-auto`}
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mês</option>
                <option value="quarter">Este Trimestre</option>
                <option value="year">Este Ano</option>
              </select>
              <Button size="sm" onClick={openCreateModal}>
                <Plus size={16} />
                Nova Transação
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-bg border border-border p-1 rounded-md w-fit">
            {(['dashboard', 'transactions', 'investments', 'reports'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {tab === 'dashboard'
                  ? 'Dashboard'
                  : tab === 'transactions'
                  ? 'Transações'
                  : tab === 'investments'
                  ? 'Investimentos'
                  : 'Relatórios'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {pageError && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-danger-soft border border-border text-danger rounded-lg">
            <AlertCircle size={18} />
            <span className="text-sm">{pageError}</span>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {loadingSummary || !summary ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <Card key={idx} className="p-5 h-32 flex items-center justify-center">
                    <Loader2 className="animate-spin text-ink-faint" size={22} />
                  </Card>
                ))
              ) : (
                <>
                  <SummaryCard
                    title="Total de Entradas"
                    value={formatCurrency(summary.total_income)}
                    icon={TrendingUp}
                    tone="success"
                    period="no período"
                    badge={projectedIncomeExtra > 0.004 ? { text: `+ ${formatCurrency(projectedIncomeExtra)} previstos`, tone: 'accent' } : undefined}
                  />
                  <SummaryCard
                    title="Total de Saídas"
                    value={formatCurrency(summary.total_expense)}
                    icon={TrendingDown}
                    tone="danger"
                    period="no período"
                    badge={projectedExpenseExtra > 0.004 ? { text: `+ ${formatCurrency(projectedExpenseExtra)} previstos`, tone: 'warning' } : undefined}
                  />
                  <SummaryCard
                    title="Saldo"
                    value={formatCurrency(summary.balance)}
                    icon={Wallet}
                    tone="accent"
                    period="disponível"
                    badge={
                      projectedBalance !== null && Math.abs(projectedBalance - parseAmount(summary.balance)) > 0.004
                        ? { text: `Previsto: ${formatCurrency(projectedBalance)}`, tone: projectedBalance < 0 ? 'danger' : 'accent' }
                        : undefined
                    }
                  />
                  <SummaryCard
                    title="Investimentos"
                    value={investmentSummary ? formatCurrency(investmentSummary.total_current_value) : formatCurrency(0)}
                    icon={PiggyBank}
                    tone="warning"
                    period="valor atual"
                    badge={
                      investmentSummary && parseAmount(investmentSummary.reserve_total) > 0.004
                        ? { text: `Reserva: ${formatCurrency(investmentSummary.reserve_total)}`, tone: 'success' }
                        : undefined
                    }
                  />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <Card className="lg:col-span-2 p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-ink">Entradas vs Saídas (últimos 7 meses)</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-ink-muted">Entradas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-danger rounded-full"></div>
                      <span className="text-ink-muted">Saídas</span>
                    </div>
                  </div>
                </div>
                {loadingRecentWindow ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-ink-faint" size={22} />
                  </div>
                ) : (
                  <div className="h-64 flex items-end justify-between gap-2">
                    {monthlyData.map((data, idx) => {
                      const incomeHeight = (data.income / monthlyChartMax) * 100;
                      const expenseHeight = (data.expense / monthlyChartMax) * 100;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex justify-center gap-1 items-end" style={{ height: '200px' }}>
                            <div className="flex-1 bg-success rounded-t hover:opacity-80 transition-opacity cursor-pointer relative group" style={{ height: `${incomeHeight}%` }}>
                              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-ink opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                R$ {(data.income / 1000).toFixed(1)}k
                              </span>
                            </div>
                            <div className="flex-1 bg-danger rounded-t hover:opacity-80 transition-opacity cursor-pointer relative group" style={{ height: `${expenseHeight}%` }}>
                              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-ink opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                R$ {(data.expense / 1000).toFixed(1)}k
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-ink-faint font-medium">{data.month}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-ink">Despesas por Categoria</h3>
                  <PieChart size={18} className="text-ink-faint" />
                </div>
                {loadingSummary ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="animate-spin text-ink-faint" size={22} />
                  </div>
                ) : expenseCategoryTotals.length === 0 ? (
                  <p className="text-sm text-ink-faint">Nenhuma despesa registrada no período.</p>
                ) : (
                  <div className="space-y-4">
                    {expenseCategoryTotals.map((cat) => {
                      const pct = totalExpenseInPeriod > 0 ? (parseAmount(cat.total) / totalExpenseInPeriod) * 100 : 0;
                      return (
                        <div key={cat.category}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-ink-muted">{FINANCE_CATEGORY_LABELS[cat.category]}</span>
                            <span className="text-sm font-bold text-ink">{formatCurrency(cat.total)}</span>
                          </div>
                          <div className="w-full bg-bg rounded-full h-2">
                            <div className={`${FINANCE_CATEGORY_COLORS[cat.category]} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }}></div>
                          </div>
                          <span className="text-xs text-ink-faint mt-1">{pct.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-ink">Transações Recentes</h3>
                  <button onClick={() => setActiveTab('transactions')} className="text-sm text-accent hover:underline font-medium">
                    Ver todas →
                  </button>
                </div>
                {loadingRecentWindow ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="animate-spin text-ink-faint" size={22} />
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <p className="text-sm text-ink-faint">Nenhuma transação registrada ainda.</p>
                ) : (
                  <div className="space-y-1">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-2.5 hover:bg-surface-hover rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${transaction.type === 'income' ? 'bg-success-soft' : 'bg-danger-soft'}`}>
                            {transaction.type === 'income' ? (
                              <ArrowUpRight className="text-success" size={18} />
                            ) : (
                              <ArrowDownRight className="text-danger" size={18} />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-ink">{transaction.description || FINANCE_CATEGORY_LABELS[transaction.category]}</p>
                            <div className="flex items-center gap-2 text-xs text-ink-faint">
                              <span>{FINANCE_CATEGORY_LABELS[transaction.category]}</span>
                              <span>•</span>
                              <span>{formatDateBR(transaction.transaction_date)}</span>
                              {transaction.status === 'pending' && (
                                <>
                                  <span>•</span>
                                  <Badge tone="warning">Pendente</Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                          </p>
                          <span className="text-xs text-ink-faint">
                            {transaction.payment_method ? PAYMENT_METHOD_LABELS[transaction.payment_method] : '-'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-ink">Maiores Despesas</h3>
                  <TrendingDown size={18} className="text-ink-faint" />
                </div>
                {loadingRecentWindow ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="animate-spin text-ink-faint" size={22} />
                  </div>
                ) : topExpenses.length === 0 ? (
                  <p className="text-sm text-ink-faint">Nenhuma despesa nos últimos 7 meses.</p>
                ) : (
                  <div className="space-y-3">
                    {topExpenses.map((expense) => (
                      <div key={expense.id} className="p-3 bg-danger-soft rounded-md border-l-4 border-danger">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-ink">{expense.description || FINANCE_CATEGORY_LABELS[expense.category]}</p>
                          {expense.status === 'pending' && <Badge tone="warning">Pendente</Badge>}
                        </div>
                        <p className="text-sm font-semibold text-ink mb-2">{formatCurrency(expense.amount)}</p>
                        <div className="flex items-center justify-between text-xs text-ink-muted">
                          <span>{FINANCE_CATEGORY_LABELS[expense.category]}</span>
                          <span className="font-medium">{formatDateBR(expense.transaction_date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={16} />
                    <Input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar transações..."
                      className="pl-9"
                    />
                  </div>
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as FinanceType | '')} className={`${SELECT_CLASSES} w-auto`}>
                    <option value="">Todos os Tipos</option>
                    <option value="income">Entradas</option>
                    <option value="expense">Saídas</option>
                  </select>
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as FinanceCategory | '')} className={`${SELECT_CLASSES} w-auto`}>
                    <option value="">Todas as Categorias</option>
                    {CATEGORY_ENTRIES.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as FinanceStatus | '')} className={`${SELECT_CLASSES} w-auto`}>
                    <option value="">Toda Situação</option>
                    <option value="pending">Pendentes</option>
                    <option value="confirmed">Confirmadas</option>
                  </select>
                  {(searchTerm || typeFilter || categoryFilter || statusFilter || dateFromFilter || dateToFilter) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setTypeFilter('');
                        setCategoryFilter('');
                        setStatusFilter('');
                        setDateFromFilter('');
                        setDateToFilter('');
                      }}
                    >
                      <Filter size={16} />
                      Limpar
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <label className="text-sm text-ink-muted whitespace-nowrap">Período:</label>
                  <Input type="date" value={dateFromFilter} onChange={(e) => setDateFromFilter(e.target.value)} className="w-auto" />
                  <span className="text-ink-faint text-sm">até</span>
                  <Input type="date" value={dateToFilter} onChange={(e) => setDateToFilter(e.target.value)} className="w-auto" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Descrição</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Categoria</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Método</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Situação</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-ink-faint uppercase">Valor</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-ink-faint uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loadingTransactions ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center">
                          <Loader2 className="animate-spin text-ink-faint mx-auto" size={22} />
                        </td>
                      </tr>
                    ) : transactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-sm text-ink-faint">
                          Nenhuma transação encontrada.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-surface-hover transition-colors">
                          <td className="px-6 py-3.5 text-sm text-ink-muted">{formatDateBR(transaction.transaction_date)}</td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-md ${transaction.type === 'income' ? 'bg-success-soft' : 'bg-danger-soft'}`}>
                                {transaction.type === 'income' ? (
                                  <ArrowUpRight className="text-success" size={15} />
                                ) : (
                                  <ArrowDownRight className="text-danger" size={15} />
                                )}
                              </div>
                              <span className="text-sm font-medium text-ink">{transaction.description || FINANCE_CATEGORY_LABELS[transaction.category]}</span>
                              {transaction.installment_total && (
                                <Badge tone="accent">
                                  {transaction.installment_number}/{transaction.installment_total}
                                </Badge>
                              )}
                              {transaction.is_recurring && <Badge tone="warning">Fixo</Badge>}
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <Badge tone="neutral">{FINANCE_CATEGORY_LABELS[transaction.category]}</Badge>
                          </td>
                          <td className="px-6 py-3.5 text-sm text-ink-muted">
                            {transaction.payment_method ? PAYMENT_METHOD_LABELS[transaction.payment_method] : '-'}
                          </td>
                          <td className="px-6 py-3.5">
                            <Badge tone={transaction.status === 'confirmed' ? 'success' : 'warning'}>
                              {FINANCE_STATUS_LABELS[transaction.status]}
                            </Badge>
                            {transaction.status === 'confirmed' && transaction.confirmed_date && transaction.confirmed_date !== transaction.transaction_date && (
                              <div className="text-xs text-ink-faint mt-1">
                                {transaction.confirmed_date > transaction.transaction_date ? 'Atrasado' : 'Adiantado'}: {formatDateBR(transaction.confirmed_date)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <span className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                              {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleToggleConfirm(transaction)}
                                className={`p-1.5 rounded-md transition-colors ${transaction.status === 'confirmed' ? 'hover:bg-warning-soft' : 'hover:bg-success-soft'}`}
                                title={transaction.status === 'confirmed' ? 'Marcar como pendente' : 'Confirmar'}
                              >
                                {transaction.status === 'confirmed' ? (
                                  <RotateCcw size={15} className="text-warning" />
                                ) : (
                                  <CheckCircle2 size={15} className="text-success" />
                                )}
                              </button>
                              <button onClick={() => openEditModal(transaction)} className="p-1.5 hover:bg-surface-hover rounded-md transition-colors" title="Editar">
                                <Edit size={15} className="text-ink-muted" />
                              </button>
                              {transaction.group_id && (
                                <button
                                  onClick={() => handleDeleteSeries(transaction)}
                                  className="p-1.5 hover:bg-warning-soft rounded-md transition-colors"
                                  title="Excluir esta e as próximas da série"
                                >
                                  <Layers size={15} className="text-warning" />
                                </button>
                              )}
                              <button onClick={() => handleDelete(transaction)} className="p-1.5 hover:bg-danger-soft rounded-md transition-colors" title="Excluir apenas esta">
                                <Trash2 size={15} className="text-danger" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-ink-muted">
                  {transactionsCount > 0 ? `${transactionsCount} transaç${transactionsCount === 1 ? 'ão' : 'ões'} no total` : 'Nenhuma transação'}
                </span>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" disabled={!prevPageUrl} onClick={() => setCurrentPageUrl(prevPageUrl)}>
                    Anterior
                  </Button>
                  <Button size="sm" disabled={!nextPageUrl} onClick={() => setCurrentPageUrl(nextPageUrl)}>
                    Próximo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'investments' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {loadingInvestmentSummary || !investmentSummary ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <Card key={idx} className="p-5 h-32 flex items-center justify-center">
                    <Loader2 className="animate-spin text-ink-faint" size={22} />
                  </Card>
                ))
              ) : (
                <>
                  <SummaryCard title="Total Investido" value={formatCurrency(investmentSummary.total_invested)} icon={Wallet} tone="accent" period="valor aportado" />
                  <SummaryCard title="Valor Atual" value={formatCurrency(investmentSummary.total_current_value)} icon={PiggyBank} tone="warning" period="soma das aplicações ativas" />
                  <SummaryCard
                    title="Reserva Financeira"
                    value={formatCurrency(investmentSummary.reserve_total)}
                    icon={ShieldCheck}
                    tone="success"
                    period="liquidez diária, disponível a qualquer momento"
                  />
                  <SummaryCard
                    title="Rendimento"
                    value={formatCurrency(investmentSummary.yield_total)}
                    icon={TrendingUp}
                    tone={parseAmount(investmentSummary.yield_total) < 0 ? 'danger' : 'success'}
                    period="valor atual - aportado"
                  />
                </>
              )}
            </div>

            <Card className="overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={16} />
                    <Input
                      type="text"
                      value={investmentSearchTerm}
                      onChange={(e) => setInvestmentSearchTerm(e.target.value)}
                      placeholder="Buscar investimentos..."
                      className="pl-9"
                    />
                  </div>
                  <select
                    value={investmentTypeFilter}
                    onChange={(e) => setInvestmentTypeFilter(e.target.value as InvestmentType | '')}
                    className={`${SELECT_CLASSES} w-auto`}
                  >
                    <option value="">Todos os Tipos</option>
                    {INVESTMENT_TYPE_ENTRIES.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={investmentStatusFilter}
                    onChange={(e) => setInvestmentStatusFilter(e.target.value as InvestmentStatus | '')}
                    className={`${SELECT_CLASSES} w-auto`}
                  >
                    <option value="">Toda Situação</option>
                    <option value="active">Ativos</option>
                    <option value="redeemed">Resgatados</option>
                  </select>
                  <Button size="sm" onClick={openCreateInvestmentModal}>
                    <Plus size={16} />
                    Nova Aplicação
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Taxa</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Liquidez</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Vencimento</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-ink-faint uppercase">Valor Atual</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-ink-faint uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loadingInvestments ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center">
                          <Loader2 className="animate-spin text-ink-faint mx-auto" size={22} />
                        </td>
                      </tr>
                    ) : investments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-sm text-ink-faint">
                          Nenhum investimento encontrado.
                        </td>
                      </tr>
                    ) : (
                      investments.map((investment) => (
                        <tr key={investment.id} className="hover:bg-surface-hover transition-colors">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-ink">{investment.name}</span>
                              {investment.counts_as_reserve && <Badge tone="success">Reserva</Badge>}
                              {investment.status === 'redeemed' && <Badge tone="neutral">Resgatado</Badge>}
                            </div>
                            {investment.institution && <span className="text-xs text-ink-faint">{investment.institution}</span>}
                          </td>
                          <td className="px-6 py-3.5">
                            <Badge tone="neutral">{INVESTMENT_TYPE_LABELS[investment.investment_type]}</Badge>
                          </td>
                          <td className="px-6 py-3.5 text-sm text-ink-muted">
                            {investment.rate_value ? `${parseAmount(investment.rate_value)}${investment.rate_type === 'pos_cdi' ? '% CDI' : investment.rate_type === 'pos_ipca' ? '% IPCA+' : '% a.a.'}` : '-'}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-ink-muted">{LIQUIDITY_LABELS[investment.liquidity]}</td>
                          <td className="px-6 py-3.5 text-sm text-ink-muted">{formatDateBR(investment.maturity_date)}</td>
                          <td className="px-6 py-3.5 text-right">
                            <span className="text-sm font-semibold text-ink">
                              {investment.currency !== 'BRL' ? `${investment.currency} ${parseAmount(investment.current_value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · ` : ''}
                              {formatCurrency(investment.current_value_brl)}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => openEditInvestmentModal(investment)} className="p-1.5 hover:bg-surface-hover rounded-md transition-colors" title="Editar">
                                <Edit size={15} className="text-ink-muted" />
                              </button>
                              <button onClick={() => handleDeleteInvestment(investment)} className="p-1.5 hover:bg-danger-soft rounded-md transition-colors" title="Excluir">
                                <Trash2 size={15} className="text-danger" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-border">
                <span className="text-sm text-ink-muted">
                  {investmentsCount > 0 ? `${investmentsCount} investimento${investmentsCount === 1 ? '' : 's'} no total` : 'Nenhum investimento'}
                </span>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <ReportCard
                title="Relatório Mensal"
                description="Resumo de entradas e saídas do período selecionado"
                onGenerate={handleGenerateMonthlyReport}
                disabled={generatingReport || loadingSummary}
              />
              <ReportCard
                title="Relatório de Dízimos"
                description="Lista de dízimos recebidos no período selecionado"
                onGenerate={handleGenerateTithesReport}
                disabled={generatingReport || loadingSummary}
              />
              <ReportCard
                title="Relatório por Categoria"
                description="Despesas do período organizadas por categoria"
                onGenerate={handleGenerateCategoryReport}
                disabled={generatingReport || loadingSummary}
              />
              <ReportCard title="Relatório Anual" description="Balanço geral do ano fiscal completo" comingSoon />
              <ReportCard title="Relatório de Missões" description="Investimentos em trabalhos missionários" comingSoon />
              <ReportCard title="Relatório Personalizado" description="Crie um relatório com filtros customizados" comingSoon />
            </div>
            <p className="text-sm text-ink-faint">Os relatórios são gerados a partir dos dados do período selecionado no topo da página e baixados diretamente para o seu computador.</p>
          </div>
        )}
      </div>

      <Modal open={showTransactionModal} onClose={closeModal} title={editingTransaction ? 'Editar Transação' : 'Nova Transação'}>
        {pastOccurrencesPrompt ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-warning-soft border border-border rounded-md">
              <AlertCircle className="text-warning flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-ink">
                {pastOccurrencesPrompt.count === 1
                  ? '1 ocorrência cairia antes de hoje.'
                  : `${pastOccurrencesPrompt.count} ocorrências cairiam antes de hoje.`}{' '}
                Incluir essas ocorrências passadas altera o saldo de períodos já fechados. O que você prefere?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="secondary" onClick={() => submitSeries(false)} disabled={submitting}>
                {submitting && <Loader2 className="animate-spin" size={16} />}
                Incluir também as passadas
              </Button>
              <Button onClick={() => submitSeries(true)} disabled={submitting}>
                {submitting && <Loader2 className="animate-spin" size={16} />}
                Começar somente a partir de hoje
              </Button>
              <button type="button" onClick={() => setPastOccurrencesPrompt(null)} className="w-full px-4 py-2 text-sm text-ink-muted hover:text-ink">
                Voltar e ajustar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formErrors.general && <p className="text-sm text-danger">{formErrors.general}</p>}

            {!editingTransaction && (
              <div className="flex items-center gap-1 bg-bg border border-border p-1 rounded-md">
                {([
                  ['single', 'Única'],
                  ['installments', 'Parcelada'],
                  ['recurring', 'Fixa'],
                ] as [CreateMode, string][]).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCreateMode(mode)}
                    className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      createMode === mode ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">Tipo</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as FinanceType })} className={SELECT_CLASSES}>
                  <option value="income">Entrada</option>
                  <option value="expense">Saída</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">Categoria</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as FinanceCategory })} className={SELECT_CLASSES}>
                  {CATEGORY_ENTRIES.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {formErrors.category && <p className="text-xs text-danger mt-1">{formErrors.category}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Descrição</label>
              <Input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ex: Dízimos - Domingo"
              />
              {formErrors.description && <p className="text-xs text-danger mt-1">{formErrors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">
                  {createMode === 'installments' ? 'Valor Total (R$)' : createMode === 'recurring' ? 'Valor Mensal (R$)' : 'Valor (R$)'}
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0,00"
                />
                {formErrors.amount && <p className="text-xs text-danger mt-1">{formErrors.amount}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">{createMode === 'single' ? 'Data' : 'Data da 1ª ocorrência'}</label>
                <Input type="date" value={formData.transaction_date} onChange={(e) => handleTransactionDateChange(e.target.value)} />
                {formErrors.transaction_date && <p className="text-xs text-danger mt-1">{formErrors.transaction_date}</p>}
              </div>
            </div>

            {createMode === 'single' && (
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">Situação</label>
                <div className="flex items-center gap-1 bg-bg border border-border p-1 rounded-md">
                  {(['pending', 'confirmed'] as FinanceStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          status: s,
                          confirmed_date: s === 'confirmed' ? formData.confirmed_date || formData.transaction_date || toISODate(new Date()) : '',
                        })
                      }
                      className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        formData.status === s
                          ? s === 'confirmed'
                            ? 'bg-success-soft text-success'
                            : 'bg-warning-soft text-warning'
                          : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {FINANCE_STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-ink-faint mt-1">
                  {formData.type === 'income'
                    ? 'Pendente = ainda não recebido. Confirmado = o dinheiro já entrou.'
                    : 'Pendente = ainda não pago. Confirmado = o dinheiro já saiu.'}
                </p>
                {formData.status === 'confirmed' && (
                  <div className="mt-2">
                    <label className="block text-xs font-medium text-ink-muted mb-1">
                      Data em que {formData.type === 'income' ? 'foi recebido' : 'foi pago'} (pode ser antes ou depois da data acima)
                    </label>
                    <Input
                      type="date"
                      value={formData.confirmed_date ?? ''}
                      onChange={(e) => setFormData({ ...formData, confirmed_date: e.target.value })}
                    />
                  </div>
                )}
              </div>
            )}

            {createMode === 'installments' && !editingTransaction && (
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">Número de Parcelas</label>
                <Input type="number" min="2" max="60" value={installmentsCount} onChange={(e) => setInstallmentsCount(e.target.value)} />
                {formErrors.installments_count && <p className="text-xs text-danger mt-1">{formErrors.installments_count}</p>}
                {parseAmount(formData.amount) > 0 && parseInt(installmentsCount, 10) >= 2 && (
                  <p className="text-xs text-ink-faint mt-1">
                    {installmentsCount}x de {formatCurrency(parseAmount(formData.amount) / parseInt(installmentsCount, 10))}
                  </p>
                )}
              </div>
            )}

            {createMode === 'recurring' && !editingTransaction && (
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">Gerar por quantos meses</label>
                <Input type="number" min="1" max="60" value={recurringMonths} onChange={(e) => setRecurringMonths(e.target.value)} />
                {formErrors.months && <p className="text-xs text-danger mt-1">{formErrors.months}</p>}
                <p className="text-xs text-ink-faint mt-1">Cria {recurringMonths} lançamentos mensais do mesmo valor. Você pode editar ou excluir ocorrências específicas depois.</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Método de Pagamento</label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value as PaymentMethod | '' })}
                className={SELECT_CLASSES}
              >
                <option value="">Não informado</option>
                {PAYMENT_METHOD_ENTRIES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="animate-spin" size={16} />}
                {editingTransaction
                  ? 'Salvar'
                  : createMode === 'installments'
                  ? 'Criar Parcelas'
                  : createMode === 'recurring'
                  ? 'Criar Despesa Fixa'
                  : 'Criar'}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={showInvestmentModal} onClose={closeInvestmentModal} title={editingInvestment ? 'Editar Investimento' : 'Nova Aplicação'}>
        <form onSubmit={handleInvestmentSubmit} className="space-y-4">
          {investmentFormErrors.general && <p className="text-sm text-danger">{investmentFormErrors.general}</p>}

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Nome</label>
            <Input
              type="text"
              value={investmentFormData.name}
              onChange={(e) => setInvestmentFormData({ ...investmentFormData, name: e.target.value })}
              placeholder="Ex: CDB Banco Inter 2026"
            />
            {investmentFormErrors.name && <p className="text-xs text-danger mt-1">{investmentFormErrors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Tipo</label>
              <select
                value={investmentFormData.investment_type}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, investment_type: e.target.value as InvestmentType })}
                className={SELECT_CLASSES}
              >
                {INVESTMENT_TYPE_ENTRIES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Instituição</label>
              <Input
                type="text"
                value={investmentFormData.institution}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, institution: e.target.value })}
                placeholder="Ex: Banco Inter"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Moeda</label>
              <Input
                type="text"
                value={investmentFormData.currency}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, currency: e.target.value.toUpperCase().slice(0, 3) })}
                placeholder="BRL"
              />
            </div>
            {investmentFormData.currency !== 'BRL' && (
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">Câmbio (para BRL)</label>
                <Input
                  type="number"
                  step="0.000001"
                  min="0"
                  value={investmentFormData.exchange_rate ?? ''}
                  onChange={(e) => setInvestmentFormData({ ...investmentFormData, exchange_rate: e.target.value })}
                  placeholder="0,00"
                />
                {investmentFormErrors.exchange_rate && <p className="text-xs text-danger mt-1">{investmentFormErrors.exchange_rate}</p>}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Valor Aportado</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={investmentFormData.principal_amount}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, principal_amount: e.target.value })}
                placeholder="0,00"
              />
              {investmentFormErrors.principal_amount && <p className="text-xs text-danger mt-1">{investmentFormErrors.principal_amount}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Valor Atual</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={investmentFormData.current_value ?? ''}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, current_value: e.target.value })}
                placeholder="Igual ao aportado, se vazio"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Tipo de Taxa</label>
              <select
                value={investmentFormData.rate_type}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, rate_type: e.target.value as RateType })}
                className={SELECT_CLASSES}
              >
                {RATE_TYPE_ENTRIES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {investmentFormData.rate_type !== 'sem_taxa' && (
              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">
                  Valor da Taxa {investmentFormData.rate_type === 'pos_cdi' ? '(% do CDI)' : investmentFormData.rate_type === 'pos_ipca' ? '(IPCA + % a.a.)' : '(% a.a.)'}
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={investmentFormData.rate_value ?? ''}
                  onChange={(e) => setInvestmentFormData({ ...investmentFormData, rate_value: e.target.value })}
                  placeholder="3,65"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Taxa de Administração/Custódia (% a.a., opcional)</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={investmentFormData.fees_percentage ?? ''}
              onChange={(e) => setInvestmentFormData({ ...investmentFormData, fees_percentage: e.target.value })}
              placeholder="0,00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Data de Início</label>
              <Input
                type="date"
                value={investmentFormData.start_date}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, start_date: e.target.value })}
              />
              {investmentFormErrors.start_date && <p className="text-xs text-danger mt-1">{investmentFormErrors.start_date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Vencimento {investmentFormData.liquidity === 'daily' ? '(opcional)' : ''}</label>
              <Input
                type="date"
                value={investmentFormData.maturity_date ?? ''}
                onChange={(e) => setInvestmentFormData({ ...investmentFormData, maturity_date: e.target.value })}
              />
              {investmentFormErrors.maturity_date && <p className="text-xs text-danger mt-1">{investmentFormErrors.maturity_date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Liquidez</label>
            <div className="flex items-center gap-1 bg-bg border border-border p-1 rounded-md">
              {(['daily', 'at_maturity'] as Liquidity[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setInvestmentFormData({ ...investmentFormData, liquidity: l })}
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    investmentFormData.liquidity === l
                      ? l === 'daily'
                        ? 'bg-success-soft text-success'
                        : 'bg-warning-soft text-warning'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {LIQUIDITY_LABELS[l]}
                </button>
              ))}
            </div>
            <p className="text-xs text-ink-faint mt-1">
              {investmentFormData.liquidity === 'daily'
                ? 'Pode ser resgatado a qualquer momento — conta como Reserva Financeira.'
                : 'Preso até o vencimento — não conta como Reserva Financeira, mesmo sendo baixo risco.'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Situação</label>
            <div className="flex items-center gap-1 bg-bg border border-border p-1 rounded-md">
              {(['active', 'redeemed'] as InvestmentStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setInvestmentFormData({ ...investmentFormData, status: s })}
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    investmentFormData.status === s ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {INVESTMENT_STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Notas</label>
            <Input
              type="text"
              value={investmentFormData.notes}
              onChange={(e) => setInvestmentFormData({ ...investmentFormData, notes: e.target.value })}
              placeholder="Observações (opcional)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={closeInvestmentModal}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submittingInvestment}>
              {submittingInvestment && <Loader2 className="animate-spin" size={16} />}
              {editingInvestment ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

type SummaryTone = 'success' | 'danger' | 'accent' | 'warning';

const SUMMARY_TONE_CLASSES: Record<SummaryTone, string> = {
  success: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
  accent: 'bg-accent-soft text-accent-hover dark:text-ink',
  warning: 'bg-warning-soft text-warning',
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  tone: SummaryTone;
  period: string;
  badge?: { text: string; tone: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' };
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, tone, period, badge }) => (
  <Card className="p-5" hoverable>
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2.5 rounded-md w-fit ${SUMMARY_TONE_CLASSES[tone]}`}>
        <Icon size={20} />
      </div>
      {badge && (
        <Badge tone={badge.tone} className="whitespace-nowrap">
          {badge.text}
        </Badge>
      )}
    </div>
    <h3 className="text-xl font-semibold text-ink mb-1">{value}</h3>
    <p className="text-sm text-ink-muted">{title}</p>
    <p className="text-xs text-ink-faint mt-2">{period}</p>
  </Card>
);

interface ReportCardProps {
  title: string;
  description: string;
  onGenerate?: () => void;
  disabled?: boolean;
  comingSoon?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, onGenerate, disabled, comingSoon }) => (
  <Card className={`p-5 ${comingSoon ? 'opacity-60' : ''}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <Download size={18} className="text-ink-faint" />
    </div>
    <p className="text-sm text-ink-muted mb-4">{description}</p>
    {comingSoon ? (
      <span className="block w-full text-center bg-bg border border-border text-ink-faint py-2 rounded-md text-sm font-medium cursor-not-allowed">Em breve</span>
    ) : (
      <Button className="w-full" onClick={onGenerate} disabled={disabled}>
        Gerar Relatório
      </Button>
    )}
  </Card>
);

export default Finances;
