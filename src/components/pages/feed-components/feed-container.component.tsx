import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Container, createMuiTheme, ThemeProvider, Grid, Box, Button } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { FeedBoxComponent } from './feed-box.component';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles({
    menuRoot: {
        position: "absolute",
        bottom: "75vh",
        right: "10vw",
    },
    menuInternal: {
        maxHeight: 40,
        bottom: "85vh",
        right: "50vw",
        position: "absolute",
    },
    menuTitle: {
        display: "flex"
    },
    boxRoot: {
        position: "absolute",
        top: "25vh",
        left: "30vw",
        borderStyle: "dashed",
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500],
        },
        secondary: {
            main: orange[500],
        },
    },
});

export const FeedContainerComponent: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const data = ['Yuri', 'What is the Formula for Concentrated Dark matter?', 'I have been wondering for the longest time, does anyone know the formula for concentrated dark matter?']
    const Posts: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const renderFeedBoxComponents = () => {
        return Posts.map(post => {
            return (
                <Grid item xs={3}>
                    <FeedBoxComponent username={data[0]} title={data[1]} body={data[2]} />
                </Grid>
            )
        })
    }

    return (
        <Container >
            <div className={classes.menuInternal}>
                <h1>Questions: </h1>
            </div>
            <Box className={classes.menuRoot} >
                <Button variant="contained" color="primary" >
                    Ask a Question
                    </Button>
                <ThemeProvider theme={theme} >
                    <Tabs
                        value={value}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="fullWidth"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        centered
                    >
                        <Tab icon={<QuestionAnswerIcon />} label="RECENTS" />
                        <Tab icon={<QuestionAnswerIcon />} label="FAVORITES" />
                        <Tab icon={<QuestionAnswerIcon />} label="NEARBY" />
                    </Tabs>
                </ThemeProvider>
            </Box>
            <Box className={classes.boxRoot}>
                {renderFeedBoxComponents()}
            </Box>
        </Container>
    );
}

//!Pagination of Feed items
//!Button on click goes to post a question page