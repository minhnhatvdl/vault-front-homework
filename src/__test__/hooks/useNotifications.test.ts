import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '../../hooks/useNotifications';
import { fetchNotifications } from '../../api/notifications';
import { BaseNotification } from '../../types/notifications';

jest.mock('../../api/notifications');

const mockedFetchNotifications = fetchNotifications as jest.MockedFunction<
  typeof fetchNotifications
>;

describe('useNotifications Hook', () => {
  const mockNotifications: BaseNotification[] = [
    {
      id: 1,
      type: 'TRANSACTION_RECEIVED',
      data: { id: 1, amount: 0.5, unit: 'ETH', from: '0x123...', to: '0x456...' },
    },
    {
      id: 2,
      type: 'TRANSACTION_SENT',
      data: { id: 2, amount: 1.2, unit: 'BTC', from: '0x456...', to: '0x789...' },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetchNotifications.mockResolvedValue(mockNotifications);

    jest.useFakeTimers({ legacyFakeTimers: false });

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should fetch notifications on initial load', async () => {
    const { result } = renderHook(() => useNotifications());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await Promise.resolve();
      await jest.runAllTimersAsync();
    });

    expect(mockedFetchNotifications).toHaveBeenCalledWith('');
    expect(result.current.notifications).toEqual(mockNotifications);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('should update search term and debounce search', async () => {
    const { result } = renderHook(() => useNotifications());

    await act(async () => {
      await Promise.resolve();
      await jest.runAllTimersAsync();
    });

    mockedFetchNotifications.mockClear();

    await act(async () => {
      result.current.setSearchTerm('test');
      await Promise.resolve();
    });

    expect(result.current.searchTerm).toBe('test');

    expect(mockedFetchNotifications).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(500);
      await Promise.resolve();
      await jest.runAllTimersAsync();
    });

    expect(mockedFetchNotifications).toHaveBeenCalledWith('test');
  });
});
