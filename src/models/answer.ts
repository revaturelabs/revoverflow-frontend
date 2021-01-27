/**
 * @file Defining user model
 * @author Yurrian Pierre-Boyer
 */

/**
  * Answer state has an id: number, content: string, creationDate: Date, questionId: number, userId: number
  */
export interface Answer {
    id: number;
    content: string;
    creationDate: Date;
    questionId: number;
    userId: number;
}
