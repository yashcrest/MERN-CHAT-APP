// this slice is dedicated to make backend api calls for sending users login details
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
const users_EndPoint = "/users"; //the rest of the URL is coming from vite.config.js
const messages_EndPoint = "/messages";
const sideBarconversation_EndPoint = "/sidebarconversations";
import io from "socket.io-client";

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
      query: (conversationId) => ({
        url: `${messages_EndPoint}/${conversationId}`,
      }),
      // async onCacheEntryAdded(
      //   id,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      //     query: { userId: id },
      //   });

      //   try {
      //     await cacheDataLoaded;
      //     const listner = (event) => {
      //       const data = JSON.parse(event.data);
      //       if (data.channel !== id) return;

      //       updateCachedData((draft) => {
      //         draft.push(data);
      //       });
      //     };
      //     socket.on("newMessage", listner);
      //   } catch (error) {
      //     toast.error(error?.data?.message || error.error);
      //   }
      //   await cacheEntryRemoved;
      //   socket.close();
      // },
      //this is to store data in cache
      providesTags: (result, error, id) => [{ type: "Messages", id: "LIST" }],
    }),

    sendMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `${messages_EndPoint}/send/${id}`,
        method: "POST",
        body: { message },
      }),
      // this is to invalidate the cache data
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
