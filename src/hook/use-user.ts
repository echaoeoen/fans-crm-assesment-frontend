import { useEffect, useState } from 'react';
import { Paginated } from '../type/paginated';
import { User } from '../type/user';
import { useRequest } from './use-request';
import { usePagination } from './use-pagination';

export const useUser = () => {
  const { page, setPage, size, setSize } = usePagination();
  const [search, setSearch] = useState<string>();
  const [users, setUsers] = useState<Paginated<User>>({
    data: [],
    page: 0,
    size: 0,
    total: 0,
    totalPages: 0,
  });
  const { client, errorMessage, loading } = useRequest();
  useEffect(() => {
    getUser();
  }, [page, size]);

  const getUser = async () => {
    const result = await client.get<Paginated<User>>('/v1/users', {
      params: {
        page,
        size,
        name: search,
      },
    });
    if (result) {
      setUsers(result.data);
    }
  };
  return {
    getUser,
    errorMessage,
    loading,
    page,
    setPage,
    size,
    users,
    setSize,
    search,
    setSearch,
  };
};

export const useCreateUser = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
  }>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const { loading, client, errorMessage } = useRequest();
  const createUser = async () => {
    if (loading) return;
    const result = await client.post('/v1/users', user);
    if (result) {
      setUser({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
    }
    return result;
  };
  return { createUser, loading, user, setUser, errorMessage };
};
