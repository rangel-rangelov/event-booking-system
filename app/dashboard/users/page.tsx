import { getAllUsersAction } from '@/actions/users';
import { UsersTable } from '@/components/organisms/users/user-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Events = async (): Promise<JSX.Element> => {
  const users = await getAllUsersAction();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage all your users.</CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable users={users} />
      </CardContent>
    </Card>
  );
};

export default Events;
