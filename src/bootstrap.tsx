import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AppThemeProvider } from './providers/theme-provider';
import { store } from 'enterprise_data/Store';
import { GlobalToastContainer } from 'enterprise_ui/molecules';
import { setBrand } from 'enterprise_data/Brand';
import { Brand } from './types/brand';

declare global {
  interface Window {
    __brandConfig?: Brand;
    __POWERED_BY_SHELL__?: boolean;
  }
}

window.__POWERED_BY_SHELL__ = true;

const initialBrand = window.__brandConfig;

if (initialBrand) {
  setBrand(initialBrand);
}

const rootElement = document.getElementById('host-root');

if (!rootElement) {
  throw new Error('Root element #host-root was not found');
}

const root = ReactDOM.createRoot(rootElement);

const Root: React.FC = () => {
  return (
    <Provider store={store as any}>
      <BrowserRouter>
        <GlobalToastContainer />
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

root.render(<Root />);
