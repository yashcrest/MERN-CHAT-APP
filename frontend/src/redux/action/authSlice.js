/*
Main objective:
- User authenticated ?
- Session expired
- current user

calling the backend will be handled in apiSlice file and this will only handle authentication logic, and maintain the state of user logged in or not.
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// server details
const serverPort = "3000";
const serverBaseURL = `http://localhost:${serverPort}/api`;

//function to call backend api to store new users data
export const registerUser = createAsyncThunk(
  "userDetail/registerUser",
  //sending data to backend
  async (userData) => {
    try {
      const response = await axios.post(`${serverBaseURL}/register`, userData);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// asyncThunk for user login
export const loginUser = createAsyncThunk(
  "userDetail/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(`${serverBaseURL}/login`, userData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log();
    }
  }
);

//initial state of users from reg form
const initialState = {
  user: {},
  loading: false,
  isLoggedIn: false,
  error: null,
};

//creating slice object
export const userRegistrationSlice = createSlice({
  name: "user",
  initialState,
  //now i need to figure out what reducers are needed
  reducers: {
    logout: (state, action) => {
      state.user = {};
      state.loading = false;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  //   reducers for aysncThunk
  extraReducers: (builder) => {
    builder
      // when api call to the backend is sucessfull
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.isLoggedIn = true;
      })
      // when api call is still pending
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      //when api call is failed
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload.message;
      });
  },
});

//all the reducers - methods to be exported from here to be used in other components
export const { logout } = userRegistrationSlice.actions;

// export default userRegistrationSlice.reducer;

// need to restructure and evaluate the things the states I need to manage for making authentication work i.e. handling sessions, tokens, user authentication

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, actionToken } = action.payload;
      state.user = user;
      state.token = actionToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
