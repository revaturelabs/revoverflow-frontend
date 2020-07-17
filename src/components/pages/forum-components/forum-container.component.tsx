import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { ForumAnswerComponent } from './forum-answer.component';
import { ForumQuestionComponent } from './forum-question.component';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';


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

const dataQ = ['Yuri', 'What is the Formula for Concentrated Dark matter?', 'I have been wondering for the longest time, does anyone know the formula for concentrated dark matter?']
const PostsA: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PostsQ: any[] = [1];
const dataA = ['Michel', 'If you are a Zigerion do not read beyond this point', 'two parts plutonic quarks (pink) and one part cesium (green)']

export const ForumContainerComponent: React.FC = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState(false);


    const renderForumAnswerComponents = () => {
        return PostsA.map(post => {
            return (
                <ForumAnswerComponent username={dataA[0]} title={dataA[1]} body={dataA[2]} selected={selected} setSelected={setSelected} />
            )
        })
    }

    const renderForumQuestionComponents = () => {
        return PostsQ.map(post => {
            return (
                <ForumQuestionComponent username={dataQ[0]} title={dataQ[1]} body={dataQ[2]} />
            )
        })
    }

    return (
        <div className={classes.breadcrumbBar}>
            <BreadcrumbBarComponent />
        <Container className={classes.containerInternal} >
            <div style={{ width: '100%' }}>
                <Box justifyContent="center" display="flex" flexDirection="column">
                    {renderForumQuestionComponents()}
                    {renderForumAnswerComponents()}
                </Box>
            </div>
        </Container>
        </div>
    )
}

//! Make component just for question