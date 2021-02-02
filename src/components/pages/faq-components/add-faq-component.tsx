import { Button, Card } from "@material-ui/core";
import { ContentState, convertFromRaw } from "draft-js";
import React, { useState, useEffect } from "react";
import { Answer } from "../../../models/answer";
import { Question } from "../../../models/question";
import { addToFAQ, getAllFAQ } from "../../../remotes/faquestion.remote";
import { RichTextBoxComponent } from "../../rich-text-box-component";

const style = {
  card: {
    width: "60vw",
    height: "80vh",
    padding: "2rem",
    boxSizing: "border-box" as "border-box",
    // textAlign: "left"
  },
  cardBoxes1: {
    width: "100%",
    height: "5vh",
    // backgroundColor:"lightgray",
    margin: "1.5rem",
  },
  cardBoxes2: {
    width: "100%",
    height: "22.5vh",
    // backgroundColor:"lightgray",
    margin: "1.5rem",
    // display:"flex"
  },
  cardBoxes3: {
    width: "100%",
    height: "22.5vh",
    // backgroundColor:"lightgray",
    margin: "1.5rem",
    // display:"flex"
  },
  label: {
    fontSize: "1.2rem",
    textAlign: "left" as "left",
    padding: "0",
    margin: "0 0 0.5rem 1.4rem",

    fontWeight: "bold" as "bold",
  },

  title: {
    height: "20%",
  },
  submit: {
    backgroundColor: "#3498db",
    margin: "3.5rem 1rem",
    width: "100%",
    borderRadius: "8px",
  },
};

//pass in if there is no default question
export interface AddFAQComponentProps {
  defaultQuestion?: any;
}

export const AddFAQComponent: React.FC<AddFAQComponentProps> = (props) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionBody, setQuestionBody] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [defaultQuestionProvided, setDefaultQuestionProvided] = useState<boolean>(false);

  //if there is a default question set our question equal to it
  useEffect(() => {
    //get the truthiness of the defaultQuestion
    setDefaultQuestionProvided(props.defaultQuestion ? true : false);
  }, [props.defaultQuestion]);

  const handleQuestionTitleChange = (e: string) => {
    setQuestionTitle(convertFromRaw(JSON.parse(e)).getPlainText());
  };
  const handleQuestionBodyChange = (e: string) => {
    setQuestionBody(e);
  };
  const handleAnswerChange = (e: string) => {
    setAnswer(e);
  };

  const submitFAQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //dont remove this we need if for the test
    console.log("submitting FAQ");
    // if (!defaultQuestionProvided) {
    try {
      let q: Question = {
        id: 0,
        acceptedId: 0,
        title: questionTitle,
        content: questionBody,
        creationDate: new Date(),
        status: true,
        userID: JSON.parse(localStorage.getItem("userId")!),
      };

      let a: Answer = {
        id: 0,
        content: answer,
        creationDate: new Date(),
        questionId: 0,
        userId: JSON.parse(localStorage.getItem("userId")!),
      };
      let submitToFAQ = await addToFAQ(q, a);
      //console.log(submitToFAQ);
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
        <div className="cardBoxes" style={style.cardBoxes1}>
          <p style={style.label}>TITLE</p>
          <RichTextBoxComponent
            defaultText={props.defaultQuestion?.title}
            id="questionTitleInput"
            handleChange={handleQuestionTitleChange}
            placeholder={"Write a descriptive title"}
          />
        </div>

        <div className="cardBoxes" style={style.cardBoxes2}>
          <p style={style.label}>BODY</p>
          <RichTextBoxComponent
            defaultText={props.defaultQuestion?.content}
            placeholder={"Describe your question here"}
            id="questionBodyInput"
            handleChange={handleQuestionBodyChange}
          />
        </div>
        <div className="cardBoxes" style={style.cardBoxes3}>
          <p style={style.label}>ANSWER</p>

          <RichTextBoxComponent
            id="answerInput"
            handleChange={handleAnswerChange}
            placeholder={"Answer"}
          />
        </div>
        <div style={style.submit} className="submitParent">
          <Button
            style={{ color: "black" }}
            type="submit"
            id="submitFAQButton"
            disabled={false}
          >
            {" "}
            Submit{" "}
          </Button>
        </div>
      </form>
    </Card>
  );
};
