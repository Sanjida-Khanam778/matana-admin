import { api } from "./api";

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation({
      query: (body) => ({
        url: "/contact/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendContactMessageMutation } = contactApi;
