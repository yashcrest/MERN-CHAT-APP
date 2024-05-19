// this slice is dedicated to make backend api calls for sending users login details
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const users_EndPoint = "/users"; //the rest of the URL is coming from vite.config.js
const messages_EndPoint = "/messages";
const sideBarconversation_EndPoint = "/sidebarconversations";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   return headers;
    // },
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
    }),

    sendMessages: builder.mutation({
      query: (id) => ({
        url: `${messages_EndPoint}/send/${message._id}`,
        method: "POST",
        body: id,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetSidebarConversationQuery,
  useGetMessagesQuery,
  useSendMessagesMutation,
} = apiSlice;
