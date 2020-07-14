import Axios from 'axios';
import { Question} from '../models/question';

interface ServerQuestion {
    title: string;
    content: string;
    creation_date: Date;
    status: boolean;
    user_id: number
}

export const getAllQuestionsByUserId = async (id: number) => {
    const response = await Axios.get<ServerQuestion[]>(`/questions/user/${id}`);
    let questions: Question[] = [];
    for (let i = 0; i < response.data.length; i++) {
        const question: Question = {
            title: response.data[i].title,
            content: response.data[i].content,
            creationDate: response.data[i].creation_date,
            status: response.data[i].status,
            userId: response.data[i].user_id
        }
        questions.push(question);
    }
    return questions;
}

export const getAllUnconfirmedQuestions = async () => {
    const response = await Axios.get<ServerQuestion[]>(`/questions/unconfirmed`);
    let questions: Question[] = [];
    for (let i = 0; i < response.data.length; i++) {
        const question: Question = {
            title: response.data[i].title,
            content: response.data[i].content,
            creationDate: response.data[i].creation_date,
            status: response.data[i].status,
            userId: response.data[i].user_id
        }
        questions.push(question);
    }
    return questions;
}

export const getQuestionByQuestionId = async (id: number) => {
    const response = await Axios.get<ServerQuestion>(`/questions/${id}`);
    const question: Question = {
        title: response.data.title,
        content: response.data.content,
        creationDate: response.data.creation_date,
        status: response.data.status,
        userId: response.data.user_id
    }
    return question;
}

export const postQuestion = async (question: Question) => {
    const response = await Axios.post<ServerQuestion>(`/questions`, question);
    const serverQuestion: Question = {
        title: response.data.title,
        content: response.data.content,
        creationDate: response.data.creation_date,
        status: response.data.status,
        userId: response.data.user_id
    }
    return serverQuestion;
}

export const updateStatus = async (question: Question) => {
    const response = await Axios.post<ServerQuestion>(`/questions`, question);
    const serverQuestion: Question = {
        title: response.data.title,
        content: response.data.content,
        creationDate: response.data.creation_date,
        status: response.data.status,
        userId: response.data.user_id
    }
    return serverQuestion;
}