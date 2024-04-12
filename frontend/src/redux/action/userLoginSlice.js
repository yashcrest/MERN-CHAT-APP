import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  password: "",
};
export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
});

export default userLoginSlice.reducer;
