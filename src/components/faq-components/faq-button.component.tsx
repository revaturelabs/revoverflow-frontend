import React, { useState, FC } from "react";
import { Answer } from "../../models/answer";
import { Question } from "../../models/question";
import AddCircleIcon from '@material-ui/icons/AddCircle';
interface FAQButtonComponentProps{

}


export const FAQButtonComponent: React.FC<FAQButtonComponentProps> = (props) => {
    const [question, setQuestion] = useState<Question>();
    const [answer, setAnswer] = useState<Answer>();
  
    const addQuestionToFAQ = () =>{
      console.log("submitting FAQ")
      
    }
  
    return (
     
            <AddCircleIcon onClick={addQuestionToFAQ} id="addQuestionFAQButton"/>
      
    );
  };
  