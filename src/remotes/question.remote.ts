/**
@author
Jordon Hill
*/

import Axios from 'axios';
import { internalAxios } from './internal.axios'
import { Question} from '../models/question';
// import draftToHtml from 'draftjs-to-html';

export const getAllRecentQuestions = async () => {
    const response = await Axios.get<Question[]>(`/questions`);
    return response.data.map((q) => {
        q.creationDate = new Date(q.creationDate);
        return q;
    });
}
// different get questionsByUserId function, converts the text content.
// text content would have to be parsed before being displayed on the page still

// export const  getQuestionsByUserId = async (id: number) => {
//     const response = await Axios.get<Question[]>(`/questions/user/${id}`);
//     return response.data.map(questions => {
//         questions.content = draftToHtml(JSON.parse(questions.content));
//         return questions;
//     });
// }

export const getAllQuestionsByUserId = async (id: number) => {
    const response = await Axios.get<Question[]>(`/questions/${id}`);
    return response.data.map((q) => {
        q.creationDate = new Date(q.creationDate);
        return q;
    });
}

export const getAllUnconfirmedQuestions = async () => {
    const response = await Axios.get<Question[]>(`/questions/unconfirmed`);
    return response.data.map((q) => {
        q.creationDate = new Date(q.creationDate);
        return q;
    });
}

export const getQuestionByQuestionId = async (id: number) => {
    const response = await Axios.get<Question>(`/question?questionId=1`);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const postQuestion = async (question: Question) => {
    const response = await internalAxios.post<Question>(`/questions`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const updateStatus = async (question: Question) => {
    const response = await Axios.post<Question>(`/questions`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}