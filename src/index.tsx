import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '~/libs/components/components';
import { AuthContextProvider } from '~/libs/components/auth-context-provider/auth-context-provider';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <React.StrictMode>
    <ToastContainer />
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </React.StrictMode>,
);

