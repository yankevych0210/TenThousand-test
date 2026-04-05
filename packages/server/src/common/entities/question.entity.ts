import { Field, ID, ObjectType } from "@nestjs/graphql";
import { QuestionType } from "../enums/question-type.enum";

@ObjectType({ description: "A single question in a form" })
export class Question {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: "The question prompt text" })
  text: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [String], {
    nullable: true,
    description: "Options for MULTIPLE_CHOICE and CHECKBOX types",
  })
  options: string[] | null;

  @Field(() => Boolean, { description: "Whether this question is required" })
  required: boolean;
}
