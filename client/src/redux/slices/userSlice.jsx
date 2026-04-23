import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "userSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8086",
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/signupuser",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/loginuser",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useSignupUserMutation, useLoginUserMutation } = userSlice;
