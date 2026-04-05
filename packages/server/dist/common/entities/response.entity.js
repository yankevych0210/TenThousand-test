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
exports.Response = void 0;
const graphql_1 = require("@nestjs/graphql");
const answer_entity_1 = require("./answer.entity");
let Response = class Response {
};
exports.Response = Response;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Response.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Response.prototype, "formId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [answer_entity_1.Answer]),
    __metadata("design:type", Array)
], Response.prototype, "answers", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: "ISO 8601 submission timestamp" }),
    __metadata("design:type", String)
], Response.prototype, "submittedAt", void 0);
exports.Response = Response = __decorate([
    (0, graphql_1.ObjectType)({ description: "A submission response for a form" })
], Response);
//# sourceMappingURL=response.entity.js.map