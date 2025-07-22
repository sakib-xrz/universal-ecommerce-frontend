import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductByCategory: builder.query({
      query: ({ slug, query }) => ({
        url: `/products/category/${slug}`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.product],
    }),

    globalSearchProduct: builder.query({
      query: (query) => ({
        url: `/products/search`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.product],
    }),
  }),
});

export const { useGetProductByCategoryQuery, useGlobalSearchProductQuery } =
  productApi;
