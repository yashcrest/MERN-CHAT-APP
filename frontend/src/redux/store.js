// this is the initial setup for configuring the redux store which will have different slices to make it available in react globally.
import { configureStore } from "@reduxjs/toolkit";
import userRegistrationSlice from "./action/authSlice";
import { apiSlice } from "./action/apiSlice";
import authReducer from "./action/authSlice";

export const store = configureStore({
  reducer: {
    userDetails: userRegistrationSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  // this middleware functions is used to make the backend API call
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
