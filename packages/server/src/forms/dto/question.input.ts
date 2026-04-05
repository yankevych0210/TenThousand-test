import { Field, InputType, ID } from "@nestjs/graphql";
import { QuestionType } from "../../common/enums/question-type.enum";

@InputType({ description: "Input for creating a question" })
export class QuestionInput {
  @Field(() => ID, {
    nullable: true,
    description: "Optional ID for updating existing questions",
  })
  id?: string;

  @Field(() => String, { description: "The question prompt text" })
  text: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [String], {
    nullable: true,
    description: "Options for MULTIPLE_CHOICE/CHECKBOX",
  })
  options: string[] | null;

  @Field(() => Boolean, { defaultValue: false })
  required: boolean;
}
