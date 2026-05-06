import React, { use } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppThemeProvider } from './providers/theme-provider';
import { store } from 'enterprise_data/Store';
import { GlobalToastContainer } from 'enterprise_ui/molecules';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('host-root')!);

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
