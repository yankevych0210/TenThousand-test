import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Form } from "../common/entities/form.entity";
import { CreateFormInput } from "./dto/create-form.input";
import { UpdateFormInput } from "./dto/update-form.input";
import { FormsService } from "./forms.service";

@Resolver(() => Form)
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Query(() => [Form], {
    description: "Returns all created forms, newest first",
  })
  forms(): Form[] {
    return this.formsService.findAll();
  }

  @Query(() => Form, { description: "Returns a single form by its ID" })
  form(@Args("id", { type: () => ID }) id: string): Form {
    return this.formsService.findOne(id);
  }

  @Mutation(() => Form, { description: "Creates a new form" })
  createForm(@Args("input") input: CreateFormInput): Form {
    return this.formsService.create(input);
  }

  @Mutation(() => Form, { description: "Updates an existing form" })
  updateForm(@Args("input") input: UpdateFormInput): Form {
    return this.formsService.update(input.id, input);
  }

  @Mutation(() => String, { description: "Deletes a form by ID" })
  deleteForm(@Args("id", { type: () => ID }) id: string): string {
    return this.formsService.remove(id);
  }
}
