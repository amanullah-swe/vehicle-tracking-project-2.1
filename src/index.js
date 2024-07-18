import React, { Suspense, useState } from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppState from "./context/AppState";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./sharedComponent/MultiLang/i18n.js";
import "leaflet/dist/leaflet.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <AppState>
          <App />
        </AppState>
      </Provider>
    </Suspense>
  </BrowserRouter>
);
