import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/path" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
