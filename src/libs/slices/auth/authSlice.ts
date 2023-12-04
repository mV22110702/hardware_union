import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/libs/slices/store.ts';

export type LoginActionDto = { token: string };
export type SignUpActionDto = { token: string };
export type AuthSlice = {
  token: string | null;
};
const initialState: AuthSlice = {
  token: localStorage.getItem('token'),
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<LoginActionDto>) {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    signUp(state, action: PayloadAction<SignUpActionDto>) {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logOut(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { signUp, logOut, signIn } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
