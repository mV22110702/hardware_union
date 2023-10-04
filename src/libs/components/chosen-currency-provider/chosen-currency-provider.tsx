import { createContext, PropsWithChildren, useState } from 'react';
import { CurrencyValues } from '~/libs/types/currency-values.type';
import { Currency } from '~/libs/enums/currency.enum';

const ChosenCurrencyContext = createContext<{
  chosenCurrency: CurrencyValues;
  setChosenCurrency: React.Dispatch<React.SetStateAction<CurrencyValues>>;
} | null>(null);

type Properties = PropsWithChildren;

const ChosenCurrencyProvider: React.FC<Properties> = ({ children }) => {
  const [chosenCurrency, setChosenCurrency] = useState<CurrencyValues>(
    Currency.UAH,
  );

  return (
    <ChosenCurrencyContext.Provider
      value={{ chosenCurrency, setChosenCurrency }}
    >
      {children}
    </ChosenCurrencyContext.Provider>
  );
};

export { ChosenCurrencyProvider, ChosenCurrencyContext };
