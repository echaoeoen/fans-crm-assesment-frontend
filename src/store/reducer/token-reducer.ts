import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hook';
import { User } from '../../type/user';
const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';

interface TokenProps {
  token?: string;
  user?: User;
}

const initialState: TokenProps = {
  token: localStorage.getItem(TOKEN_STORAGE_KEY) || '',
  user: localStorage.getItem(USER_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '')
    : undefined,
};

const pageSlice = createSlice({
  name: 'token-reducer',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem(TOKEN_STORAGE_KEY, action.payload);
    },
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    },
  },
});

const { setToken, setUser } = pageSlice.actions;

export const useTokenStore = () => {
  const dispatch = useAppDispatch();
  const states = useAppSelector((state) => state.tokenReducer);
  return {
    ...states,
    setToken: (token: string) => dispatch(setToken(token)),
    setUser: (user?: User) => dispatch(setUser(user)),
  };
};

export default pageSlice.reducer;
