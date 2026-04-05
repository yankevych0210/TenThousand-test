"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let FormsService = class FormsService {
    constructor() {
        this.forms = new Map();
    }
    findAll() {
        return Array.from(this.forms.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    findOne(id) {
        const form = this.forms.get(id);
        if (!form) {
            throw new common_1.NotFoundException(`Form with id "${id}" not found`);
        }
        return form;
    }
    create(input) {
        const questions = (input.questions ?? []).map((q) => ({
            id: q.id || (0, uuid_1.v4)(),
            text: q.text,
            type: q.type,
            options: q.options ?? null,
            required: q.required,
        }));
        const form = {
            id: (0, uuid_1.v4)(),
            title: input.title,
            description: input.description ?? null,
            questions,
            createdAt: new Date().toISOString(),
        };
        this.forms.set(form.id, form);
        return form;
    }
    update(id, input) {
        const form = this.findOne(id);
        if (input.title !== undefined)
            form.title = input.title;
        if (input.description !== undefined)
            form.description = input.description;
        if (input.questions) {
            form.questions = input.questions.map((q) => ({
                id: q.id || (0, uuid_1.v4)(),
                text: q.text,
                type: q.type,
                options: q.options ?? null,
                required: q.required,
            }));
        }
        this.forms.set(form.id, form);
        return form;
    }
    remove(id) {
        const form = this.findOne(id);
        this.forms.delete(id);
        return id;
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)()
], FormsService);
//# sourceMappingURL=forms.service.js.map