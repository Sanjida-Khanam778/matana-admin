import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://matanashopapi.theirin.space/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken || null;
    const accessToken = localStorage.getItem("access_token");
    let authAccess = null;

    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      authAccess = authData?.access;
    } catch {
      // ignore JSON parse error
    }

    const finalToken = token || accessToken || authAccess;
    if (finalToken) {
      headers.set("authorization", `Bearer ${finalToken}`);
    }
    return headers;
  },
});

const baseQueryWithFallback = async (args, apiInstance, extraOptions) => {
  let result = await rawBaseQuery(args, apiInstance, extraOptions);

  // If 401 Unauthorized occurs (e.g. expired or invalid Bearer token in localStorage)
  if (result.error && result.error.status === 401) {
    const isGet = typeof args === "string" || (args && (args.method === "GET" || !args.method));
    if (isGet) {
      // Retry without Authorization header for public GET endpoints
      const anonymousBaseQuery = fetchBaseQuery({
        baseUrl: "https://matanashopapi.theirin.space/api",
      });
      const retryResult = await anonymousBaseQuery(args, apiInstance, extraOptions);
      if (retryResult.data) {
        localStorage.removeItem("access_token");
        return retryResult;
      }
    }

    // Clean up stale/invalid credentials
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth");
  }

  return result;
};

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithFallback,
  tagTypes: ["users"],
  endpoints: () => ({}),
});
