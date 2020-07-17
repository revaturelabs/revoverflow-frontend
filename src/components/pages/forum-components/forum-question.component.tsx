import React from 'react';
import { makeStyles, Box, Container, Button, Card, createMuiTheme, ThemeProvider } from '@material-ui/core';


const useStyles = makeStyles({
    boxInternal: {
        marginBottom: 5,
        marginTop: 10,
        borderBottomStyle: "solid",
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
    username: string;
    title: string;
    body: String;
}

const confirmAnswer = () => {
    //! logic to update the question entity status boolean
    //! attributes points to question owner's user account 
}


export const ForumQuestionComponent: React.FC<ForumQuestionComponentProps> = (props) => {
    const classes = useStyles();
    //! logic that conditionally renders the confirm button 
    // const admin = (localStorage.getItem("userId")) && acceptedAnswerId;
    const admin = true;

    return (
        <ThemeProvider theme={theme} >
            <Container >
                <Card className={classes.boxInternal}>
                    <Box justifyContent="space-between" display="flex" flexDirection="row" color="primary">
                        <Box textAlign="left" >
                            <h3>{props.title}</h3>
                            <p>{props.body}</p>
                            <footer>{props.username} <br />01/01/2020</footer>
                        </Box>
                        <Box>
                            {admin ?
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

//!Make button visible when isAdmin is true