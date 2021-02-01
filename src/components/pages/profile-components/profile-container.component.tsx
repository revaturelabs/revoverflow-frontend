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
import { ProfileHeaderComponent } from './profile-header.component';



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

    }

    return (
        <div>
            <BreadcrumbBarComponent />
            <ProfileHeaderComponent></ProfileHeaderComponent>
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