import { Question } from '../models/question';
import { combineReducers } from 'redux';
import { questionReducer } from './question.reducer';

export interface IState {
    questionState: QuestionState;
}

export interface QuestionState {
    collectedQuestions: Question[];

}

export const state = combineReducers ({
    questionState: questionReducer
})
