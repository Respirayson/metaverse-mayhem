import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store, { persistor } from "./redux/store.js";
import { TradingCardMinterProvider } from "./context/TradingCardMinter";
import { NftMarketplaceProvider } from "./context/NftMarketplace";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
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
);
