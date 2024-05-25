import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: localStorage.getItem("selectedConversation")
    ? JSON.parse(localStorage.getItem("selectedConversation"))
    : null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
      localStorage.setItem(
        "selectedConversation",
        JSON.stringify(action.payload)
      );
    },
  },
});

export default messageSlice.reducer;
export const { setSelectedConversation } = messageSlice.actions;
