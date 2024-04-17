import "./styles.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Chat,
  PageNotFound,
  Layout,
} from "./components/Pages";
import RequireAuth from "./utils/RequireAuth";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PageNotFound />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
