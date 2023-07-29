import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom' (not 'react-dom/client')
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './App'; // Import the main App component
import './index.css';
import store, { persistor } from './redux/store.js'; // Import Redux store and persistor
import { TradingCardMinterProvider } from './context/TradingCardMinter';
import { NftMarketplaceProvider } from './context/NftMarketplace';

import { WebProvider } from './context/WebContext';

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app components with context providers
root.render(
  <WebProvider>
    {/* Wrap the App component with TradingCardMinterProvider */}
    <TradingCardMinterProvider>
      {/* Wrap the App component with NftMarketplaceProvider */}
      <NftMarketplaceProvider>
        {/* Wrap the App component with Redux Provider */}
        <Provider store={store}>
          {/* Wrap the App component with Redux PersistGate */}
          <PersistGate loading={null} persistor={persistor}>
            {/* Wrap the App component with BrowserRouter */}
            <BrowserRouter>
              {/* Render the main App component */}
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </NftMarketplaceProvider>
    </TradingCardMinterProvider>
  </WebProvider>,
);
