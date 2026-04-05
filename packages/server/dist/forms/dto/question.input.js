"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_type_enum_1 = require("../../common/enums/question-type.enum");
let QuestionInput = class QuestionInput {
};
exports.QuestionInput = QuestionInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        nullable: true,
        description: "Optional ID for updating existing questions",
    }),
    __metadata("design:type", String)
], QuestionInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: "The question prompt text" }),
    __metadata("design:type", String)
], QuestionInput.prototype, "text", void 0);
__decorate([
    (0, graphql_1.Field)(() => question_type_enum_1.QuestionType),
    __metadata("design:type", String)
], QuestionInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], {
        nullable: true,
        description: "Options for MULTIPLE_CHOICE/CHECKBOX",
    }),
    __metadata("design:type", Object)
], QuestionInput.prototype, "options", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], QuestionInput.prototype, "required", void 0);
exports.QuestionInput = QuestionInput = __decorate([
    (0, graphql_1.InputType)({ description: "Input for creating a question" })
], QuestionInput);
//# sourceMappingURL=question.input.js.map