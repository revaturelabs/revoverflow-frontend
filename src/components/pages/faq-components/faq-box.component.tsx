/**
 * @file Contains and manages questions and answer mapped into boxes within the feed container
 * @author Keith Salzman 
 */

import React, { useState } from 'react';
import { makeStyles, Box, Card, Backdrop } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Question } from '../../../models/question';
import * as answerRemote from '../../../remotes/answer.remote';
import * as questionRemote from '../../../remotes/question.remote';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickQuestion } from '../../../actions/question.actions';
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AddFAQComponent } from '../faq-components/add-faq-component';



const drawerWidth = 100;
const useStyles = makeStyles((theme) => ({
    boxInternal: {
        marginBottom: 5,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#f26925",
        maxWidth: 1000,
        width: `calc(100% - ${drawerWidth}px)`
    },
    divInternal: {
        paddingTop: 20
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export interface FaqBoxComponentProps {
    question: any;
    questionContent: string;
    answer: string
    // clickQuestion: (question: Question) => void;
    view: string;
}

export const FaqBoxComponent: React.FC<FaqBoxComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();


    
    let questionContent;
    let answerContent;
    try {
        questionContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.question.content)));
        answerContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.answer)));
    } catch(e) {
        questionContent = EditorState.createEmpty();
        answerContent = EditorState.createEmpty();
    }

    const onChange = () => { };

    //!First box here contains answers not questions, so does its handler deal with answer not questions
    return (
        <>
        <Box display="flex" justifyContent="center" >
            <Card className={classes.boxInternal}>
                {props.question.questionId ?
                    <Box display="flex" justifyContent="center">
                        <Box paddingLeft={2} paddingRight={2} >
                            <div className={classes.divInternal}><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                            <h3>{props.question.userId}</h3>
                            <div className={classes.divInternal}><Editor editorState={answerContent} readOnly={true} onChange={onChange} /></div>

                        </Box>
                    </Box>
                    :
                    <Box>
                        <Box display="flex" justifyContent="center">
                            <Box paddingLeft={2} paddingRight={2}>
                                <h2>{props.question.title}</h2>
                                <div><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                                <h3>{props.question.userId}</h3>
                            <div className={classes.divInternal}><Editor editorState={answerContent} readOnly={true} onChange={onChange} /></div>
                            </Box>
                        </Box>
                    </Box>}
            </Card>
        </Box>
        </>
    )
}

const mapStateToProps = (state: IState) => {

}

const mapDispatchToProps = {
    clickQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(FaqBoxComponent);
