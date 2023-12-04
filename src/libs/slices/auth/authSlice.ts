import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginActionDto = { token: string };
export type SignUpActionDto = { token: string };
export type AuthSlice = {
  isAuthorized: boolean;
  token: string | null;
};
const initialState: AuthSlice = {
  isAuthorized: false,
  token: localStorage.getItem('token'),
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<LoginActionDto>) {
      state.isAuthorized = true;
      state.token = action.payload.token;
    },
    signUp(state, action: PayloadAction<SignUpActionDto>) {
      state.isAuthorized = true;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.isAuthorized = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { signUp, logOut, signIn } = authSlice.actions;
