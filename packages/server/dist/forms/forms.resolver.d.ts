import { Form } from "../common/entities/form.entity";
import { CreateFormInput } from "./dto/create-form.input";
import { UpdateFormInput } from "./dto/update-form.input";
import { FormsService } from "./forms.service";
export declare class FormsResolver {
    private readonly formsService;
    constructor(formsService: FormsService);
    forms(): Form[];
    form(id: string): Form;
    createForm(input: CreateFormInput): Form;
    updateForm(input: UpdateFormInput): Form;
    deleteForm(id: string): string;
}
