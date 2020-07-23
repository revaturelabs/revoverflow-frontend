/**
@author
Jordon Hill
*/

import { internalAxios } from './internal.axios'
import { Question } from '../models/question';
import { Answer } from '../models/answer';

export const getAnswersByUserId = async (id: number, size: number, page: number) => {
    const response = await internalAxios.get<Question[]>(`/answers/user/${id}?size=${size}&page=${page}`);
    return response.data;
}

export const getAnswerByAnswerId = async (id: number) => {
    const response = await internalAxios.get<Answer>(`/answers/id/${id}`);
    return response.data;
}

export const getAnswersByQuestionId = async (id: number, size: number, page: number) => {
    const response = await internalAxios.get<Question[]>(`/answers/${id}?size=${size}&page=${page}`);
    return response.data;
}

