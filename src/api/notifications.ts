import { BaseNotification } from '../types/notifications';

const API_CONFIG = {
  baseUrl: 'http://localhost:5000',
  endpoints: {
    search: '/search',
  },
  timeoutMs: 10000,
};

export class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeout = API_CONFIG.timeoutMs
): Promise<T> {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new APIError(`API error: ${response.statusText}`, response.status);
    }
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new APIError('Request timeout', 408);
    }
    throw new APIError(`Network error: ${(error as Error).message}`, 0);
  }
}

export const fetchNotifications = async (query: string = ''): Promise<BaseNotification[]> => {
  try {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.search}?q=${encodeURIComponent(query)}`;
    const data: BaseNotification[] = await fetchWithTimeout(url);
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};
