import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
    boxInternal: {
        borderBottomStyle: "dashed",
        width: "60vw"
    },
});

interface FeedBoxComponentProps {
    username: string;
    title: string;
    body: String;
}

export const FeedBoxComponent: React.FC<FeedBoxComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const handleRedirect = () => {
        history.push('/forum');
    }

    return (
        <div className={classes.boxInternal} onClick={() => handleRedirect()} >
            <h2>{props.title}</h2>
            <p>{props.body}</p>
            <h3>{props.username}</h3>
        </div>

    )
}

//!Onlick  redirect to Forum page and Pass Question Id