import { api as generatedApi } from "@/generated/graphql";
import type {
  GetFormsQuery,
  GetFormQuery,
  GetFormQueryVariables,
  DeleteFormMutationVariables,
  UpdateFormMutationVariables,
  GetResponsesQueryVariables,
  SubmitResponseMutationVariables,
} from "@/generated/graphql";

export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Form", "Response"],
  endpoints: {
    GetForms: {
      providesTags: (result: GetFormsQuery | undefined) =>
        result
          ? [
              ...result.forms.map(({ id }) => ({ type: "Form" as const, id })),
              { type: "Form" as const, id: "LIST" },
            ]
          : [{ type: "Form" as const, id: "LIST" }],
    },
    GetForm: {
      providesTags: (
        _result: GetFormQuery | undefined,
        _error: unknown,
        { id }: GetFormQueryVariables,
      ) => [{ type: "Form" as const, id }],
    },
    CreateForm: {
      invalidatesTags: [{ type: "Form" as const, id: "LIST" }],
    },
    UpdateForm: {
      invalidatesTags: (
        _result: unknown,
        _error: unknown,
        { input }: UpdateFormMutationVariables,
      ) => [
        { type: "Form" as const, id: input.id },
        { type: "Form" as const, id: "LIST" },
      ],
    },
    DeleteForm: {
      invalidatesTags: (
        _result: unknown,
        _error: unknown,
        { id }: DeleteFormMutationVariables,
      ) => [
        { type: "Form" as const, id },
        { type: "Form" as const, id: "LIST" },
      ],
    },
    GetResponses: {
      providesTags: (
        _result: unknown,
        _error: unknown,
        { formId }: GetResponsesQueryVariables,
      ) => [{ type: "Response" as const, id: formId }],
    },
    SubmitResponse: {
      invalidatesTags: (
        _result: unknown,
        _error: unknown,
        { input }: SubmitResponseMutationVariables,
      ) => [{ type: "Response" as const, id: input.formId }],
    },
  },
});

export const {
  useGetFormsQuery,
  useLazyGetFormsQuery,
  useGetFormQuery,
  useLazyGetFormQuery,
  useCreateFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation,
  useGetResponsesQuery,
  useLazyGetResponsesQuery,
  useSubmitResponseMutation,
} = enhancedApi;
