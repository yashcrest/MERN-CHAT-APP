import { apiSlice } from "./apiSlice";
const Messages_URL = "/api/messages";

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSidebarConversation: builder.query({
      query: (messages) => `${Messages_URL}/`,
    }),
  }),
});

export const { useGetSidebarConversationQuery } = messagesApiSlice;
