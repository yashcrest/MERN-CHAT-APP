import { createSlice } from "@reduxjs/toolkit";

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
