import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyValues } from '~/libs/types/currency-values.type.ts';
import { Currency } from '~/libs/enums/enums.ts';
import { RootState } from '~/libs/slices/store.ts';

export type CurrencySlice = {
  chosenCurrency: CurrencyValues;
};
const initialState: CurrencySlice = {
  chosenCurrency: Currency.UAH,
};
export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrency(state, action: PayloadAction<CurrencyValues>) {
      state.chosenCurrency = action.payload;
    },
  },
});

export const { changeCurrency } = currencySlice.actions;

export const selectChosenCurrency = (state: RootState) =>
  state.currency.chosenCurrency;
