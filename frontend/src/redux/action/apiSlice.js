// this slice is dedicated to make backend api calls for sending users login details
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// this is a base query send out to backend for authentication
const baseQuery = fetchBaseQuery({
  baseUrl: "", //this is empty because we proxy setup in vite.config.js
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // sending access token to backend for verifying the user session has not expired
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
