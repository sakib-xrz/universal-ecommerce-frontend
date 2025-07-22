import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "/menus",
      providesTags: [tagTypes.menus],
    }),
  }),
});

export const { useGetMenusQuery } = menuApi;
