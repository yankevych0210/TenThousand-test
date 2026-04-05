import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "A single answer to one question" })
export class Answer {
  @Field(() => ID)
  questionId: string;

  @Field(() => [String], {
    description:
      "Unified answer array: TEXT/DATE = single-element, MULTIPLE_CHOICE = single-element, CHECKBOX = one or more. Empty array = skipped.",
  })
  values: string[];
}
