import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type {
  DraftForm,
  DraftQuestion,
  QuestionType,
} from "@/types/form.types";

const initialState: DraftForm = {
  title: "",
  description: "",
  questions: [],
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    addQuestion(state, action: PayloadAction<QuestionType>) {
      const question: DraftQuestion = {
        id: uuidv4(),
        text: "",
        type: action.payload,
        options:
          action.payload === "TEXT" || action.payload === "DATE"
            ? []
            : ["Option 1"],
        required: false,
      };
      state.questions.push(question);
    },
    updateQuestion(
      state,
      action: PayloadAction<{ id: string; changes: Partial<DraftQuestion> }>,
    ) {
      const question = state.questions.find((q) => q.id === action.payload.id);
      if (question) {
        Object.assign(question, action.payload.changes);
      }
    },
    removeQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },
    addOption(state, action: PayloadAction<string>) {
      const question = state.questions.find((q) => q.id === action.payload);
      if (question) {
        question.options.push(`Option ${question.options.length + 1}`);
      }
    },
    updateOption(
      state,
      action: PayloadAction<{
        questionId: string;
        index: number;
        value: string;
      }>,
    ) {
      const question = state.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (question && question.options[action.payload.index] !== undefined) {
        question.options[action.payload.index] = action.payload.value;
      }
    },
    removeOption(
      state,
      action: PayloadAction<{ questionId: string; index: number }>,
    ) {
      const question = state.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (question) {
        question.options.splice(action.payload.index, 1);
      }
    },
    moveQuestion(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.questions.splice(fromIndex, 1);
      if (removed) {
        state.questions.splice(toIndex, 0, removed);
      }
    },
    resetForm() {
      return initialState;
    },
    initForm(_state, action: PayloadAction<DraftForm>) {
      return action.payload;
    },
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  updateQuestion,
  removeQuestion,
  addOption,
  updateOption,
  removeOption,
  moveQuestion,
  resetForm,
  initForm,
} = formBuilderSlice.actions;

export const formBuilderReducer = formBuilderSlice.reducer;
