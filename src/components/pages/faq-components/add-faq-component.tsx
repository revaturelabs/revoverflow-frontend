import { Button, Card } from "@material-ui/core";
import axios from "axios";
import {
  ContentBlock,
  ContentState,
  convertFromRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import React, { useState, FC, useEffect } from "react";
import { Answer } from "../../../models/answer";
import { Question } from "../../../models/question";
import { addToFAQ, getAllFAQ } from "../../../remotes/faquestion.remote";
import { AnswerRichTextEditorComponent } from "../forum-components/rich-text-editor-component/answer-draftjs";
import { RichTextEditorComponent } from "../forum-components/rich-text-editor-component/draftjs";
import { RichTextBoxComponent } from "../../rich-text-box-component";

const styleMap = {
  HIGHLIGHT: {
    padding: 4,
    backgroundColor: "#D3D3D3",
  },
};

const style ={
  card:{
    width:"60vw",
    height:"80vh",
    padding: "2rem",
    justify: "flex-start"

  },
  cardBoxes: {
    width:"100%",
    backgroundColor:"lightgray",
    margin:"1rem",
    // alignItems:"left",
    // justifyContent:"left"
  },
  label:{
    fontSize: "1.2rem",
    width:"100%"
  }
}

//pass in if there is no default question
export interface AddFAQComponentProps {
  defaultQuestion?: any;
}

export const AddFAQComponent: React.FC<AddFAQComponentProps> = (props) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionBody, setQuestionBody] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [
    defaultQuestionProvided,
    setDefaultQuestionProvided,
  ] = useState<boolean>(false);

  //if there is a default question set our question equal to it
  useEffect(() => {
    //get the truthiness of the defaultQuestion
    setDefaultQuestionProvided(props.defaultQuestion ? true : false);
  }, [props.defaultQuestion]);

  const handleQuestionTitleChange = (e: string) => {
    console.log("Changing question title");
    console.log(e);
    setQuestionTitle(e);
    // setQuestionTitle(e.target.value)
  };
  const handleQuestionBodyChange = (e: string) => {
    console.log("Changing question body");
    console.log(e);
    setQuestionBody(e);
    // setQuestionTitle(e.target.value)
  };
  const handleAnswerChange = (e: string) => {
    console.log("Changing Answer");
    console.log(e);
    setAnswer(e);
    // setAnswer(e.target.value)
  };

  const submitFAQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //dont remove this we need if for the test
    console.log("submitting FAQ");
    console.log(e.target);
    // if (!defaultQuestionProvided) {
      try {
        let q: Question = {
          id: 0,
          acceptedId: 0,
          title: questionTitle,
          content: questionBody,
          creationDate: new Date(),
          status: true,
          userID: 0, //TODO get current user
        };

        let a: Answer = {
          id: 0,
          content: answer,
          creationDate: new Date(),
          questionId: 0,
          userId: 1,
        };
        let submitToFAQ = await addToFAQ(q, a);
        let getAll = await getAllFAQ();
        console.log(submitToFAQ);
        console.log(getAll);
      } catch (e) {
        console.log(e);
      }
    // } else {
    //   console.log("get question from redux");
    // }
  };

  return (
    <Card style={style.card} onClick={(e) => e.stopPropagation()}>
      <form id="addFAQForm" onSubmit={submitFAQ}>
        <div className="cardBoxes" style={style.cardBoxes}>
          <label style={style.label} >Title</label>
          <RichTextBoxComponent
            defaultText={props.defaultQuestion?.title}
            id="questionTitleInput"
            handleChange={handleQuestionTitleChange}
            />
        </div>
     

        <div className="cardBoxes" style={style.cardBoxes}>
          <label style={style.label}>Body</label>
          <RichTextBoxComponent
            defaultText={props.defaultQuestion?.content}
            placeholder={"Question Body"}
            id="questionBodyInput"
            handleChange={handleQuestionBodyChange}
            />
        </div>
        
          {/* <input type="text" id="questionInput" value={question} onChange={handleQuestionChange} placeholder="Enter your Question"
              disabled={defaultQuestionProvided}/> */}

        <div className="cardBoxes" style={style.cardBoxes}>
          <label style={style.label}>Answer</label>
        <RichTextBoxComponent
          id="answerInput"
          handleChange={handleAnswerChange}
        />
        </div>
        
        {/* <input type="text" id="answerInput" value={answer} onChange={ handleAnswerChange} placeholder="Enter your Answer"/> */}
        <Button type="submit" id="submitFAQButton" disabled={false}>
          {" "}
          Submit{" "}
        </Button>
      </form>
    </Card>
  );
};
