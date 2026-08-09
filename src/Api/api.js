import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.29.168:8005/api",
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

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users"],
  endpoints: () => ({}),
});
