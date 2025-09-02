import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

export const guestApi = createApi({
  reducerPath: "guestApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
