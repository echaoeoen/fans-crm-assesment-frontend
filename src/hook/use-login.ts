import { useState } from 'react';
import { useRequest } from './use-request';
import { useNavigate } from 'react-router-dom';
import { useTokenStore } from '../store/reducer/token-reducer';

export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { setToken, setUser } = useTokenStore();
  const { loading, client, errorMessage } = useRequest();
  const doLogin = async () => {
    const result = await client.post('/v1/login', {
      email,
      password,
    });
    if (result) {
      setToken(result.data.token);
      setUser(result.data.userData);
      navigate('/');
    }
  };
  return {
    email,
    password,
    loading,
    doLogin,
    errorMessage,
    setEmail,
    setPassword,
  };
};
