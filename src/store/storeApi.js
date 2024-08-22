"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
      }),
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    submitSubscription: builder.mutation({
      query: (data) => ({
        url: "/api/subscription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/resetPassword",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/updatePassword",
        method: "POST",
        body: data,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/api/upload",
        method: "POST",
        body: data,
      }),
    }),
    getDataById: builder.mutation({
      query: (data) => ({
        url: "/api/getSubscriptionData",
        method: "POST",
        body: data,
      }),
    }),
    postComment: builder.mutation({
      query: (data) => ({
        url: "/api/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),

    updateSubscription: builder.mutation({
      query: (id) => ({
        url: `/api/getSubscriptionData?id=${id}`,
        method: "PUT",
      }),
    }),
    updateCustomerID: builder.mutation({
      query: (data) => ({
        url: `/api/user/updateCustomerId`,
        method: "PUT",
        body: data,
      }),
    }),
    updateVatNumber: builder.mutation({
      query: (data) => ({
        url: `/api/user/updateVatNumber`,
        method: "PUT",
        body: data,
      }),
    }),
    getCustomerIdByEmail: builder.mutation({
      query: (data) => ({
        url: "/api/user/getCustomerId",
        method: "POST",
        body: data,
      }),
    }),
    getSubscriptionDataById: builder.query({
      query: (id) => ({
        url: `/api/subscription/${id}`,
      }),
    }),
    getComments: builder.query({
      query: (id) => ({
        url: `/api/comments/${id}`,
      }),
      providesTags: ["comments"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/api/getCategories`,
      }),
      providesTags: ["comments"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/api/getSubscriptionData?id=${id}`,
        method: "DELETE",
      }),
    }),
    deleteImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "DELETE",
        body: data, // Assuming the request body contains the ID of the user or image
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useSubmitSubscriptionMutation,
  useGetDataByIdMutation,
  useUpdateSubscriptionMutation,
  useUploadImageMutation,
  useDeleteSubscriptionMutation,
  useGetSubscriptionDataByIdQuery,
  useUpdateCustomerIDMutation,
  useGetCustomerIdByEmailMutation,
  usePostCommentMutation,
  useGetCommentsQuery,
  useUpdateVatNumberMutation,
  useDeleteImageMutation,
  useGetCategoriesQuery,
} = storeApi;
