//will be use createAyncThunk function to call backend to store data into database
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
      return response.data;
    } catch (error) {
      console.log();
    }
  }
);

//initial state of users from reg form
const initialState = {
  user: {},
  username: "",
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
        state.username = "test";
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

export default userRegistrationSlice.reducer;
