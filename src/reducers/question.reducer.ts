import { QuestionState } from '.';
import { QuestionActionPayload, questionActionTypes } from '../actions/question.actions';
import { Action } from 'redux';

const initialState: QuestionState = {
   collectedQuestions: []
}

export const questionReducer = (state: QuestionState = initialState,
    action: QuestionActionPayload & Action) => {

        switch(action.type) {
            case questionActionTypes.POST_QUESTION: {
                let questionArray = state.collectedQuestions;
                if (!state.collectedQuestions.some(q => 
                    q.title === action.payload.question.title)) {
                        questionArray = [...questionArray, action.payload.question]
                            .sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());
                    }
                    return {
                        ...state,
                        collectedQuestions: questionArray
                    }
                }
                default: {
                    return state;
                }
            }
    }