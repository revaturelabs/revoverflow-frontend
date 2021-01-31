import classes from "*.module.css";
import { Backdrop, Card, Input } from "@material-ui/core";
import axios from "axios";
import React, { useState, FC, HtmlHTMLAttributes, SyntheticEvent, useEffect } from "react";
import { StringDecoder } from "string_decoder";
import { Answer } from "../../models/answer";
import { Question } from "../../models/question";
import { addToFAQ } from "../../remotes/faquestion.remote";

//pass in null if there is no default question
export interface AddFAQComponentProps {
  defaultQuestion:String
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
  }, [props.defaultQuestion])

  const handleQuestionChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log('Changing question')
    setQuestion(e.target.value)
  }
  const handleAnswerChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log('Changing Answer')
    setAnswer(e.target.value)
  }

  const submitFAQ = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submitting FAQ");
    console.log("with question " + question);
    console.log("with answer " + answer);
    //make an axios request to /faqs
    //TODO refactor this
    try {
     let submitToFAQ = await addToFAQ(question,answer,'toronto');
     console.log(submitToFAQ);
    } catch (e) {
    }


  };

  return (
    <Card onClick={(e) => e.stopPropagation()}>
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
