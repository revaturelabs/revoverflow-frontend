import React, { useState } from 'react';
import { Button,Modal,TextareaAutosize,TextField } from '@material-ui/core';

export interface AskQComponentProps {
        title: string;
        body: string;
        createQuestion: (title:string, body:string, userID:number) => q:question;
    }

export const AskQComponent:React.FC = ()=>{
    const [title, setTitle] = useState<string>();
    const [body, setBody] = useState<string>();
    const [dueDate, setDueDate] = useState<string>();
    const [project, setProject] = useState<string>();//stretch goal?
    function handleTitleChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {    setTitle(e.target.value);  }
    function handleBodyChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {   let qBody = '<pre>' + e.target.value + '</pre>';//the "pre" tag maintains spacing and formatting
        setBody(qBody);  }
    function handledueDateChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {    setDueDate(e.target.value);  }
    function handleProjectChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {    setProject(e.target.value);  }
    const createQuestion = async () => {
        props.saveQuestion(title,body,props.userID);
    }
    return(
        <Modal>
            <form>
                <TextField id="title" label="Title" variant="filled" onChange={() => handleTitleChange}/>
                <TextField id="dueDate" label="Due Date" variant="filled" onChange={() => handledueDateChange}/>
                <TextField id="project" label="Project" variant="filled" onChange={() => handleProjectChange}/>
                <TextareaAutosize id="body" varient="filled"placeholder="Question Body" rowsMin={10} onChange={() => handleBodyChange}/>
                <Button onClick={() => createQuestion()}>Submit</Button>
            </form>
        </Modal>
    );
}
// This will map a state value to a property that this component will get access to
// Functionally the 'clicks' prop will reflect the state of the clickerState.clicks
const mapStateToProps = (state: IState) => {
    return {
        //clicks: state.clickerState.clicks
    }
}
// connect will connect the component to the store, suppling all requested props
export default connect(mapStateToProps, mapDispatchToProps)(AskQComponent);