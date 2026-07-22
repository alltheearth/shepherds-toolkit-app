import api from './api';

export const startCheckout = async (): Promise<void> => {
  const response = await api.post<{ checkout_url: string }>('/ai/billing/checkout/');
  window.location.href = response.data.checkout_url;
};

export const openBillingPortal = async (): Promise<void> => {
  const response = await api.post<{ portal_url: string }>('/ai/billing/portal/');
  window.location.href = response.data.portal_url;
};
