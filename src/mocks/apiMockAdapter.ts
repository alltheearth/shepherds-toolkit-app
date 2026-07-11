import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { createMockCollection } from './createMockCollection';
import { sermonsSeed, type MockSermon } from './sermonsMockData';
import { eventsSeed, type MockEvent } from './eventsMockData';
import { searchBibleReferenceMock } from './bibleReferenceMock';

type MockRouteContext = {
  method: string;
  segments: string[];
  body: any;
  params: Record<string, any>;
};

type MockRoute = {
  test: (segments: string[], method: string) => boolean;
  handler: (ctx: MockRouteContext) => any;
};

const sermons = createMockCollection<MockSermon>(sermonsSeed);
const events = createMockCollection<MockEvent>(eventsSeed);

const routes: MockRoute[] = [
  {
    test: (segments, method) => segments[0] === 'sermons' && segments.length === 1 && method === 'GET',
    handler: () => ({ results: sermons.list() }),
  },
  {
    test: (segments, method) => segments[0] === 'sermons' && segments.length === 1 && method === 'POST',
    handler: ({ body }) => sermons.create(body),
  },
  {
    test: (segments, method) => segments[0] === 'sermons' && segments.length === 2 && (method === 'PUT' || method === 'PATCH'),
    handler: ({ segments, body }) => sermons.update(segments[1], body),
  },
  {
    test: (segments, method) => segments[0] === 'sermons' && segments.length === 2 && method === 'DELETE',
    handler: ({ segments }) => {
      sermons.remove(segments[1]);
      return null;
    },
  },
  {
    test: (segments, method) => segments[0] === 'events' && segments.length === 1 && method === 'GET',
    handler: () => ({ results: events.list() }),
  },
  {
    test: (segments, method) => segments[0] === 'events' && segments.length === 1 && method === 'POST',
    handler: ({ body }) => events.create(body),
  },
  {
    test: (segments, method) => segments[0] === 'events' && segments.length === 2 && (method === 'PUT' || method === 'PATCH'),
    handler: ({ segments, body }) => events.update(segments[1], body),
  },
  {
    test: (segments, method) => segments[0] === 'events' && segments.length === 2 && method === 'DELETE',
    handler: ({ segments }) => {
      events.remove(segments[1]);
      return null;
    },
  },
  {
    test: (segments, method) =>
      segments[0] === 'bible' && segments[1] === 'verses' && segments[2] === 'by_reference' && method === 'GET',
    handler: ({ params }) => searchBibleReferenceMock(params?.q || '', params?.version || 'ACF'),
  },
];

const parseBody = (data: unknown) => {
  if (!data) return undefined;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  return data;
};

export const createApiMockAdapter = (delay = 350): AxiosAdapter => {
  return (config: InternalAxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const method = (config.method || 'get').toUpperCase();
        const path = (config.url || '').split('?')[0];
        const segments = path.split('/').filter(Boolean);
        const body = parseBody(config.data);

        const route = routes.find((r) => r.test(segments, method));

        if (!route) {
          reject({
            response: {
              status: 404,
              statusText: 'Not Found',
              data: { detail: `Mock route not found: ${method} ${path}` },
              headers: {},
              config,
            },
            config,
            isAxiosError: true,
          });
          return;
        }

        try {
          const data = route.handler({ method, segments, body, params: config.params || {} });
          const response: AxiosResponse = {
            data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          } as AxiosResponse;
          resolve(response);
        } catch (error: any) {
          reject({
            response: {
              status: 400,
              statusText: 'Bad Request',
              data: { detail: error?.message || 'Mock handler error' },
              headers: {},
              config,
            },
            config,
            isAxiosError: true,
          });
        }
      }, delay);
    });
  };
};
