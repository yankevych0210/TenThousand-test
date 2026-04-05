import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Form } from "../common/entities/form.entity";
import { Question } from "../common/entities/question.entity";
import { CreateFormInput } from "./dto/create-form.input";
import { UpdateFormInput } from "./dto/update-form.input";
import { QuestionInput } from "./dto/question.input";

@Injectable()
export class FormsService {
  private readonly forms = new Map<string, Form>();

  findAll(): Form[] {
    return Array.from(this.forms.values()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  findOne(id: string): Form {
    const form = this.forms.get(id);
    if (!form) {
      throw new NotFoundException(`Form with id "${id}" not found`);
    }
    return form;
  }

  create(input: CreateFormInput): Form {
    const questions: Question[] = (input.questions ?? []).map(
      (q: QuestionInput) => ({
        id: q.id || uuidv4(),
        text: q.text,
        type: q.type,
        options: q.options ?? null,
        required: q.required,
      }),
    );

    const form: Form = {
      id: uuidv4(),
      title: input.title,
      description: input.description ?? null,
      questions,
      createdAt: new Date().toISOString(),
    };

    this.forms.set(form.id, form);
    return form;
  }

  update(id: string, input: UpdateFormInput): Form {
    const form = this.findOne(id);

    if (input.title !== undefined) form.title = input.title;
    if (input.description !== undefined) form.description = input.description;

    if (input.questions) {
      form.questions = input.questions.map((q: QuestionInput) => ({
        id: q.id || uuidv4(),
        text: q.text,
        type: q.type,
        options: q.options ?? null,
        required: q.required,
      }));
    }

    this.forms.set(form.id, form);
    return form;
  }

  remove(id: string): string {
    const form = this.findOne(id);
    this.forms.delete(id);
    return id;
  }
}
