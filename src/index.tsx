import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '~/libs/components/router/router.tsx';
import { AuthContextProvider } from '~/libs/components/auth-context-provider/auth-context-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChosenProductsProvider } from '~/libs/components/chosen-products-provider/chosen-products-provider';
import { ChosenCurrencyProvider } from '~/libs/components/chosen-currency-provider/chosen-currency-provider';
import { HistoryLogContextProvider } from '~/libs/components/history-log-context-provider/history-log-context-provider.tsx';
import { ModalProviders } from '~/libs/components/modal-providers/modal-providers.tsx';
import { ProductsProvider } from '~/libs/components/products-provider.tsx';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ToastContainer />
    <ProductsProvider>
      <ChosenCurrencyProvider>
        <ChosenProductsProvider>
          <AuthContextProvider>
            <HistoryLogContextProvider>
              <ModalProviders>
                <Router />
              </ModalProviders>
            </HistoryLogContextProvider>
          </AuthContextProvider>
        </ChosenProductsProvider>
      </ChosenCurrencyProvider>
    </ProductsProvider>
  </React.StrictMode>,
);
