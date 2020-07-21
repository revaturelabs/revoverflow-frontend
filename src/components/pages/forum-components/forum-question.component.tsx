import React from 'react';
import { makeStyles, Box, Container, Button, Card, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { Question } from '../../../models/question';
import * as fallbackRemote from '../../../remotes/fallback.remote';
import { clickQuestion } from '../../../actions/question.actions';
import { clickConfirm } from '../../../actions/question.actions';


const useStyles = makeStyles({
    boxInternal: {
        marginBottom: 5,
        marginTop: 10,
        borderBottomStyle: "solid",
        borderLeftStyle: "solid",
        borderColor: "#f26925",
        padding: 10
    },
    buttonInternal: {
        color: '#ffffff',
        backgroundColor: '#3498db'
    }
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#3498db',
        },
    },
});

interface ForumQuestionComponentProps {
    storeQuestion: any;
    storeAnswer: any;
    storeConfirm: any;
    clickQuestion: (question: Question) => void;
    clickConfirm: (question: Question, confirm: boolean) => void;
}

export const ForumQuestionComponent: React.FC<ForumQuestionComponentProps> = (props) => {
    const classes = useStyles();
    const admin = (localStorage.getItem("admin"));

    const confirmAnswer = async () => {
        let questionInfo: Question;
        try {
            questionInfo = await fallbackRemote.getQuestionByQuestionId(+JSON.parse(JSON.stringify(localStorage.getItem('questionId'))))
        } catch {
            alert("You encountered an error")
            return;
        }
        const payload = {
            id: questionInfo.id,
            acceptedId: questionInfo.acceptedId,
            title: questionInfo.title,
            content: questionInfo.content,
            creationDate: questionInfo.creationDate,
            editDate: null,
            status: true,
            userID: +JSON.parse(JSON.stringify(localStorage.getItem('userId')))
        };

        try {
            const retrievedQuestion = await fallbackRemote.updateQuestionStatus(payload);
            localStorage.setItem("question", JSON.stringify(retrievedQuestion.data));
            props.clickConfirm(retrievedQuestion.data, true);
            window.location.reload(false);
        } catch {
            alert("You encountered an error")
            return;
        }
    }

    return (
        <ThemeProvider theme={theme} >
            <Container >
                <Card className={classes.boxInternal}>
                    <Box justifyContent="space-between" display="flex" flexDirection="row" color="primary">
                        <Box textAlign="left" >
                            <h2>{props.storeQuestion.title}</h2>
                            <p>{props.storeQuestion.content}</p>
                            <footer>{props.storeQuestion.userId} <br />{props.storeQuestion.creationDate}</footer>
                        </Box>
                        <Box>
                            {((admin === 'true') && (props.storeQuestion.status === false) && (props.storeQuestion.acceptedId !== null) && !props.storeConfirm) ?
                                <Button variant="contained" color="secondary" onClick={() => confirmAnswer()}>
                                    Confirm
                            </Button>
                                :
                                ""}
                        </Box>
                    </Box>
                </Card>
            </Container>
        </ThemeProvider>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestion: state.questionState.storeQuestion,
        storeAnswer: state.answerState.storeAnswer,
        storeConfirm: state.questionState.confirm,
    }
}

const mapDispatchToProps = {
    clickQuestion,
    clickConfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumQuestionComponent);