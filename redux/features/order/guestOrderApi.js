import { guestApi } from "@/redux/api/guestApi";
import { tagTypes } from "@/redux/tagTypes";

export const guestOrderApi = guestApi.injectEndpoints({
  endpoints: (builder) => ({
    createGuestOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/guest`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const { useCreateGuestOrderMutation } = guestOrderApi;
