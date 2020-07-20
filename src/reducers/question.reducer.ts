/**
@author
Jordon Hill
*/

import { QuestionState } from '.';
import { QuestionActionPayload, questionActionTypes } from '../actions/question.actions';
import { Action } from 'redux';


const initialState: QuestionState = {
    collectedQuestions: [],
    storeQuestion: JSON.parse((localStorage.getItem('question')) || '{}'),
}

export const questionReducer = (state: QuestionState = initialState,
    action: QuestionActionPayload & Action) => {

    switch (action.type) {
        case questionActionTypes.POST_QUESTION: {
            let questionArray = state.collectedQuestions;
            if (!state.collectedQuestions.some(q =>
                q.title === action.payload.question.title)) {
                questionArray = [...questionArray, action.payload.question]
                    .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
            }
            return {
                ...state,
                collectedQuestions: questionArray
            }
        }
        case questionActionTypes.CLICK_QUESTION: {
            return {
                ...state,
                storeQuestion: action.payload.question
            }
        }
        default: {
            return state;
        }
    }
}