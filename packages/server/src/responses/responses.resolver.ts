import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Response } from "../common/entities/response.entity";
import { SubmitResponseInput } from "./dto/submit-response.input";
import { ResponsesService } from "./responses.service";

@Resolver(() => Response)
export class ResponsesResolver {
  constructor(private readonly responsesService: ResponsesService) {}

  @Query(() => [Response], {
    description: "Returns all responses submitted for a given form",
  })
  responses(@Args("formId", { type: () => ID }) formId: string): Response[] {
    return this.responsesService.findByFormId(formId);
  }

  @Mutation(() => Response, {
    description: "Submits a new response for a form",
  })
  submitResponse(@Args("input") input: SubmitResponseInput): Response {
    return this.responsesService.submit(input);
  }
}
