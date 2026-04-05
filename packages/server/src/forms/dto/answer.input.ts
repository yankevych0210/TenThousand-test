import { Field, ID, InputType } from "@nestjs/graphql";

@InputType({ description: "An answer to one question" })
export class AnswerInput {
  @Field(() => ID)
  questionId: string;

  @Field(() => [String], {
    description:
      "Answer values — single-element for TEXT/DATE/MULTIPLE_CHOICE, multi for CHECKBOX",
  })
  values: string[];
}
