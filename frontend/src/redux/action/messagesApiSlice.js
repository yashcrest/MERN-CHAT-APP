import { apiSlice } from "./apiSlice";
const Messages_URL = "/api/messages";
const sidebarConversation_URL = "api/sidebarconversations";

const message = localStorage.getItem("selectedMessage");

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSidebarConversation: builder.query({
      query: (data) => `${sidebarConversation_URL}/`,
    }),
    getMessages: builder.query({
      query: (id) => ({
        url: `${Messages_URL}/${id}`,
      }),
    }),

    sendMessages: builder.mutation({
      query: (id) => ({
        url: `${Messages_URL}/send/${message._id}`,
        method: "POST",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetSidebarConversationQuery,
  useGetMessagesQuery,
  useSendMessagesMutation,
} = messagesApiSlice;
