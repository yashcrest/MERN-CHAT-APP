// this slice is dedicated to make backend api calls for sending users login details
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const users_EndPoint = "/users"; //the rest of the URL is coming from vite.config.js
const messages_EndPoint = "/messages";
const sideBarconversation_EndPoint = "/sidebarconversations";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "/api",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState.auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// //if your access token gets expired we need to get a new access token from the backend using the refresh token, we will need to wrap our baseQuery.
// const baseQueryWithAuth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   // need to set this up in backend to send 403 status if the token send has expired
//   if (result?.error?.originalStatus === 403) {
//     console.log("sending refresh token");
//     // this endpoint has not been setup yet in my backend, is needed
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.userInfo;
//     }
//   }
// };

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["User", "Messages", "Conversation"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${users_EndPoint}/auth`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${users_EndPoint}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${users_EndPoint}/register`,
        method: "POST",
        body: data,
      }),
    }),
    getSidebarConversation: builder.query({
      query: (data) => `${sideBarconversation_EndPoint}/`,
    }),
    getMessages: builder.query({
      query: (id) => ({
        url: `${messages_EndPoint}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Messages", id: "LIST" }],
    }),

    sendMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `${messages_EndPoint}/send/${id}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: [{ type: "Messages", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetSidebarConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = apiSlice;
