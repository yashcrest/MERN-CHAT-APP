// this is the initial setup for configuring the redux store which will have different slices to make it available in react globally.
import { configureStore } from "@reduxjs/toolkit";
import userRegistrationSlice from "./action/userRegistrationSlice";

export const store = configureStore({
  reducer: {
    userDetails: userRegistrationSlice,
  },
});
