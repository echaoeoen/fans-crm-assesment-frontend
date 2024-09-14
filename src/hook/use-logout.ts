import { useNavigate } from 'react-router-dom';
import { useTokenStore } from '../store/reducer/token-reducer';

export const useLogout = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useTokenStore();
  const doLogout = () => {
    navigate('/login');
    setToken('');
    setUser(undefined);
  };
  return {
    doLogout,
  };
};
