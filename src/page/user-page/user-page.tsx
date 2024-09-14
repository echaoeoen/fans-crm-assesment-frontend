import React from 'react';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useUser } from '../../hook/use-user';
import UserTable from './component/user-table';
import { TextField } from '../../component/form/text-field';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import UserFormModal from './component/user-form-modal';
export default function UserPage() {
  const { loading, page, setPage, size, users, getUser, search, setSearch } =
    useUser();
  const reset = () => {
    setPage(1);
    setSearch(undefined);
    getUser();
  };
  return (
    <>
      <Flex gap="3">
        <Box flexGrow={'1'}>
          <Text size="5">User Data</Text>
        </Box>
        <Flex gap="3">
          <TextField
            placeholder="Search user"
            icon={<MagnifyingGlassIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                getUser();
              }
            }}
            button={
              <Button
                variant="ghost"
                onClick={() => {
                  setPage(1);
                  getUser();
                }}
              >
                Search
              </Button>
            }
          />
          <UserFormModal onSuccess={reset} />
        </Flex>
      </Flex>
      <UserTable
        items={users.data}
        loading={loading}
        page={page}
        onPageChange={setPage}
        size={size}
        totalPages={users.totalPages}
      />
    </>
  );
}
