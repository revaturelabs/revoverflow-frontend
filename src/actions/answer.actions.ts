import { Dispatch } from 'react';
import { Action } from 'redux';
import { Answer } from '../models/answer';

export const answerActionTypes = {
    POST_ANSWER: 'POST_ANSWER',
    ACCEPT_ANSWER: "ACCEPT_ANSWER"
}

export interface AnswerActionPayload {
    payload: {
        answer: Answer
    }
}

export const postAnswer = (answer: Answer) => (dispatch: Dispatch<AnswerActionPayload & Action>) => {
    dispatch({
        type: answerActionTypes.POST_ANSWER,
        payload: {
            answer
        }
    });
}

export const acceptAnswer = (answer: Answer) => (dispatch: Dispatch<AnswerActionPayload & Action>) => {
    dispatch({
        type: answerActionTypes.ACCEPT_ANSWER,
        payload: {
            answer
        }
    });
}