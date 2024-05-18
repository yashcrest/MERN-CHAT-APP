import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMessage: localStorage.getItem("selectedMessage")
    ? JSON.parse(localStorage.getItem("selectedMessage"))
    : null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;
      localStorage.setItem("selectedMessage", JSON.stringify(action.payload));
    },
  },
});

export default messageSlice.reducer;
export const { setSelectedMessage } = messageSlice.actions;
