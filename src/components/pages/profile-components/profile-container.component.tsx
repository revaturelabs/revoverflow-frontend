<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
// import ForumAnswerComponent from './profile-answer.component';
// import ProfileQuestionComponent from './profile-question.component';
// import ForumAcceptedAnswerComponent from './profile-accepted-answer.component';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import * as answerRemote from '../../../remotes/answer.remote';
import * as questionRemote from '../../../remotes/question.remote';
import { Answer } from '../../../models/answer';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { useParams } from 'react-router';
import {ProfileHeaderComponent}  from './profile-header.component';


/**
 * @file Contains and manages questions, accepted answers, and general answers displayed in forums. 
 * @author Keith Salzman 
 */

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

const drawerWidth = 100;
const useStyles = makeStyles({
    boxInternal: {
        color: "#f26925"
    },
    containerInternal: {
        paddingTop: 10,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20
    }
});

export interface ForumContainerComponentProps {
    storeQuestion: any;
    storeAnswer: any;
    storeAnswers: Answer[];
}

export const ProfileContainerComponent: React.FC<ForumContainerComponentProps> = (props) => {
    const userId = useParams();
    console.log(userId);

    const classes = useStyles();
    const [selected, setSelected] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [answer, setAnswer] = useState<Answer[]>([]);
    const size = 10;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        load(value - 1);
    };

    const load = async (page: number) => {
        let retrievedAnswerPageable: any;
        retrievedAnswerPageable = await answerRemote.getAnswersByQuestionId(props.storeQuestion.id, size, page);
        setTotalPages(retrievedAnswerPageable.totalPages);
        setAnswers(retrievedAnswerPageable.content);
    }

    useEffect(() => {
        const load = async (page: number) => {
            let retrievedAnswerPageable: any;
            try {
                retrievedAnswerPageable = await answerRemote.getAnswersByQuestionId(+JSON.parse(JSON.stringify(localStorage.getItem('questionId'))), size, page);
            } catch {
                return;
            }
            setTotalPages(retrievedAnswerPageable.totalPages);
            setAnswers(retrievedAnswerPageable.content);
        }

        const reload = async () => {
            let retrievedAnswer: Answer;
            const reQuestionId = +JSON.parse(JSON.stringify(localStorage.getItem('questionId')))
            try {
                const reQuestion = await questionRemote.getQuestionByQuestionId(reQuestionId);
                if (reQuestion.acceptedId === null) {
                    return;
                } else {
                    retrievedAnswer = await answerRemote.getAnswerByAnswerId(reQuestion.acceptedId);
                }
            } catch {
                return;
            }
            setAnswer([retrievedAnswer]);
        }

        load(0);
        reload();
    }, [])

    const renderProfileQuestionComponents = () => {
        return (
            <ProfileQuestionComponent/>
        )
    }

    // const renderForumQuestionComponents = () => {
    //     return (
    //         <ForumQuestionComponent />
    //     )
    // }

    const renderForumAcceptedAnswerComponents = () => {
        return answer.map(answer => {
            return (
                <ForumAcceptedAnswerComponent key={answer.id} answer={answer} selected={selected} />
            )
        })
    }

    const renderForumAnswerComponents = () => {
        return answers.map(answer => {
            return (
                <ForumAnswerComponent key={answer.id} answer={answer} setSelected={setSelected} selected={selected} />
            )
        })
=======
/**
 * @file Contains and manages the questions and answer boxes populated into the feed
 * @author Keith Salzman
 */

import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles} from '@material-ui/core';
import ProfileBoxComponent from './profile-box.component';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import * as questionRemote from '../../../remotes/question.remote';
import { Pagination } from '@material-ui/lab';



const useStyles = makeStyles({
    boxExternal: {
        minWidth: 500
    },
    boxInternal: {
        color: "#f26925",
    },
    containerInternal: {
        paddingTop: 10,
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20,
    }
});



export const ProfileContainerComponent = () => {
    const postsPerPage = 10;

    const classes = useStyles();
    const splitURL = window.location.href.split("/");
    const userId = parseInt(splitURL[splitURL.length - 1]);
    const [userQuestions, setUserQuestions] = useState<Question[]>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [viewedQuestions, setViewedQuestions] = useState<Question[]>([]);
    
    useEffect(()=>{
        getUserQuestions();
    }, [])
 
    const getUserQuestions = async () => {
        try {
            const response = await questionRemote.getQuestionsByUserId(userId, postsPerPage, 0);
            setUserQuestions(response);
        } catch {
            alert("Could not set the user questions.");
        }
    };

    const changePage = (questions: Question[], tab: number, pageCount: number, page: number) => {

    }

    // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     load(view, value - 1);
    // };

    /**
     * Maps the questions or answers into feed boxes to be displayed within the feed container.
     */
    const renderProfileBoxComponents = () => {
        if (userQuestions) {
            return userQuestions.map(question => {
                return (
                    <ProfileBoxComponent key={question.id} question={question} questionContent={question.content} />
                );
            })
        }
        else {
            return <></>;
        }
>>>>>>> 15601126a991dfa89977f5cdb2af571034a6cf41
    }

    return (
        <div>
<<<<<<< HEAD
        
        <div className={classes.breadcrumbBar}>
        
            <ThemeProvider theme={theme}>
            
                <BreadcrumbBarComponent />
                {<ProfileHeaderComponent></ProfileHeaderComponent>}
                <Container className={classes.containerInternal} >
                    <div style={{ width: '100%' }}>
                    
                        <Box justifyContent="center" display="flex" flexDirection="column">
                            
                            {renderProfileQuestionComponents()}
                            {/* {renderForumQuestionComponents()} */}
                            {renderForumAcceptedAnswerComponents()}
                            {renderForumAnswerComponents()}
                        </Box>
                    </div>
                </Container>
                <Box display="flex" justifyContent="center" padding={5}>
                    <Pagination size="medium" count={totalPages} page={page} color="secondary" onChange={handlePageChange} />
                </Box>
            </ThemeProvider>
        </div>
        </div>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestion: state.questionState.storeQuestion,
        storeAnswer: state.answerState.storeAnswer,
        storeAnswers: state.answerState.collectedAnswers,
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainerComponent);
=======
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <div style={{ width: '100%' }}>
                    <Box display="flex" flexDirection="column" justifyContent="center" >
                        {renderProfileBoxComponents()}
                    </Box>
                </div>

                {/* <Box display="flex" justifyContent="center" padding={5}>
                    <Pagination size="medium" count={userQuestions?.length} page={currentPage + 1} color="secondary" onChange={handlePageChange} />
                </Box> */}
            </Container>

            
        </div>
    );
}


export default ProfileContainerComponent;
>>>>>>> 15601126a991dfa89977f5cdb2af571034a6cf41
