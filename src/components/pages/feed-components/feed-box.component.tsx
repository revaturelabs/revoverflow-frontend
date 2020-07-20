import React from 'react';
import { makeStyles, Box, Card } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Question } from '../../../models/question';
import * as fallbackRemote from '../../../remotes/fallback.remote';


const useStyles = makeStyles({
    boxInternal: {
        marginBottom: 5,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#f26925",
    },
});

interface FeedBoxComponentProps {
    question: any;
    clickQuestion: (question: Question) => void;
}

export const FeedBoxComponent: React.FC<FeedBoxComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const handleRedirectQ = async () => {
        const retrievedAnswers = await fallbackRemote.getAnswersByQuestionId(props.question.id, 10, 0);
        props.clickQuestion(props.question);
        localStorage.setItem("questionId", JSON.stringify(props.question.id));
        localStorage.setItem("question", JSON.stringify(props.question));
        localStorage.setItem("answers", JSON.stringify(retrievedAnswers));
        history.push('/forum');
    }

    const handleRedirectA = async () => {
        const retrievedQuestion = await fallbackRemote.getQuestionByQuestionId(props.question.questionId);
        const retrievedAnswers = await fallbackRemote.getAnswersByQuestionId(props.question.questionId, 10, 0);
        localStorage.setItem("questionId", JSON.stringify(retrievedQuestion.id));
        localStorage.setItem("question", JSON.stringify(retrievedQuestion));
        localStorage.setItem("answers", JSON.stringify(retrievedAnswers));
        props.clickQuestion(retrievedQuestion);
        history.push('/forum');
    }

    //!First box here contains answers not questions, so does its handler deal with answer not questions
    return (
        <Card className={classes.boxInternal}>
            {props.question.questionId ?
                <Box onClick={() => handleRedirectA()} >
                    <p>{props.question.content}</p>
                    <h3>{props.question.userId}</h3>
                    <p>{props.question.creationDate}</p>
                </Box>
                :
                <Box onClick={() => handleRedirectQ()} >
                    <h2>{props.question.title}</h2>
                    <p>{(props.question.content)}</p>
                    <h3>{props.question.userId}</h3>
                    <p>{props.question.creationDate}</p>
            </Box> }
        </Card>
    )
}
