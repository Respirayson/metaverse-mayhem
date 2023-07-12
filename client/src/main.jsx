import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { TradingCardMinterProvider } from './context/TradingCardMinter.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <TradingCardMinterProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </TradingCardMinterProvider>,
);
