import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

type DocumentArg = { toString(): string } | string;

export interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
  extensions?: Record<string, unknown>;
}

interface GraphQLRequestArgs {
  document: DocumentArg;
  variables?: unknown;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

const GRAPHQL_URL = "http://localhost:3000/graphql";

const graphqlBaseQuery: BaseQueryFn<
  GraphQLRequestArgs,
  unknown,
  GraphQLError[]
> = async ({ document, variables }) => {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: document.toString(), variables }),
    });

    const json = (await response.json()) as GraphQLResponse<unknown>;

    if (json.errors && json.errors.length > 0) {
      return { error: json.errors };
    }

    return { data: json.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    return { error: [{ message }] };
  }
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: graphqlBaseQuery,
  tagTypes: ["Form", "Response"],
  endpoints: () => ({}),
});

export const api = baseApi;
