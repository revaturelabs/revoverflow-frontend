import React, { useState } from 'react';
import { Button,Modal,TextareaAutosize,TextField, InputLabel } from '@material-ui/core';

export interface PostQuestionComponentProps {
        title: string;
        body: string;
        userID:number
        saveQuestion: (title:string, body:string, userID:number) => void;
    }

export const PostQuestionComponent:React.FC<PostQuestionComponentProps> = (props)=>{
    const [title, setTitle] = useState<string>();
    const [body, setBody] = useState<string>();
    //const [dueDate, setDueDate] = useState<string>();
    //const [project, setProject] = useState<string>();//stretch goal?
    function handleTitleChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {    setTitle(e.target.value);  }
    function handleBodyChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {   let qBody = '<pre>' + e.target.value + '</pre>';//the "pre" tag maintains spacing and formatting
        setBody(qBody);  }
    /*function handledueDateChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {    setDueDate(e.target.value);  }
    function handleProjectChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {    setProject(e.target.value);  }*/
    const createQuestion = async () => {
        props.saveQuestion(title,body,props.userID);
        this.close;
    }
    return(//modal automatically opens and must be closed using the "cancel" button
        <Modal aria-labelledby="Post Question" open={true} disableBackdropClick={true}>
            <form>
                <TextField id="title" label="Title" variant="filled" onChange={() => handleTitleChange}/>
                {/*<TextField id="dueDate" label="Due Date" variant="filled" onChange={() => handledueDateChange}/>
                <TextField id="project" label="Project" variant="filled" onChange={() => handleProjectChange}/>*/}
                <InputLabel>Type Question Here</InputLabel>
                <TextareaAutosize id="body" rowsMin={10} onChange={() => handleBodyChange}/>
                <span>
                    <Button onClick={() => createQuestion()}>Submit</Button>
                    <Button onClick={() => this.close}>Cancel</Button>
                </span>
            </form>
        </Modal>
    );
}
// This will map a state value to a property that this component will get access to
// Functionally the 'clicks' prop will reflect the state of the clickerState.clicks
const mapStateToProps = (state: IState) => {
    return {
        userID: state.userState.userID
    }
}
// connect will connect the component to the store, suppling all requested props
export default connect(mapStateToProps, mapDispatchToProps)(PostQuestionComponent);