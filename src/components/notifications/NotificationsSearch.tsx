import NotificationList from './NotificationList';
import TextInput from '../common/TextInput';
import { Card } from '../common/Card';

const NotificationsSearch = () => {
  return (
    <Card>
      <Card>
        <Card className="h-[500px] w-[440px] overflow-scroll bg-white">
          <h1 className="mb-4 text-3xl font-semibold text-black">History</h1>
          <TextInput onChange={() => {}} />
          <NotificationList />
        </Card>
      </Card>
    </Card>
  );
};

export default NotificationsSearch;
