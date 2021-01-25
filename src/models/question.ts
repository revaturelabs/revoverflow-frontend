/**
 * @file Defining user model
 * @author Yurrian Pierre-Boyer
 */

 /**
  * Question takes in an
  * id: number,
  * acceptedId: number,
  * title: string,
  * content: string,
  * creationDate: Date,
  * status: boolean,
  * userID:number
  */
export interface Question {
    id: number;
    acceptedId: number;
    title: string;
    content: string;
    creationDate: Date;
    status: boolean;
    userID: number;
}
