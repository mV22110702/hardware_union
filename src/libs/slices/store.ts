import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from '~/libs/slices/products/productsSlice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { LogMiddleware } from '~/libs/slices/log-middleware.ts';
import { currencySlice } from '~/libs/slices/currency/currencySlice.ts';
import { authSlice } from '~/libs/slices/auth/authSlice.ts';
import { historySlice } from '~/libs/slices/history/historySlice.ts';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [currencySlice.name]: currencySlice.reducer,
  [historySlice.name]: historySlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
});

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [currencySlice.name]: currencySlice.reducer,
    [historySlice.name]: historySlice.reducer,
    [productsSlice.name]: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LogMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
