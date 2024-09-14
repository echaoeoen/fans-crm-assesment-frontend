import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenStore } from '../store/reducer/token-reducer';

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
export const useRequest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>();
  const { token } = useTokenStore();
  const client = request;
  client.interceptors.request.clear();
  client.interceptors.request.use((config) => {
    setLoading(true);
    setErrorMessage([]);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  client.interceptors.response.clear();
  client.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error: AxiosError<{ message: string }>) => {
      if (error.status === 401) {
        navigate('/login');
      }
      setLoading(false);
      setErrorMessage(
        error.response?.data?.message
          ? Array.isArray(error.response?.data?.message)
            ? error.response?.data?.message
            : [error.response?.data?.message]
          : ['Something went wrong'],
      );
      return;
    },
  );

  return { client, loading, errorMessage };
};
