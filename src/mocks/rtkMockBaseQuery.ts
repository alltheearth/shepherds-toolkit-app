import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

export type MockQueryArgs = {
  url: string;
  method?: string;
  body?: any;
  params?: Record<string, any>;
};

type ParsedRequest = {
  path: string;
  method: string;
  body: any;
  params: Record<string, string>;
  segments: string[];
};

export type RtkMockRoute = {
  test: (segments: string[], method: string) => boolean;
  handler: (req: ParsedRequest) => any;
};

const parseParams = (search: string): Record<string, string> => {
  const params: Record<string, string> = {};
  new URLSearchParams(search).forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export function createMockBaseQuery(
  routes: RtkMockRoute[],
  delay = 0
): BaseQueryFn<string | MockQueryArgs, unknown, { status: number; data: unknown }> {
  return async (args) => {
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));

    const isString = typeof args === 'string';
    const rawUrl = isString ? args : args.url;
    const method = ((isString ? 'GET' : args.method) || 'GET').toUpperCase();
    const body = isString ? undefined : args.body;
    const extraParams = isString ? undefined : args.params;

    const [path, search = ''] = rawUrl.split('?');
    const segments = path.split('/').filter(Boolean);
    const params = { ...parseParams(search), ...(extraParams || {}) };

    const route = routes.find((r) => r.test(segments, method));

    if (!route) {
      return { error: { status: 404, data: `Mock route not found: ${method} ${rawUrl}` } };
    }

    try {
      const data = route.handler({ path, method, body, params, segments });
      return { data };
    } catch (error: any) {
      return { error: { status: 400, data: error?.message || 'Mock handler error' } };
    }
  };
}
