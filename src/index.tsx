import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '~/libs/components/components';
import { AuthContextProvider } from '~/libs/components/auth-context-provider/auth-context-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </React.StrictMode>,
);
