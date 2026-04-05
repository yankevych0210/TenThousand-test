import { Form } from "../common/entities/form.entity";
import { CreateFormInput } from "./dto/create-form.input";
import { UpdateFormInput } from "./dto/update-form.input";
export declare class FormsService {
    private readonly forms;
    findAll(): Form[];
    findOne(id: string): Form;
    create(input: CreateFormInput): Form;
    update(id: string, input: UpdateFormInput): Form;
    remove(id: string): string;
}
