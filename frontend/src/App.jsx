import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Chat, PageNotFound } from "./components/Pages";
import ProtectedRoute from "./utils/ProtectedRoute";
import routesConfig from "./utils/routesConfig";
function App() {
  return (
    <Router>
      <Routes>
        {routesConfig.map(
          ({ path, component: Component, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          )
        )}
      </Routes>
    </Router>
  );
}

export default App;
