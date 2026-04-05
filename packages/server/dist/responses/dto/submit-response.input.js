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
exports.SubmitResponseInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const answer_input_1 = require("../../forms/dto/answer.input");
let SubmitResponseInput = class SubmitResponseInput {
};
exports.SubmitResponseInput = SubmitResponseInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SubmitResponseInput.prototype, "formId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [answer_input_1.AnswerInput]),
    __metadata("design:type", Array)
], SubmitResponseInput.prototype, "answers", void 0);
exports.SubmitResponseInput = SubmitResponseInput = __decorate([
    (0, graphql_1.InputType)({ description: "Input for submitting a form response" })
], SubmitResponseInput);
//# sourceMappingURL=submit-response.input.js.map