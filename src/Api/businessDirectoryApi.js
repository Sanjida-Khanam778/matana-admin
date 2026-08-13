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
    getMapCommunities: builder.query({
      query: () => "/add-communities/to/map/",
    }),
    getBusinessDetails: builder.query({
      query: (id) => `/businesses/${id}/`,
    }),
    getTags: builder.query({
      query: () => "/business/tags/",
    }),
    filterBusinesses: builder.query({
      query: ({ categories, services_tags, locations, occasions, search }) => {
        const params = new URLSearchParams();
        if (categories) params.append("categories", categories);
        if (services_tags) params.append("services_tags", services_tags);
        if (locations) params.append("locations", locations);
        if (occasions) params.append("occasions", occasions);
        if (search) params.append("search", search);
        return `/business/filter/?${params.toString()}`;
      },
    }),
    sendInquiry: builder.mutation({
      query: (body) => ({
        url: "/inquiry/",
        method: "POST",
        body,
      }),
    }),
    requestOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/business-login/request-otp/",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/business-login/verify-otp/",
        method: "POST",
        body,
      }),
    }),
    recordPageVisit: builder.mutation({
      query: (id) => ({
        url: `/businesses/${id}/`,
        method: "PATCH",
      }),
    }),
    getMyAnalytics: builder.query({
      query: () => "/business/my-analytics/",
    }),
    trackClick: builder.mutation({
      query: ({ id, click_type }) => ({
        url: `/businesses/${id}/track-click/`,
        method: "POST",
        body: { click_type },
      }),
    }),
    registerWebsiteVisitor: builder.mutation({
      query: (body) => ({
        url: "/website-visitors/",
        method: "POST",
        body,
      }),
    }),
    getOccasions: builder.query({
      query: () => "/business/occasions/",
    }),
    getMyBusinessProfile: builder.query({
      query: () => "/business/me/",
    }),
   
    requestUpdate: builder.mutation({
      query: ({ id, ...body }) => ({
        url: "/businesses/request-update/",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetCategoriesQuery,
  useGetCommunitiesQuery,
  useGetCommunityStoresByCityQuery,
  useGetCategoryStoresQuery,
  useGetMapCommunitiesQuery,
  useGetBusinessDetailsQuery,
  useGetStatsQuery,
  useGetOrderSummaryQuery,
  useGetTagsQuery,
  useFilterBusinessesQuery,
  useUploadMediaMutation,
  useRegisterBusinessMutation,
  useSendInquiryMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useRecordPageVisitMutation,
  useGetMyAnalyticsQuery,
  useTrackClickMutation,
  useRegisterWebsiteVisitorMutation,
  useGetOccasionsQuery,
  useGetMyBusinessProfileQuery,
  useRequestUpdateMutation,
} = businessDirectoryApi;
