import { describe, it, expect, beforeEach } from 'vitest';
import {
  formBuilderReducer,
  setTitle,
  addQuestion,
  updateQuestion,
  removeQuestion,
  resetForm,
} from './formBuilderSlice';
import type { DraftForm } from '@/types/form.types';

describe('formBuilderSlice reducer', () => {
  let initialState: DraftForm;

  beforeEach(() => {
    initialState = {
      title: '',
      description: '',
      questions: [],
    };
  });

  it('should handle initial state', () => {
    expect(formBuilderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setTitle', () => {
    const actual = formBuilderReducer(initialState, setTitle('My New Form'));
    expect(actual.title).toEqual('My New Form');
  });

  it('should handle addQuestion', () => {
    const actual = formBuilderReducer(initialState, addQuestion('TEXT'));
    expect(actual.questions.length).toEqual(1);
    expect(actual.questions[0].type).toEqual('TEXT');
    expect(actual.questions[0].id).toBeDefined();
    expect(actual.questions[0].required).toEqual(false);
  });

  it('should handle updateQuestion', () => {
    const stateWithQuestion = formBuilderReducer(initialState, addQuestion('TEXT'));
    const questionId = stateWithQuestion.questions[0].id;

    const updatedState = formBuilderReducer(
      stateWithQuestion,
      updateQuestion({ id: questionId, changes: { text: 'What is your bio?', required: true } })
    );

    expect(updatedState.questions[0].text).toEqual('What is your bio?');
    expect(updatedState.questions[0].required).toEqual(true);
    expect(updatedState.questions[0].type).toEqual('TEXT'); 
  });

  it('should handle removeQuestion', () => {
    const stateWithQuestion = formBuilderReducer(initialState, addQuestion('CHECKBOX'));
    const questionId = stateWithQuestion.questions[0].id;

    const emptyState = formBuilderReducer(stateWithQuestion, removeQuestion(questionId));

    expect(emptyState.questions.length).toEqual(0);
  });

  it('should handle resetForm', () => {
    const dirtyState: DraftForm = {
      title: 'Dirty',
      description: 'State',
      questions: [{ id: '1', text: 'Q1', type: 'TEXT', required: false, options: [] }],
    };

    const resetState = formBuilderReducer(dirtyState, resetForm());
    expect(resetState).toEqual(initialState);
  });
});
