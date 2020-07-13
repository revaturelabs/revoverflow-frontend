import { Dispatch } from 'react';
import { Action } from 'redux';
import { Question } from '../models/question';

export const questionActionTypes = {
    POST_QUESTION: 'POST_QUESTION'
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