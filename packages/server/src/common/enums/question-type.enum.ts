import { registerEnumType } from "@nestjs/graphql";

export enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
}

registerEnumType(QuestionType, {
  name: "QuestionType",
  description: "The type of a form question",
  valuesMap: {
    TEXT: { description: "Free-text input" },
    MULTIPLE_CHOICE: { description: "Single-select radio buttons" },
    CHECKBOX: { description: "Multi-select checkboxes" },
    DATE: { description: "Date picker" },
  },
});
