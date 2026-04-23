import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scoreSlice = createApi({
  reducerPath: "scoreSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8086",
  }),
  tagTypes: ["Scores", "Stats"],

  endpoints: (builder) => ({
    addScore: builder.mutation({
      query: (data) => ({
        url: "/score",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Scores", "Stats"],
    }),

    getAllScores: builder.query({
      query: () => "/getscores",
      providesTags: ["Scores"],
    }),
    getScoreById: builder.query({
      query: (userId) => `/getscorebyid/${userId}`,
      transformResponse: (response) => response,
    }),
    getStats: builder.query({
      query: (userId) => `/stats/${userId}`,
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useAddScoreMutation,
  useGetAllScoresQuery,
  useGetScoreByIdQuery,
  useGetStatsQuery,
} = scoreSlice;

export default scoreSlice;
