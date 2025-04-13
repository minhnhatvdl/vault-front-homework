import { useRef, useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import NotificationList from './NotificationList';
import { useNotifications } from '../../hooks/useNotifications';
import TextInput from '../common/TextInput';
import { Card } from '../common/Card';

const NotificationsSearch = () => {
  const { notifications, isLoading, error, searchTerm, setSearchTerm, setFocused, isFocused } =
    useNotifications();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [displayResults, setDisplayResults] = useState(true);
  const [prevIsLoading, setPrevIsLoading] = useState(false);

  useEffect(() => {
    const searchRequestCompleted = prevIsLoading && !isLoading;
    if (searchRequestCompleted && searchTerm && isFocused) {
      setDisplayResults(true);
    }
    setPrevIsLoading(isLoading);
  }, [isLoading, prevIsLoading, searchTerm, isFocused]);

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    if (isFocused) {
      setDisplayResults(false);
    }
  };

  const handleInputFocus = () => {
    setFocused(true);
    setDisplayResults(false);
  };

  const handleInputBlur = () => {
    setFocused(false);
    setDisplayResults(true);
  };

  const shouldShowNotifications = !isLoading && (displayResults || !isFocused);

  return (
    <Card>
      <Card>
        <Card className="h-[500px] w-[440px] overflow-scroll bg-white">
          <h1 className="mb-4 text-3xl font-semibold text-black">History</h1>
          <div className="mb-6">
            <TextInput
              ref={searchInputRef}
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchInput}
              prefix={<SearchIcon size={20} />}
              isLoading={isLoading}
              data-testid="search-input"
              aria-label="Search transactions"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          {shouldShowNotifications && (
            <>
              {error ? (
                <div
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-600"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              ) : (
                <NotificationList notifications={notifications} />
              )}
            </>
          )}
        </Card>
      </Card>
    </Card>
  );
};

export default NotificationsSearch;
