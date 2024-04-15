// this slice is dedicated to make backend api calls for sending users login details
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./authSlice";

// server details
const serverPort = "3000";
const serverBaseURL = `http://localhost:${serverPort}/api`;

// this is a base query send out to backend for authentication
const baseQuery = fetchBaseQuery({
  baseUrl: serverBaseURL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // sending access token to backend for verifying the user session has not expired
    const token = getState().auth.token;
    if (token) {
      headers.set("authrization", `Bearer ${token}`);
    }
    return headers;
  },
});

// this is a wrapper for the baseQuery to get a newAccess token, if the current token has expired
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if the access is forbidden i.e. 403 status
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store new token in redux
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
