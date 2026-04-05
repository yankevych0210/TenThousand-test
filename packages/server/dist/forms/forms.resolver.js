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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const form_entity_1 = require("../common/entities/form.entity");
const create_form_input_1 = require("./dto/create-form.input");
const update_form_input_1 = require("./dto/update-form.input");
const forms_service_1 = require("./forms.service");
let FormsResolver = class FormsResolver {
    constructor(formsService) {
        this.formsService = formsService;
    }
    forms() {
        return this.formsService.findAll();
    }
    form(id) {
        return this.formsService.findOne(id);
    }
    createForm(input) {
        return this.formsService.create(input);
    }
    updateForm(input) {
        return this.formsService.update(input.id, input);
    }
    deleteForm(id) {
        return this.formsService.remove(id);
    }
};
exports.FormsResolver = FormsResolver;
__decorate([
    (0, graphql_1.Query)(() => [form_entity_1.Form], {
        description: "Returns all created forms, newest first",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], FormsResolver.prototype, "forms", null);
__decorate([
    (0, graphql_1.Query)(() => form_entity_1.Form, { description: "Returns a single form by its ID" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", form_entity_1.Form)
], FormsResolver.prototype, "form", null);
__decorate([
    (0, graphql_1.Mutation)(() => form_entity_1.Form, { description: "Creates a new form" }),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_form_input_1.CreateFormInput]),
    __metadata("design:returntype", form_entity_1.Form)
], FormsResolver.prototype, "createForm", null);
__decorate([
    (0, graphql_1.Mutation)(() => form_entity_1.Form, { description: "Updates an existing form" }),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_form_input_1.UpdateFormInput]),
    __metadata("design:returntype", form_entity_1.Form)
], FormsResolver.prototype, "updateForm", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { description: "Deletes a form by ID" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], FormsResolver.prototype, "deleteForm", null);
exports.FormsResolver = FormsResolver = __decorate([
    (0, graphql_1.Resolver)(() => form_entity_1.Form),
    __metadata("design:paramtypes", [forms_service_1.FormsService])
], FormsResolver);
//# sourceMappingURL=forms.resolver.js.map