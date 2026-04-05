export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

export interface DraftQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  required: boolean;
}

export interface DraftForm {
  title: string;
  description: string;
  questions: DraftQuestion[];
}
