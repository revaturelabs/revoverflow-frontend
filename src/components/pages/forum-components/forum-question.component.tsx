import React from 'react';
import { makeStyles, Box } from '@material-ui/core';


const useStyles = makeStyles({
    boxInternal: {
        borderBottomStyle: "dashed",
        minHeight: 200,
        textAlign: "left",
        display: "flex",
        flexDirection: "row",
    },
    boxItems: {
        display: "flex",
        flexDirection: "column",
    },
    checkSize: {
        width: 80,
        height: 80,
    },
});

interface ForumQuestionComponentProps {
    username: string;
    title: string;
    body: String;
}

export const ForumQuestionComponent: React.FC<ForumQuestionComponentProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.boxInternal} >
            <Box className={classes.boxItems}>
                <h2>{props.title}</h2>
                <p>{props.body}</p>
                <h3>{props.username}</h3>
                <footer>01/01/2020</footer>
            </Box>
        </div>
    )
}