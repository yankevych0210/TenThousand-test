import { Field, ID, InputType } from "@nestjs/graphql";
import { AnswerInput } from "../../forms/dto/answer.input";

@InputType({ description: "Input for submitting a form response" })
export class SubmitResponseInput {
  @Field(() => ID)
  formId: string;

  @Field(() => [AnswerInput])
  answers: AnswerInput[];
}
