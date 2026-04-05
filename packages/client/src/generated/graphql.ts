import { api } from "@/api/baseApi";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export class TypedDocumentString<TResult, TVariables> extends String {
  __apiType?: (variables: TVariables) => TResult;
  constructor(private value: string) {
    super(value);
  }
  toString(): string {
    return this.value;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

/** A single answer to one question */
export type Answer = {
  __typename?: "Answer";
  questionId: Scalars["ID"]["output"];
  /** Unified answer array: TEXT/DATE = single-element, MULTIPLE_CHOICE = single-element, CHECKBOX = one or more. Empty array = skipped. */
  values: Array<Scalars["String"]["output"]>;
};

/** An answer to one question */
export type AnswerInput = {
  questionId: Scalars["ID"]["input"];
  /** Answer values — single-element for TEXT/DATE/MULTIPLE_CHOICE, multi for CHECKBOX */
  values: Array<Scalars["String"]["input"]>;
};

/** Input for creating a new form */
export type CreateFormInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  questions?: InputMaybe<Array<QuestionInput>>;
  title: Scalars["String"]["input"];
};

/** A form containing a list of questions */
export type Form = {
  __typename?: "Form";
  /** ISO 8601 creation timestamp */
  createdAt: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  questions: Array<Question>;
  title: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Creates a new form */
  createForm: Form;
  /** Deletes a form by ID */
  deleteForm: Scalars["String"]["output"];
  /** Submits a new response for a form */
  submitResponse: Response;
  /** Updates an existing form */
  updateForm: Form;
};

export type MutationCreateFormArgs = {
  input: CreateFormInput;
};

export type MutationDeleteFormArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationSubmitResponseArgs = {
  input: SubmitResponseInput;
};

export type MutationUpdateFormArgs = {
  input: UpdateFormInput;
};

export type Query = {
  __typename?: "Query";
  /** Returns a single form by its ID */
  form: Form;
  /** Returns all created forms, newest first */
  forms: Array<Form>;
  /** Returns all responses submitted for a given form */
  responses: Array<Response>;
};

export type QueryFormArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryResponsesArgs = {
  formId: Scalars["ID"]["input"];
};

/** A single question in a form */
export type Question = {
  __typename?: "Question";
  id: Scalars["ID"]["output"];
  /** Options for MULTIPLE_CHOICE and CHECKBOX types */
  options?: Maybe<Array<Scalars["String"]["output"]>>;
  /** Whether this question is required */
  required: Scalars["Boolean"]["output"];
  /** The question prompt text */
  text: Scalars["String"]["output"];
  type: QuestionType;
};

/** Input for creating a question */
export type QuestionInput = {
  /** Optional ID for updating existing questions */
  id?: InputMaybe<Scalars["ID"]["input"]>;
  /** Options for MULTIPLE_CHOICE/CHECKBOX */
  options?: InputMaybe<Array<Scalars["String"]["input"]>>;
  required?: Scalars["Boolean"]["input"];
  /** The question prompt text */
  text: Scalars["String"]["input"];
  type: QuestionType;
};

/** The type of a form question */
export type QuestionType =
  /** Multi-select checkboxes */
  | "CHECKBOX"
  /** Date picker */
  | "DATE"
  /** Single-select radio buttons */
  | "MULTIPLE_CHOICE"
  /** Free-text input */
  | "TEXT";

/** A submission response for a form */
export type Response = {
  __typename?: "Response";
  answers: Array<Answer>;
  formId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
  /** ISO 8601 submission timestamp */
  submittedAt: Scalars["String"]["output"];
};

/** Input for submitting a form response */
export type SubmitResponseInput = {
  answers: Array<AnswerInput>;
  formId: Scalars["ID"]["input"];
};

/** Data for updating an existing form */
export type UpdateFormInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  questions?: InputMaybe<Array<QuestionInput>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFormsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFormsQuery = {
  __typename?: "Query";
  forms: Array<{
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
    questions: Array<{ __typename?: "Question"; id: string }>;
  }>;
};

export type GetFormQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetFormQuery = {
  __typename?: "Query";
  form: {
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
    questions: Array<{
      __typename?: "Question";
      id: string;
      text: string;
      type: QuestionType;
      options?: Array<string> | null;
      required: boolean;
    }>;
  };
};

export type CreateFormMutationVariables = Exact<{
  input: CreateFormInput;
}>;

export type CreateFormMutation = {
  __typename?: "Mutation";
  createForm: {
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
    questions: Array<{
      __typename?: "Question";
      id: string;
      text: string;
      type: QuestionType;
      options?: Array<string> | null;
      required: boolean;
    }>;
  };
};

export type UpdateFormMutationVariables = Exact<{
  input: UpdateFormInput;
}>;

export type UpdateFormMutation = {
  __typename?: "Mutation";
  updateForm: {
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
    questions: Array<{
      __typename?: "Question";
      id: string;
      text: string;
      type: QuestionType;
      options?: Array<string> | null;
      required: boolean;
    }>;
  };
};

export type DeleteFormMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteFormMutation = {
  __typename?: "Mutation";
  deleteForm: string;
};

export type GetResponsesQueryVariables = Exact<{
  formId: Scalars["ID"]["input"];
}>;

export type GetResponsesQuery = {
  __typename?: "Query";
  responses: Array<{
    __typename?: "Response";
    id: string;
    formId: string;
    submittedAt: string;
    answers: Array<{
      __typename?: "Answer";
      questionId: string;
      values: Array<string>;
    }>;
  }>;
};

export type SubmitResponseMutationVariables = Exact<{
  input: SubmitResponseInput;
}>;

export type SubmitResponseMutation = {
  __typename?: "Mutation";
  submitResponse: {
    __typename?: "Response";
    id: string;
    formId: string;
    submittedAt: string;
    answers: Array<{
      __typename?: "Answer";
      questionId: string;
      values: Array<string>;
    }>;
  };
};

export const GetFormsDocument = new TypedDocumentString(`
    query GetForms {
  forms {
    id
    title
    description
    createdAt
    questions {
      id
    }
  }
}
    `);
export const GetFormDocument = new TypedDocumentString(`
    query GetForm($id: ID!) {
  form(id: $id) {
    id
    title
    description
    createdAt
    questions {
      id
      text
      type
      options
      required
    }
  }
}
    `);
export const CreateFormDocument = new TypedDocumentString(`
    mutation CreateForm($input: CreateFormInput!) {
  createForm(input: $input) {
    id
    title
    description
    createdAt
    questions {
      id
      text
      type
      options
      required
    }
  }
}
    `);
export const UpdateFormDocument = new TypedDocumentString(`
    mutation UpdateForm($input: UpdateFormInput!) {
  updateForm(input: $input) {
    id
    title
    description
    createdAt
    questions {
      id
      text
      type
      options
      required
    }
  }
}
    `);
export const DeleteFormDocument = new TypedDocumentString(`
    mutation DeleteForm($id: ID!) {
  deleteForm(id: $id)
}
    `);
export const GetResponsesDocument = new TypedDocumentString(`
    query GetResponses($formId: ID!) {
  responses(formId: $formId) {
    id
    formId
    submittedAt
    answers {
      questionId
      values
    }
  }
}
    `);
export const SubmitResponseDocument = new TypedDocumentString(`
    mutation SubmitResponse($input: SubmitResponseInput!) {
  submitResponse(input: $input) {
    id
    formId
    submittedAt
    answers {
      questionId
      values
    }
  }
}
    `);

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument, variables }),
    }),
    GetForm: build.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument, variables }),
    }),
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>(
      {
        query: (variables) => ({ document: CreateFormDocument, variables }),
      },
    ),
    UpdateForm: build.mutation<UpdateFormMutation, UpdateFormMutationVariables>(
      {
        query: (variables) => ({ document: UpdateFormDocument, variables }),
      },
    ),
    DeleteForm: build.mutation<DeleteFormMutation, DeleteFormMutationVariables>(
      {
        query: (variables) => ({ document: DeleteFormDocument, variables }),
      },
    ),
    GetResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables }),
    }),
    SubmitResponse: build.mutation<
      SubmitResponseMutation,
      SubmitResponseMutationVariables
    >({
      query: (variables) => ({ document: SubmitResponseDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
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
} = injectedRtkApi;
