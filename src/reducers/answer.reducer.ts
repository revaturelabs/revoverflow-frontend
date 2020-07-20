import { AnswerState } from '.';
import { AnswerActionPayload, answerActionTypes } from '../actions/answer.actions';
import { Action } from 'redux';

const initialState: AnswerState = {
    collectedAnswers: JSON.parse((localStorage.getItem('answers')) || '{}'),
    storeAnswer: JSON.parse((localStorage.getItem('selectedAnswer')) || '{}')
}

export const answerReducer = (state: AnswerState = initialState,
    action: AnswerActionPayload & Action) => {

    switch (action.type) {
        case answerActionTypes.POST_ANSWER: {
            let answerArray = state.collectedAnswers;
            answerArray = [...answerArray, action.payload.answer]
                .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
            return {
                ...state,
                collectedAnswers: answerArray
            }
        }
        case answerActionTypes.ACCEPT_ANSWER: {
            return {
                ...state,
                storeAnswer: action.payload.answer
            }
        }
        default: {
            return state;
        }
    }
}