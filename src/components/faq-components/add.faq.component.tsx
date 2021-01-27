// import { Input } from "@material-ui/core";
// import React, { useState, FC } from "react";
// import { Answer } from "../../models/answer";
// import { Question } from "../../models/question";

// export interface AddFAQComponentProps{
  
// }


// export const AddFAQComponent: React.FC<AddFAQComponentProps> = (props) => {
//   const [question, setQuestion] = useState<Question>();
//   const [answer, setAnswer] = useState<Answer>();

//   const submitFAQ = (question:string, answer:string) =>{
//     console.log("submitting FAQ")
//     console.log("with question" + question)
//     console.log("with answer" + answer)
//   }

//   return (
//     <form id="addFAQForm" onSubmit={() =>submitFAQ}>
//       <label>Question:</label>
//       <input type="text" id="questionInput" />
//       <label>Answer:</label>
//       <input type="text" id="answerInput" />
//       <button type="submit" id="submitFAQButton"/>
//     </form>
//   );
// };

import classes from "*.module.css";
import { Backdrop, Card, Input } from "@material-ui/core";
import axios from "axios";
import React, { useState, FC, HtmlHTMLAttributes, SyntheticEvent, useEffect } from "react";
import { StringDecoder } from "string_decoder";
import { Answer } from "../../models/answer";
import { Question } from "../../models/question";

//pass in null if there is no default question
export interface AddFAQComponentProps {
  defaultQuestion?:string
}

export const AddFAQComponent: React.FC<AddFAQComponentProps> = (props) => {
  const [question, setQuestion] = useState<String>('');
  const [answer, setAnswer] = useState<String>('');

  //get the truthiness of the defaultQuestion
  let defaultQuestionProvided:boolean = (props.defaultQuestion)?true:false;

  //if there is a default question set our question equal to it
  useEffect(() => {
    console.log("defaultQuestionProvided is " + defaultQuestionProvided)
    setQuestion(props.defaultQuestion ?? '')
  },[])

  const handleQuestionChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log('Changing question')
    setQuestion(e.target.value)
  }
  const handleAnswerChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log('Changing Answer')
    setAnswer(e.target.value)
  }

  const submitFAQ = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submitting FAQ");
    console.log("with question " + question);
    console.log("with answer " + answer);
    //make an axios request to /faqs
    //TODO refactor this
    try {
      axios
        .post(
          `http://localhost:8080/faq`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
        });
    } catch (e) {
    }


  };

  return (
    <Card>
    <form id="addFAQForm" onSubmit={submitFAQ}>
      <label>Question:</label>
      <input type="text" id="questionInput" onChange={handleQuestionChange} placeholder="Enter your Question"/>
      <label>Answer:</label>
      <input type="text" id="answerInput" onChange={ handleAnswerChange} placeholder="Enter your Answer"/>
      <button type="submit" id="submitFAQButton"> Submit </button>
    </form>
    </Card>
  );
};
