import { Button, Card, } from "@material-ui/core";
import axios from "axios";
import { ContentBlock, ContentState, convertFromRaw, Editor, EditorState, RichUtils } from "draft-js";
import React, { useState, FC, useEffect } from "react";
import { Question } from "../../models/question";
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
  defaultQuestion?:any
}

export const AddFAQComponent: React.FC<AddFAQComponentProps> = (props) => {
  // const [questionTitle, setQuestionTitle] = useState<string>('');
  // const [questionBody, setQuestionBody] = useState<string>('');
  // const [answer, setAnswer] = useState<string>('');
  const [defaultQuestionProvided, setDefaultQuestionProvided] = useState<boolean>(false)
  
  //if there is a default question set our question equal to it
  useEffect(() => {
    //get the truthiness of the defaultQuestion
    setDefaultQuestionProvided((props.defaultQuestion)?true:false)
    // setQuestionTitle(props.defaultQuestion ?? '')
  }, [props.defaultQuestion])

  // const handleQuestionChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  //   console.log('Changing question')
  //   setQuestionTitle(e.target.value)
  // }
  // const handleAnswerChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  //   console.log('Changing Answer')
  //   setAnswer(e.target.value)
  // }


  const submitFAQ = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //dont remove this we need if for the test
    console.log("submitting FAQ");
    // console.log("with question title " + questionTitle);
    // console.log("with question body " + questionBody);
    // console.log("with answer " + answer);
    //make an axios request to /faqs
    //TODO refactor this

  };
  
  
  return (
    <Card onClick={(e) => e.stopPropagation()}> 
      <form id="addFAQForm" onSubmit={submitFAQ}>
        <label>Question:</label>
        <RichTextBoxComponent defaultText={props.defaultQuestion?.title} id="questionTitleInput"/>
        <RichTextBoxComponent defaultText={props.defaultQuestion?.content} id="questionBodyInput"/>
        {/* <input type="text" id="questionInput" value={question} onChange={handleQuestionChange} placeholder="Enter your Question"
            disabled={defaultQuestionProvided}/> */}
        <label>Answer:</label>
        <RichTextBoxComponent id="answerInput"/>
        {/* <input type="text" id="answerInput" value={answer} onChange={ handleAnswerChange} placeholder="Enter your Answer"/> */}
        <Button type="submit" id="submitFAQButton" disabled={false}> Submit </Button>
      </form>
    </Card>
  );
};
