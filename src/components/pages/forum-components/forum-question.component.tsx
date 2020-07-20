import React, { useState } from 'react';
import { makeStyles, Box, Container, Button, Card, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { Question } from '../../../models/question';
import * as fallbackRemote from '../../../remotes/fallback.remote';


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
}

export const ForumQuestionComponent: React.FC<ForumQuestionComponentProps> = (props) => {
    const classes = useStyles();
    const [confirmed, setConfirmed] = useState(false);
    const admin = (localStorage.getItem("admin"));

    const confirmAnswer = async () => {
        let questionInfo: Question;
        try {
            questionInfo = await fallbackRemote.getQuestionByQuestionId( +JSON.parse(JSON.stringify(localStorage.getItem('questionId'))))
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
            await fallbackRemote.updateQuestionStatus(payload);
            setConfirmed(true);
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
                        {/* } */}
                        <Box>
                            {((admin === 'true') && (props.storeQuestion.status === false) && (props.storeQuestion.acceptedId !== null) && !confirmed) ?
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
    }
}

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumQuestionComponent);