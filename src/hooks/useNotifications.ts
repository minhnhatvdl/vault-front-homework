import { useCallback, useEffect, useReducer, useState, useRef, useMemo } from 'react';
import { fetchNotifications } from '../api/notifications';
import { BaseNotification } from '../types/notifications';

const DEBOUNCE_DELAY = 500;

const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
} as const;

type ActionType =
  | { type: typeof ACTIONS.FETCH_START }
  | { type: typeof ACTIONS.FETCH_SUCCESS; payload: BaseNotification[] }
  | { type: typeof ACTIONS.FETCH_ERROR; payload: string }
  | { type: typeof ACTIONS.SET_SEARCH_TERM; payload: string };

interface NotificationState {
  notifications: BaseNotification[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: true,
  error: null,
  searchTerm: '',
};

function notificationsReducer(state: NotificationState, action: ActionType): NotificationState {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: action.payload,
      };
    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
}

export function useNotifications() {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const initialLoadCompletedRef = useRef(false);

  const prevSearchTermRef = useRef('');

  const fetchStart = useCallback(() => dispatch({ type: ACTIONS.FETCH_START }), []);
  const fetchSuccess = useCallback(
    (data: BaseNotification[]) => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data }),
    []
  );
  const fetchError = useCallback(
    (message: string) => dispatch({ type: ACTIONS.FETCH_ERROR, payload: message }),
    []
  );
  const setSearchTerm = useCallback(
    (term: string) => dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term }),
    []
  );

  const actions = useMemo(
    () => ({
      fetchStart,
      fetchSuccess,
      fetchError,
      setSearchTerm,
    }),
    [fetchStart, fetchSuccess, fetchError, setSearchTerm]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(state.searchTerm);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [state.searchTerm]);

  const loadNotifications = useCallback(
    async (force = false) => {
      if (
        !force &&
        ((isFocused && !debouncedSearchTerm) || debouncedSearchTerm === prevSearchTermRef.current)
      ) {
        return;
      }
      prevSearchTermRef.current = debouncedSearchTerm;
      actions.fetchStart();
      try {
        const data = await fetchNotifications(debouncedSearchTerm);
        actions.fetchSuccess(data);
        if (!initialLoadCompletedRef.current) {
          initialLoadCompletedRef.current = true;
        }
      } catch (err) {
        actions.fetchError('Failed to load notifications. Please try again.');
        console.error('Error fetching notifications:', err);
      }
    },
    [debouncedSearchTerm, isFocused, actions]
  );

  useEffect(() => {
    if (!initialLoadCompletedRef.current) {
      loadNotifications(true);
    }
  }, [loadNotifications]);

  useEffect(() => {
    if (initialLoadCompletedRef.current) {
      loadNotifications();
    }
  }, [debouncedSearchTerm, loadNotifications]);

  return {
    notifications: state.notifications,
    isLoading: state.isLoading,
    error: state.error,
    searchTerm: state.searchTerm,
    setSearchTerm,
    setFocused: setIsFocused,
    refreshNotifications: (force = false) => loadNotifications(force),
    isFocused,
  };
}
