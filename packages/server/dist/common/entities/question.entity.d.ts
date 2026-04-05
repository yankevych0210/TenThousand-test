import { QuestionType } from "../enums/question-type.enum";
export declare class Question {
    id: string;
    text: string;
    type: QuestionType;
    options: string[] | null;
    required: boolean;
}
