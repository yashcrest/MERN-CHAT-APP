// this slice is dedicated to make backend api calls for sending users login details
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const users_EndPoint = "/users"; //the rest of the URL is coming from vite.config.js
const messages_EndPoint = "/messages";
const sideBarconversation_EndPoint = "/sidebarconversations";

//test socketio import in this file itself
import { io } from "socket.io-client";
const socketUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(socketUrl);

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    // baseUrl: "https://react-node-chat-app-atr1.onrender.com/api",
    credentials: "include",

    //sending back jwt token to backend
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages"],
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
      providesTags: ["Messages"],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        // const socket = io(socketUrl);
        try {
          await cacheDataLoaded;
          socket.on("newMessage", (message) => {
            console.log(message);
            updateCachedData((draft) => {
              draft.push(message);
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    sendMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `${messages_EndPoint}/send/${id}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Messages"],
      // implementaion not finished (need to figure out what should the value of arg should be)
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //optimistic update to the UI messages
        const patchresult = dispatch(
          apiSlice.util.updateQueryData("getMessages", arg, (draft) => {
            draft.push(arg);
            // Object.assign(draft, sendMessage);
          })
        );
        try {
          await queryFulfilled;
          socket.emit("newMessage", arg, arg.id);
        } catch (error) {
          // undo the optimistic update
          patchresult.undo();
        }
      },
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
