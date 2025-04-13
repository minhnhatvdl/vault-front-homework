import { API_CONFIG, fetchNotifications } from '../../api/notifications';
import { BaseNotification } from '../../types/notifications';

describe('Notifications API', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

    jest.useFakeTimers();
  });

  afterEach(() => {
    global.fetch = originalFetch;

    jest.useRealTimers();
  });

  test('should fetch notifications successfully', async () => {
    const mockData: BaseNotification[] = [
      {
        id: 1,
        type: 'TRANSACTION_RECEIVED',
        data: { id: 1, amount: 0.5, unit: 'ETH', from: '0x123...', to: '0x456...' },
      },
    ];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const result = await fetchNotifications();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.search}?q=`,
      expect.objectContaining({ signal: expect.anything() })
    );
    expect(result).toEqual(mockData);
  });

  test('should fetch notifications with query parameter', async () => {
    const mockData: BaseNotification[] = [
      {
        id: 1,
        type: 'TRANSACTION_RECEIVED',
        data: { id: 1, amount: 0.5, unit: 'ETH', from: '0x123...', to: '0x456...' },
      },
    ];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const result = await fetchNotifications('eth');

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.search}?q=eth`,
      expect.objectContaining({ signal: expect.anything() })
    );
    expect(result).toEqual(mockData);
  });
});
