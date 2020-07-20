import React, { useState, useEffect } from 'react';
import { makeStyles, Box, FormControlLabel, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
import { Question } from '../../../models/question';
import * as fallbackRemote from '../../../remotes/fallback.remote';
import { Answer } from '../../../models/answer';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';


const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#ffffff",
        border: '2px solid #000',
        padding: 20
    },
    checkSize: {
        width: 50,
        height: 50,
    },
    boxInternal: {
        marginBottom: 5,
        marginTop: 30,
        paddingBottom: 10,
        borderBottomStyle: "dotted",
        borderColor: "#f26925",
    },
    modalInternal: {
        display: "flex",
        justifyContent: "space-evenly"

    },
    buttonInternal: {
        color: '#ffffff',
        backgroundColor: '#3498db',
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

interface ForumAcceptedAnswerComponentProps {
    answer: Answer;
    storeAnswer: any;
    selected: boolean;
}

export const ForumAcceptedAnswerComponent: React.FC<ForumAcceptedAnswerComponentProps> = (props) => {
    const classes = useStyles();
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        id: 0,
        acceptedId: 0,
        title: "",
        content: "",
        creationDate: new Date(),
        status: false,
        userId: 0
    })

    useEffect(() => {
        const getCurrentQuestion = async () => {
            const retrievedQuestion = await fallbackRemote.getQuestionByQuestionId(+JSON.parse(JSON.stringify(localStorage.getItem('questionId'))));
            setCurrentQuestion(retrievedQuestion);
        }
        getCurrentQuestion();
    }, [])

    if (!(props.answer.id === currentQuestion.acceptedId)) {
        return <div></div>;
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Box justifyContent="flex-start" display="flex" flexDirection="row" className={classes.boxInternal}>
                        <Box>
                            <Box>
                                <Box justifyContent="flex-start" display="flex">
                                    <FormControlLabel
                                        control={<DoneIcon className={classes.checkSize} />} label=""
                                        style={{ color: green[500] }} />
                                    <Box textAlign="left">
                                        <p>{props.answer.content}</p>
                                        <footer>{props.answer.userId} <br />{props.answer.creationDate}</footer>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        storeAnswer: state.answerState.storeAnswer,
    }
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ForumAcceptedAnswerComponent);