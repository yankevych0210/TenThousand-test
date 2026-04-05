import { Response } from "../common/entities/response.entity";
import { SubmitResponseInput } from "./dto/submit-response.input";
import { ResponsesService } from "./responses.service";
export declare class ResponsesResolver {
    private readonly responsesService;
    constructor(responsesService: ResponsesService);
    responses(formId: string): Response[];
    submitResponse(input: SubmitResponseInput): Response;
}
