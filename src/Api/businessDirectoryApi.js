import { api } from "./api";

export const businessDirectoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/plans/",
    }),
    getCategories: builder.query({
      query: () => "/categories/",
    }),
    getCommunities: builder.query({
      query: () => "/communities/",
    }),
    getStats: builder.query({
      query: () => "/stats/",
    }),
    getOrderSummary: builder.query({
      query: ({ plan_id, duration_months, payment_type }) => ({
        url: "/business/order-summary/",
        params: { plan_id, duration_months, payment_type },
      }),
    }),
    uploadMedia: builder.mutation({
      query: (formData) => ({
        url: "/media/",
        method: "POST",
        body: formData,
      }),
    }),
    registerBusiness: builder.mutation({
      query: (body) => ({
        url: "/business/register/",
        method: "POST",
        body,
      }),
    }),
    getCommunityStoresByCity: builder.query({
      query: (cityName) => `/communities/${cityName}/`,
    }),
    getCategoryStores: builder.query({
      query: (categoryId) => `/categories/${categoryId}/`,
    }),
    getBusinessDetails: builder.query({
      query: (id) => `/businesses/${id}/`,
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetCategoriesQuery,
  useGetCommunitiesQuery,
  useGetCommunityStoresByCityQuery,
  useGetCategoryStoresQuery,
  useGetBusinessDetailsQuery,
  useGetStatsQuery,
  useGetOrderSummaryQuery,
  useUploadMediaMutation,
  useRegisterBusinessMutation,
} = businessDirectoryApi;
