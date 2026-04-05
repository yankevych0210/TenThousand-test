import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateFormInput } from "./create-form.input";

@InputType({ description: "Data for updating an existing form" })
export class UpdateFormInput extends PartialType(CreateFormInput) {
  @Field(() => ID)
  id: string;
}
