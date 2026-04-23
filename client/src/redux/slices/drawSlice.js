import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const drawSlice = createApi({
  reducerPath: "drawSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8086",
  }),
  endpoints: (builder) => ({
    runDraw: builder.mutation({
      query: () => ({
        url: "/draw",
        method: "POST",
      }),
    }),
  }),
});

export const { useRunDrawMutation } = drawSlice;
