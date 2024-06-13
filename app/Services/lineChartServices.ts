import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://dvtools.bigvision.ai/utm_tracker_backend/' });

const lineChartServices = createApi({
  reducerPath: 'lineChart', 
  baseQuery, 
  endpoints: (builder) => ({
    fetchData: builder.mutation({
      query: (userData) => ({
        url: "/utm_counts_webhook",
        method: 'POST',
        body: userData,
      }),
    }),
    fetchDataKeys: builder.mutation({
      query: (userData) => ({
        url: "/utm_distincts_webhook",
        method: 'POST',
        body: userData,
      }),
    }),
  })
});

export const { useFetchDataMutation, useFetchDataKeysMutation } = lineChartServices; 
export default lineChartServices;