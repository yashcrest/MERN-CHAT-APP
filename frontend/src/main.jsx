import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// making redux state available globally
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//wrapping up App componenet inside of BrowserRouter
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
