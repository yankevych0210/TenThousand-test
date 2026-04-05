import { Field, InputType } from "@nestjs/graphql";
import { QuestionInput } from "./question.input";

@InputType({ description: "Input for creating a new form" })
export class CreateFormInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [QuestionInput], { nullable: true })
  questions: QuestionInput[] | null;
}
