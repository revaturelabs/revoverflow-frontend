/**
@author
Jordon Hill
*/

import { authAxios } from './internal.axios'
import { Question} from '../models/question';
import { Answer } from '../models/answer';

/**
 *  This method gets called in @function saveQuestion() in draft.tsx on line 102.
 *  The method sends a post request to the backend and response.data.creationDate gets formated to the date object here
 *  @param, question
 *  @returns question: Question
 */
export const postQuestion = async (question: Question) => {
    const response = await authAxios.post<Question>(`/questions`, question);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}
/**
 *  This method gets called in @function saveAnswer() in answer-draft.tsx on line 97.
 *  This method sends a post request to the backend and formats the data using the Data object
 *  @param, answer: Answer
 *  @returns: answer: Answer
 */
export const postAnswer = async (answer: Answer) => {
    const response = await authAxios.post<Answer>(`/answers`, answer);
    response.data.creationDate = new Date(response.data.creationDate);
    return response.data;
}
/**
 * This method gets called in @function load() in feed-container.components.tsx on line 87
 *  @param size: 10 (a constant variable)
 *  @param page: (the current page the user wants to see)
 *  @param an array of questions
 */
export const getAllQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<any>(`/questions?&size=${size}&page=${page}`);
    return response.data;
}
/**
 * This method gets called in @function load() in the feed-container.components.tsx on line 94 and gets the current users question by the id
 * @param id: the users id from local storage
 * @param size: 10 (const)
 * @param page: the page number type; is number
 * @returns: a list of questions made by the user
 */
export const getQuestionsByUserId = async (id: number, size: number, page: number ) => {
    const response = await authAxios.get<Question[]>(`/questions/user/${id}?size=${size}&page=${page}`);
    return response.data;
}
/**
 * This method gets called in @function load() in the feed-container.component.tsx on line 102 and gets all questions with status that equals false
 * @param size: 10 (const)
 * @param page: page to display type number
 * @returns a list of questions
 */
export const getUnconfirmedQuestions = async (size: number, page: number) => {
    const response = await authAxios.get<Question[]>(`questions/status/false?size=${size}&page=${page}`);
    return response.data;
}
/**
 * This method gets called in @function handleRedirectA() on line 61 and @function handleCloseSubmit() form-answer-components on line 105
 * @param id: the question id
 * @returns a question
 */
export const getQuestionByQuestionId = async (id: number) => {
    const response = await authAxios.get<Question>(`/questions/id/${id}`);
    return response.data;
}
/**
 *  This method gets called in @function handleCloseSubmit() in forum-answer.component.tsx
 *  @param questionAcceptedAnswerId type questions
 * @returns a question? line 79 QuestionController.java
 */
export const updateQuestionAcceptedAnswerId = async (questionAcceptedAnswerId: Question) => {
    const response = await authAxios.put<Question>(`/questions`, questionAcceptedAnswerId);
    return response;
}
/**
 * This method gets called in @function confirmAnswer() in the forum-question.component
 * @param questionStatus should be boolean
 * @returns response: a question? line 90 in QuestionController.java
 */
export const updateQuestionStatus = async (questionStatus: any) => {
    const response = await authAxios.put<Question>(`/questions/status`, questionStatus);
    return response;
}

/**
 *  This method gets called in @function ____ in feed-container-component.jsx on line ____
 *  @param size: number (const 10)
 *  @param page: number
 *  @param location: string
 */
export const getAllQuestionsByLocation = async (size: number, page: number, location: string | null) => {
    const response = await authAxios.get<any>(`/questions/location/${location}?&size=${size}&page=${page}`);
    return response.data;
}

/**
 *
 */
export const getAllUserQuestionsByLocation = async (size: number, page: number, location: string | null, userId: number) => {
    const response = await authAxios.get<any>(`/questions/location/${userId}/${location}?&size=${size}&page=${page}`);
    return response.data;
}

//ADDING THIS FOR FAQ STUFF
export const updateQuestionFAQStatus = async (questionStatus: any) => {
    const response = await authAxios.post<Question>(`/questions/faq`, questionStatus);
    return response;
}
