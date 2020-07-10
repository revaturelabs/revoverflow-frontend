import React, { useState } from 'react';
import { makeStyles, Box, FormControlLabel } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { green } from '@material-ui/core/colors';


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
        padding: 40
    },
    checkSize: {
        width: 80,
        height: 80,
    },
});

interface ForumAnswerComponentProps {
    username: string;
    title: string;
    body: String;
}

export const ForumAnswerComponent: React.FC<ForumAnswerComponentProps> = (props) => {
    const classes = useStyles();
    const [color, setColor] = useState(false)

    const selectAnswer = () => {
        setColor(!color)
    }

    return (
        <div className={classes.boxInternal} >
            {color === true ? 
            <FormControlLabel
            control={<DoneOutlineIcon className={classes.checkSize} />} label=""
            onClick={() => selectAnswer()} style={{ color: green[500] }} />
            :
            <FormControlLabel
            control={<DoneOutlineIcon className={classes.checkSize} />} label=""
            onClick={() => selectAnswer()}  />
        }
            <Box className={classes.boxItems}>
                <p>{props.body}</p>
                <h3>{props.username}</h3>
                <footer>01/01/2020</footer>
            </Box>
        </div>
    )
}