import { Question } from "./question.entity";
export declare class Form {
    id: string;
    title: string;
    description: string | null;
    questions: Question[];
    createdAt: string;
}
