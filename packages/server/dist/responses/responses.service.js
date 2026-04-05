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
exports.ResponsesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const forms_service_1 = require("../forms/forms.service");
let ResponsesService = class ResponsesService {
    constructor(formsService) {
        this.formsService = formsService;
        this.responses = new Map();
    }
    findByFormId(formId) {
        this.formsService.findOne(formId);
        return this.responses.get(formId) ?? [];
    }
    submit(input) {
        this.formsService.findOne(input.formId);
        const response = {
            id: (0, uuid_1.v4)(),
            formId: input.formId,
            answers: input.answers.map((a) => ({
                questionId: a.questionId,
                values: a.values,
            })),
            submittedAt: new Date().toISOString(),
        };
        const existing = this.responses.get(input.formId) ?? [];
        this.responses.set(input.formId, [...existing, response]);
        return response;
    }
};
exports.ResponsesService = ResponsesService;
exports.ResponsesService = ResponsesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [forms_service_1.FormsService])
], ResponsesService);
//# sourceMappingURL=responses.service.js.map