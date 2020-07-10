import React, { useState } from 'react';
import { Button,Modal,TextareaAutosize,TextField } from '@material-ui/core';


export interface AskQComponentProps {
        title: string;
        body: string; 
        createAnswer: (body:string, userID:number) => a:Answer;
    }

export const AskQComponent:React.FC = ()=>{
    const [body, setBody] = useState<string>();
    function handleBodyChange(e: { target: { value: React.SetStateAction<string | undefined>; }; }) 
    {   let qBody = '<pre>' + e.target.value + '</pre>';//the "pre" tag maintains spacing and formatting
        setBody(qBody);  }
    const createAnswer = async () => {
        props.saveAnswer(body,props.userID);
    }
    return(
        <Modal>
            <form>
                <TextareaAutosize id="body" varient="filled"placeholder="Answer Question Here" rowsMin={10} onChange={() => handleBodyChange}/>
                <Button onClick={() => createAnswer()}>Submit</Button>
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