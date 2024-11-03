// utils/api.js

import { useQuery, useMutation, useQueryClient } from "react-query";
import { getToken } from "./helpers";

const BASE_URL = import.meta.env.VITE_API_URL;

// Generic function to handle fetch requests
export const fetchApi = async (endpoint, options = {}) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      authorization: "Bearer " + token,
    },
    ...options,
  });

  if (!response.ok) {
    const result = await response.json();
    // throw new Error(`Error: ${response.status} ${response.statusText}`);
    throw new Error(`Error: ${result?.message || "Something went wrong"}`);
  }

  return response.json();
};

// Function to get data from an endpoint
export const useGetData = (endpoint, params) => {
  return useQuery([endpoint], () =>
    fetchApi(endpoint, {
      method: "GET",
      params,
    })
  );
};

// Function to post data to an endpoint
export const usePostData = (endpoint) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      fetchApi(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]); // Invalidate queries to refetch data
      },
    }
  );
};

// Example function to put data
export const usePutData = (endpoint) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      fetchApi(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]); // Invalidate queries to refetch data
      },
    }
  );
};

// Example function to delete data
export const useDeleteData = (endpoint) => {
  const queryClient = useQueryClient();

  return useMutation(() => fetchApi(endpoint, { method: "DELETE" }), {
    onSuccess: () => {
      queryClient.invalidateQueries([endpoint]); // Invalidate queries to refetch data
    },
  });
};
