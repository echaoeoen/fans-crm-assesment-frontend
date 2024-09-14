import React from 'react';
import TablePagination, {
  TablePaginationProps,
} from '../../../component/pagination/table-pagination';
import { User } from '../../../type/user';
import { Spinner } from '@radix-ui/themes';
export interface UserTableProps extends TablePaginationProps {
  items: User[];
  loading?: boolean;
}
export default function UserTable({
  items,
  onPageChange,
  page,
  size,
  totalPages,
  loading,
}: UserTableProps) {
  return (
    <div
      data-testid="user-table"
      className={`relative w-full overflow-x-auto shadow-md sm:rounded-lg  ${loading && 'animate-pulse'}`}
    >
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((user) => (
            <tr
              className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              key={user.id}
            >
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <div className="flex w-full justify-center">
          <Spinner className="my-4 flex h-8 w-8 fill-primary-600 text-white" />
        </div>
      )}
      <TablePagination
        page={page}
        size={size}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
