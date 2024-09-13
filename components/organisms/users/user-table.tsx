import { UserRow } from '@/components/molecules/users/user-row';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { PublicUser } from '@/actions/users';

interface Props {
  users: PublicUser[];
}

export const UsersTable = ({ users }: Props): JSX.Element => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <UserRow user={user} key={user.id} />
        ))}
      </TableBody>
    </Table>
  );
};
