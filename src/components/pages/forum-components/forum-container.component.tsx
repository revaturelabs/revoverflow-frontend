import React from 'react';
import { Grid, makeStyles, Box, Container } from '@material-ui/core';
import { ForumAnswerComponent } from './forum-answer.component';
import { ForumQuestionComponent } from './forum-question.component';


const useStyles = makeStyles({
    answerRoot: {
        flexGrow: 1,
        position: "absolute",
        width: "240vw",
        top: "5vh",
        left: "15vw",
    },
});

const dataQ = ['Yuri', 'What is the Formula for Concentrated Dark matter?', 'I have been wondering for the longest time, does anyone know the formula for concentrated dark matter?']
const PostsA: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PostsQ: any[] = [1];
const dataA = ['Michel', 'If you are a Zigerion do not read beyond this point', 'two parts plutonic quarks (pink) and one part cesium (green)']

export const ForumContainerComponent: React.FC = () => {
    const classes = useStyles();

    const renderForumAnswerComponents = () => {
        return PostsA.map(post => {
            return (
                <Grid item xs={3}>
                    <ForumAnswerComponent username={dataA[0]} title={dataA[1]} body={dataA[2]} />
                </Grid>
            )
        })
    }

    const renderForumQuestionComponents = () => {
        return PostsQ.map(post => {
            return (
                <Grid item xs={3}>
                    <ForumQuestionComponent username={dataQ[0]} title={dataQ[1]} body={dataQ[2]} />
                </Grid>
            )
        })
    }

    return (
        <Container >
            <Box className={classes.answerRoot}>
                    {renderForumQuestionComponents()}
                    {renderForumAnswerComponents()}
            </Box>
        </Container>
    )
}

//! Make component just for question