import { Answer } from '../models/answer';
import { FAQuestion } from '../models/faquestion';
import { Location } from '../models/location';
import { Question } from '../models/question';
import { authAxios } from './internal.axios'

//Adding FAQs to database.
export const addToFAQ = async (question: String, answer: String, location: String) => {

  let addFAQ ={
        question,
        answer,
        location

    }

    const response = await authAxios.post(`/faq`, addFAQ);
    console.log(response.data);
    return response.data;
}

//Get all FAQs
export const getAllFAQ = async () => {

    const response = await authAxios.get(`/faq`);
    console.log(response.data);
    return response.data;
}

//Get FAQs by location
export const getFAQByLocation = async (location: string) =>{

    const response = await authAxios.get(`/faq/${location}`);
    console.log(response.data);
    return response.data;


}

//Get Revature based FAQs
export const getRevatureBasedFAQ = async() =>{


}