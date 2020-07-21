import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, createMuiTheme, ThemeProvider, Box, Button, makeStyles } from '@material-ui/core';
import FeedBoxComponent from './feed-box.component';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import Pagination from '@material-ui/lab/Pagination';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import { useHistory } from 'react-router';
import * as fallbackRemote from '../../../remotes/fallback.remote';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickQuestion } from '../../../actions/question.actions';
import { clickTab } from '../../../actions/question.actions';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';


// const drawerWidth = 100;
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
    boxExternal: {
        // width: `calc(100% - ${drawerWidth}px)`,
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
        marginLeft: 20
    }
});

export interface FeedContainerComponentProps {
    storeQuestions: Question[]
    storeQuestion: any;
    clickQuestion: (question: Question) => void;
    clickTab: (questions: Question[], tab: number, pageCount: number, page: number) => void;
    storeTab: number;
    storePageCount: number;
    storePage: number;
}

export const FeedContainerComponent: React.FC<FeedContainerComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [view, setView] = useState<'question' | 'answer' | 'confirm' | 'recent'>('recent');
    const [value, setValue] = React.useState(props.storeTab);
    const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
    const admin = (localStorage.getItem("admin"));
    const size = 10;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        load(view, value - 1);
    };

    const load = async (view: string, page: number) => {
        let retrievedPageable: any;
        let tab: any;
        if (view === 'recent') {
            retrievedPageable = await fallbackRemote.getAllQuestions(size, page);
            tab = 0;
            setView(view);
            if (retrievedPageable.numberOfElements === 0) {
                return;
            }
        } else if (view === 'question') {
            retrievedPageable = await fallbackRemote.getQuestionsByUserId(userId, size, page);
            tab = 1;
            setView(view)
        } else if (view === 'answer') {
            retrievedPageable = await fallbackRemote.getAnswersByUserId(userId, size, page);
            tab = 2;
            setView(view)
        } else if (view === 'confirm') {
            retrievedPageable = await fallbackRemote.getUnconfirmedQuestions(size, page);
            tab = 3;
            setView(view)
        }
        props.clickTab(retrievedPageable.content, tab, retrievedPageable.totalPages, retrievedPageable.number);
    }

    if (props.storeQuestions.length === 0 && view === 'recent') {
        load("recent", 0);
    }

    const renderFeedBoxComponents = () => {
        return props.storeQuestions.map(question => {
            return (
                <FeedBoxComponent key={question.id} question={question} questionContent={question.content} />
            )
        })
    }

    const handleRedirect = () => {
        history.push('/postquestion');
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
                    <Box justifyContent="center" display="flex" className={classes.boxExternal}>
                        <Tabs
                            value={value}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="fullWidth"
                            scrollButtons="auto"
                            onChange={handleChange}
                        >
                            <Tab icon={<DynamicFeedOutlinedIcon fontSize="large" />} label="RECENT" className={classes.boxInternal}
                                onClick={(e) => load("recent", 0)} />
                            <Tab icon={<LiveHelpIcon fontSize="large" />} label="MY QUESTIONS" className={classes.boxInternal}
                                onClick={(e) => load("question", 0)} />
                            <Tab icon={<QuestionAnswerIcon fontSize="large" />} label="MY ANSWERS" className={classes.boxInternal}
                                onClick={(e) => load("answer", 0)} />
                            {admin === 'true' ? <Tab icon={<ConfirmationNumberOutlinedIcon fontSize="large" onClick={(e) => load("confirm", 0)} />}
                                label="CONFIRM" className={classes.boxInternal} /> : ""}
                        </Tabs>
                    </Box>
                    <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {renderFeedBoxComponents()}
                        </Box>
                    </div>
                    <Box display="flex" justifyContent="center" padding={5}>
                        <Pagination size="medium" count={props.storePageCount} page={props.storePage + 1} color="secondary" onChange={handlePageChange} />
                    </Box>
                </ThemeProvider>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestions: state.questionState.collectedQuestions,
        storeQuestion: state.questionState.storeQuestion,
        storeTab: state.questionState.storeTab,
        storePageCount: state.questionState.storePageCount,
        storePage: state.questionState.storePage,
    }
}

const mapDispatchToProps = {
    clickQuestion,
    clickTab
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainerComponent);