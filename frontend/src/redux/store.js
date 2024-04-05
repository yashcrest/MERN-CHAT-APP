// this is the initial setup for configuring the redux store which will have different slices to make it available in react globally.
import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./action/userDetailsSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsSlice,
  },
});
