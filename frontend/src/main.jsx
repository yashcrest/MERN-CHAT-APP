import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// making redux state available globally
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./contexts/themeContext.jsx";
import { SocketContextProvider } from "./contexts/SocketContext.jsx";

//wrapping up App componenet inside of BrowserRouter
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <SocketContextProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ThemeProvider>
        </SocketContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
