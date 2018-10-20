import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./components/App";

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
