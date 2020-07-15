/*
    @author Ezan M. Kodjo
    7/9/2020
    Revature 
*/
import React from 'react';
import { Button,InputLabel } from '@material-ui/core';
import { useHistory } from 'react-router';

export interface PostAnswerComponentProps {
       // userID?:number;//mapped
        //postAnswer: (answer:Answer) => void;
    }

export const PostAnswerComponent: React.FC<PostAnswerComponentProps> = (props) =>{
    const history = useHistory();
    const createAnswer = async () => {
        history.push('/forum');
    }
    return(
        <React.Fragment>
            <form>
            <InputLabel>Type Answer Here</InputLabel>
                {/*<TextareaAutosize id="body" rowsMin={10} onChange={() => handleBodyChange}/>*/}
                <span>
                    <Button onClick={() => createAnswer()}>Submit</Button>
                </span>
            </form>
        </React.Fragment>
    );
}