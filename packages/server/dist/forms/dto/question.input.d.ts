import { QuestionType } from "../../common/enums/question-type.enum";
export declare class QuestionInput {
    id?: string;
    text: string;
    type: QuestionType;
    options: string[] | null;
    required: boolean;
}
