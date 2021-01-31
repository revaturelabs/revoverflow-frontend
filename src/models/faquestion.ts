/**
 * @file Defining frequently asked question  model
 * @author Ramninder Singh
 */

import { Answer } from "./answer";
import { Question } from "./question";



export interface FAQuestion{
    userId:number,
    question: Question,
    answer: Answer
}