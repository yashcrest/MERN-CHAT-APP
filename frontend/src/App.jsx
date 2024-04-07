import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Chat, PageNotFound } from "./components/Pages";
import ProtectedRoute from "./utils/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 404 page not found for any other pages */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
