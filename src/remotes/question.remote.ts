/**
@author
Jordon Hill
*/

import Axios from 'axios';
import { internalAxios } from './internal.axios'
import { Question} from '../models/question';
import { Answer } from '../models/answer';

export const getAllRecentQuestions = async () => {
    const response = await Axios.get<Question[]>(`/questions`);
    return response.data.map((q) => {
        q.creationDate = new Date(q.creationDate);
        return q;
    });
}

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

export const updateStatus = async (question: Question) => {
    const response = await Axios.post<Question>(`/questions`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const postQuestion = async (question: Question) => {
    const response = await internalAxios.post<Question>(`/questions`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}

export const postAnswer = async (answer: Answer) => {
    const response = await internalAxios.post<Answer>(`/answers`, answer);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}