import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, createMuiTheme, ThemeProvider, Box, Button, makeStyles } from '@material-ui/core';
import { FeedBoxComponent } from './feed-box.component';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import Pagination from '@material-ui/lab/Pagination';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import { useHistory } from 'react-router';

const drawerWidth = 100;
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

export const FeedContainerComponent: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(2);
    // const admin = (localStorage.getItem("userId"))
    const admin = true;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const data = ['Yuri', 'What is the Formula for Concentrated Dark matter?', 'I have been wondering for the longest time, does anyone know the formula for concentrated dark matter?']
    const Posts: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

    const renderFeedBoxComponents = () => {
        return Posts.map(post => {
            return (
                <FeedBoxComponent username={data[0]} title={data[1]} body={data[2]} />
            )
        })
    }

    const load = (e: string) => {
        console.log(e)
    }

    const handleRedirect = () => {
        history.push('/texteditor');
    }

    return (
        <div className={classes.breadcrumbBar}>
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <Box justifyContent="flex-end" display="flex" >
                    <ThemeProvider theme={theme} >
                        <Button variant="contained" color="secondary" onClick={() => handleRedirect()}>
                            Ask a Question
                    </Button>
                    </ThemeProvider>
                </Box>
                <ThemeProvider theme={theme} >
                    <Box justifyContent="flex-end" display="flex" >
                        <Tabs
                            value={value}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="fullWidth"
                            onChange={handleChange}
                        >
                            <Tab icon={<DynamicFeedOutlinedIcon fontSize="large" />} label="RECENT" className={classes.boxInternal}
                                        onClick={(e) => load("recent")} />
                            <Tab icon={<HelpOutlinedIcon fontSize="large" />} label="MY QUESTIONS" className={classes.boxInternal}
                                        onClick={(e) => load("questions")} />
                            <Tab icon={<QuestionAnswerIcon fontSize="large" />} label="MY ANSWERS" className={classes.boxInternal}
                                        onClick={(e) => load("answers")}/>
                            {admin ? <Tab icon={<ConfirmationNumberOutlinedIcon fontSize="large" onClick={(e) => load("confirm")} />} label="CONFIRM" className={classes.boxInternal} /> : ""}
                        </Tabs>
                    </Box>
                    <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {renderFeedBoxComponents()}
                        </Box>
                    </div>
                    <Box display="flex" justifyContent="center" padding={5}>
                        <Pagination size="medium" count={10} color="secondary" />
                    </Box>
                </ThemeProvider>
            </Container>
        </div>
    );
}

export default FeedContainerComponent;

//!Pagination of Feed items
//!Button on click goes to post a question page