import { Card, } from "@material-ui/core";
import axios from "axios";
import { ContentState, convertFromRaw, Editor, EditorState, RichUtils } from "draft-js";
import React, { useState, FC, useEffect } from "react";
import { AnswerRichTextEditorComponent } from "../pages/forum-components/rich-text-editor-component/answer-draftjs";
import { RichTextEditorComponent } from "../pages/forum-components/rich-text-editor-component/draftjs";
import { RichTextBoxComponent } from "../rich-text-box-component";

const styleMap = {
  'HIGHLIGHT': {
      padding: 4,
      'backgroundColor': '#D3D3D3'
  }
};

//pass in if there is no default question
export interface AddFAQComponentProps {
  defaultQuestion?:string
}

export const AddFAQComponent: React.FC<AddFAQComponentProps> = (props) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [defaultQuestionProvided, setDefaultQuestionProvided] = useState<boolean>(false)
  
  //if there is a default question set our question equal to it
  useEffect(() => {
    //get the truthiness of the defaultQuestion
    setDefaultQuestionProvided((props.defaultQuestion)?true:false)
    console.log("defaultQuestionProvided is " + props.defaultQuestion)
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
    <Card onClick={(e) => e.stopPropagation()}> 
      <form id="addFAQForm" onSubmit={submitFAQ}>
        <RichTextBoxComponent/>
        <label>Question:</label>
        <input type="text" id="questionInput" value={question} onChange={handleQuestionChange} placeholder="Enter your Question"
            disabled={defaultQuestionProvided}/>
        <label>Answer:</label>
        <input type="text" id="answerInput" value={answer} onChange={ handleAnswerChange} placeholder="Enter your Answer"/>
        <button type="submit" id="submitFAQButton"> Submit </button>
      </form>
    </Card>
  );
};
