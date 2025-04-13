import NotificationList from './NotificationList';
import TextInput from '../common/TextInput';
import { Card } from '../common/Card';
import { SearchIcon } from 'lucide-react';

const NotificationsSearch = () => {
  return (
    <Card>
      <Card>
        <Card className="h-[500px] w-[440px] overflow-scroll bg-white">
          <h1 className="mb-4 text-3xl font-semibold text-black">History</h1>
          <div className="mb-6">
            <TextInput
              placeholder="Search"
              prefix={<SearchIcon size={20} />}
              data-testid="search-input"
              aria-label="Search transactions"
              onChange={() => {}}
            />
          </div>
          <NotificationList />
        </Card>
      </Card>
    </Card>
  );
};

export default NotificationsSearch;
