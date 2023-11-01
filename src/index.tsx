import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '~/libs/components/router/router.tsx';
import { AuthContextProvider } from '~/libs/components/auth-context-provider/auth-context-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChosenProductsProvider } from '~/libs/components/chosen-products-provider/chosen-products-provider';
import { ChosenCurrencyProvider } from '~/libs/components/chosen-currency-provider/chosen-currency-provider';
import { HistoryLogContextProvider } from '~/libs/components/history-log-context-provider/history-log-context-provider.tsx';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ToastContainer />
    <ChosenCurrencyProvider>
      <ChosenProductsProvider>
        <AuthContextProvider>
          <HistoryLogContextProvider>
            <Router />
          </HistoryLogContextProvider>
        </AuthContextProvider>
      </ChosenProductsProvider>
    </ChosenCurrencyProvider>
  </React.StrictMode>,
);
