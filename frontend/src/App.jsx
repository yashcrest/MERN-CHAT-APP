import "./styles.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Login,
  Register,
  Chat,
  PageNotFound,
  Layout,
  Profile,
} from "./components";
import RequireAuth from "./components/RequireAuth";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={userInfo ? <Navigate to="/chat" /> : <Login />} />
        <Route
          path="/login"
          element={userInfo ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/register"
          element={userInfo ? <Navigate to="/chat" /> : <Register />}
        />
        <Route path="/*" element={<PageNotFound />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
