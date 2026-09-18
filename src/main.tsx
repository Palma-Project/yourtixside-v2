import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {LanguageProvider} from './i18n/LanguageContext';
import {AppStoreProvider} from './store/AppStore';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStoreProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AppStoreProvider>
  </StrictMode>,
);
