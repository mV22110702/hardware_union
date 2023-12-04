import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '~/libs/components/router/router.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalProviders } from '~/libs/components/modal-providers/modal-providers.tsx';
import { Provider } from 'react-redux';
import { store } from '~/libs/slices/store.ts';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <ModalProviders>
        <Router />
      </ModalProviders>
    </Provider>
  </React.StrictMode>,
);
