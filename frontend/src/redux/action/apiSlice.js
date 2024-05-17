// this slice is dedicated to make backend api calls for sending users login details
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // this is a base query send out to backend for authentication
  tagTypes: ["User", "Messages", "Conversation"],
  endpoints: (builder) => ({}),
});
