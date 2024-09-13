import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getUserEvents, type PublicUser } from '@/actions/users';
import { UserActions } from '@/components/molecules/users/user-actions';
import { TableCell, TableRow } from '@/components/ui/table';

interface Props {
  user: PublicUser;
}

export const UserRow = async ({ user }: Props): Promise<JSX.Element> => {
  dayjs.extend(localizedFormat);

  const userEvents = await getUserEvents(user.id);

  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell className="hidden md:table-cell">
        {dayjs(user.createdAt).format('lll')}
      </TableCell>
      <TableCell className="flex items-end">
        <UserActions userEvents={userEvents} />
      </TableCell>
    </TableRow>
  );
};
