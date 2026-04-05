"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionType = void 0;
const graphql_1 = require("@nestjs/graphql");
var QuestionType;
(function (QuestionType) {
    QuestionType["TEXT"] = "TEXT";
    QuestionType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    QuestionType["CHECKBOX"] = "CHECKBOX";
    QuestionType["DATE"] = "DATE";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
(0, graphql_1.registerEnumType)(QuestionType, {
    name: "QuestionType",
    description: "The type of a form question",
    valuesMap: {
        TEXT: { description: "Free-text input" },
        MULTIPLE_CHOICE: { description: "Single-select radio buttons" },
        CHECKBOX: { description: "Multi-select checkboxes" },
        DATE: { description: "Date picker" },
    },
});
//# sourceMappingURL=question-type.enum.js.map