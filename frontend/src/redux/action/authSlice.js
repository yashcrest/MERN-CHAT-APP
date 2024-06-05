/*
Main objective:
- User authenticated or not
- Session expired
- current user

calling the backend will be handled in apiSlice file and this will only handle authentication logic, and maintain the state of user logged in or not.
*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("jwtToken")
    ? JSON.parse(localStorage.getItem("jwtToken"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("jwtToken", JSON.stringify(action.payload.token));
    },
    logOut: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("jwtToken");
    },
  },
});
export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;
