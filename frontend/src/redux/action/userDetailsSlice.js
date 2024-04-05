//will be use createAyncThunk function to call backend to store data into database
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//function to call backend api to store new users data
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//this is the initial state of users from reg form
const initialState = {
  username: null,
  email: null,
  password: null,
};

export const userDetailsSlice = createSlice({
  name: "user",
  initialState,
  //now i need to figure out what reducers are needed
  reducers: {},
});

//all the reducers - methods to be exported from here to be used in other components
export const {} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
