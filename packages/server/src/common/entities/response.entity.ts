import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Answer } from "./answer.entity";

@ObjectType({ description: "A submission response for a form" })
export class Response {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  formId: string;

  @Field(() => [Answer])
  answers: Answer[];

  @Field(() => String, { description: "ISO 8601 submission timestamp" })
  submittedAt: string;
}
