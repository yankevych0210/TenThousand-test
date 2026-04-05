import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        {
          add: {
            content: `export class TypedDocumentString<TResult, TVariables> extends String {
  __apiType?: (variables: TVariables) => TResult;
  constructor(private value: string) { super(value); }
  toString(): string { return this.value; }
}`,
          },
        },
        {
          "typescript-rtk-query": {
            importBaseApiFrom: "@/api/baseApi",
            exportHooks: true,
          },
        },
      ],
      config: {
        documentMode: "string",
        enumsAsTypes: true,
        strictScalars: true,
        scalars: {
          ID: "string",
        },
      },
    },
  },
};

export default config;
