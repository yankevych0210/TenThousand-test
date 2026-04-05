import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Question } from "./question.entity";

@ObjectType({ description: "A form containing a list of questions" })
export class Form {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [Question])
  questions: Question[];

  @Field(() => String, { description: "ISO 8601 creation timestamp" })
  createdAt: string;
}
