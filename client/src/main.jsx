import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store.js';
import { TradingCardMinterProvider } from './context/TradingCardMinter';
import { NftMarketplaceProvider } from './context/NftMarketplace';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <TradingCardMinterProvider>
    <NftMarketplaceProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NftMarketplaceProvider>
  </TradingCardMinterProvider>,
);
