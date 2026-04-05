import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Response } from "../common/entities/response.entity";
import { FormsService } from "../forms/forms.service";
import { SubmitResponseInput } from "./dto/submit-response.input";

@Injectable()
export class ResponsesService {
  private readonly responses = new Map<string, Response[]>();

  constructor(private readonly formsService: FormsService) {}

  findByFormId(formId: string): Response[] {
    // Validate form exists — throws NotFoundException if not
    this.formsService.findOne(formId);
    return this.responses.get(formId) ?? [];
  }

  submit(input: SubmitResponseInput): Response {
    // Validate form exists — throws NotFoundException if not
    this.formsService.findOne(input.formId);

    const response: Response = {
      id: uuidv4(),
      formId: input.formId,
      answers: input.answers.map((a) => ({
        questionId: a.questionId,
        values: a.values,
      })),
      submittedAt: new Date().toISOString(),
    };

    const existing = this.responses.get(input.formId) ?? [];
    this.responses.set(input.formId, [...existing, response]);

    return response;
  }
}
