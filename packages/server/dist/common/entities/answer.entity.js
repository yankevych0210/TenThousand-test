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
exports.Answer = void 0;
const graphql_1 = require("@nestjs/graphql");
let Answer = class Answer {
};
exports.Answer = Answer;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Answer.prototype, "questionId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], {
        description: "Unified answer array: TEXT/DATE = single-element, MULTIPLE_CHOICE = single-element, CHECKBOX = one or more. Empty array = skipped.",
    }),
    __metadata("design:type", Array)
], Answer.prototype, "values", void 0);
exports.Answer = Answer = __decorate([
    (0, graphql_1.ObjectType)({ description: "A single answer to one question" })
], Answer);
//# sourceMappingURL=answer.entity.js.map