import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'http://127.0.0.1:5000';

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },
});

export const LeadApi = createApi({
  reducerPath: 'LeadApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (manage_path) => `${manage_path}`,
      providesTags: (result, error, manage_path) => [{ type: 'User', id: manage_path }],
    }),
    getloginUsers: builder.query({
      query: () => "login",
    }),
    postUser: builder.mutation({
      query: ({ path, userData }) => ({
        url: `${path}`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: (result, error, { path }) => [{ type: 'User', id: path }],
    }),
    refreshUsers: builder.query({
      query: () => '/',
    }),
  }),
});

export const { useGetUsersQuery, useGetloginUsersQuery, usePostUserMutation } = LeadApi;
