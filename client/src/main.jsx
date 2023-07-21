import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store, { persistor } from './redux/store.js';
import { TradingCardMinterProvider } from './context/TradingCardMinter';
import { NftMarketplaceProvider } from './context/NftMarketplace';

import { WebProvider } from './context/WebContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <WebProvider>
    <TradingCardMinterProvider>
      <NftMarketplaceProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </NftMarketplaceProvider>
    </TradingCardMinterProvider>
  </WebProvider>,
);
