import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// making redux state available globally
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
