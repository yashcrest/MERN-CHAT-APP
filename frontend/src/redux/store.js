// this is the initial setup for configuring the redux store which will have different slices to make it available in react globally.
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./action/apiSlice";
import authReducer from "./action/authSlice";
import conversationReducer from "./action/messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    selectedConversation: conversationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // this middleware functions is used to make the backend API call
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
