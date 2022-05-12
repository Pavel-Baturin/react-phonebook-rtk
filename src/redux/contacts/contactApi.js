import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['contact'],
  endpoints: builder => ({
    getContact: builder.query({
      query: () => '/contacts',
      providesTags: ['contact'],
    }),
    addContact: builder.mutation({
      query: user => ({
        url: '/contacts',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['contact'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contact'],
    }),
  }),
});

export const {
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactApi;
