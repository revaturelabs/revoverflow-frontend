import { Dispatch } from 'react';
import { Action } from 'redux';
import { Question } from '../models/question';

export const questionActionTypes = {
    POST_QUESTION: 'POST_QUESTION',
    CLICK_QUESTION: 'CLICK_QUESTION'
}

export interface QuestionActionPayload {
    payload: {
        question: Question
    }
}

export const postQuestion = (question: Question) => (dispatch: Dispatch<QuestionActionPayload & Action>) => {
    dispatch({
        type: questionActionTypes.POST_QUESTION,
        payload: {
            question
        }
    });
}

export const clickQuestion = (question: Question) => (dispatch: Dispatch<QuestionActionPayload & Action>) => {
    dispatch({
        type: questionActionTypes.CLICK_QUESTION,
        payload: {
            question
        }
    });
}