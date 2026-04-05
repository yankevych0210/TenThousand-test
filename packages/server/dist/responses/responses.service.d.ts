import { Response } from "../common/entities/response.entity";
import { FormsService } from "../forms/forms.service";
import { SubmitResponseInput } from "./dto/submit-response.input";
export declare class ResponsesService {
    private readonly formsService;
    private readonly responses;
    constructor(formsService: FormsService);
    findByFormId(formId: string): Response[];
    submit(input: SubmitResponseInput): Response;
}
