
import React, {useState} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Pagination from '@material-ui/lab/Pagination';
import QuestBoxComponent from './quest-box.component';
import {createMuiTheme, makeStyles, Container, Box, ThemeProvider} from '@material-ui/core';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import * as questionRemote from '../../../remotes/question.remote';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickTab } from '../../../actions/question.actions';

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
        minWidth: 500
    },
    boxInternal: {
        color: "#f26925",
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20
    },
    containerInternal: {
        paddingTop: 10,
    },
})
const questionList = [
    'Learn React',
    'Learn Firebase',
    'Learn GraphQL',
];

export interface QuestContainerComponentProps {
    storeQuestions: Question[]
    clickTab: (questions: Question[], tab: number, pageCount: number, page: number) => void;
    storeTab: number;
    storePageCount: number;
    storePage: number;
}


export const  QuestContainerComponent: React.FC<QuestContainerComponentProps> = (props) => {
    const classes = useStyles();
    const [view, setView] = useState<'location' | 'revature'>('location');
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
        if (view === 'revature') {
            retrievedPageable = await questionRemote.getAllQuestions(size, page);
            tab = 0;
            setView(view);
            if (retrievedPageable.numberOfElements === 0) {
                return;
            }
        } else if (view === 'location') {
            retrievedPageable = await questionRemote.getQuestionsByUserId(userId, size, page);
            tab = 1;
            setView(view)
        } 

        props.clickTab(retrievedPageable.content, tab, retrievedPageable.totalPages, retrievedPageable.number);
    }

    if (props.storeQuestions.length === 0 && view === 'revature') {
        load("revature", 0);
    }


    const renderQuestBoxComponents = () => {
        return props.storeQuestions.map(question => {
            return (
                <QuestBoxComponent key={question.id} question={question} questionContent={question.content} view={view} />
            )
        })
    }

    return (
        <div className={classes.breadcrumbBar}>
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
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
                            <Tab icon={<DynamicFeedOutlinedIcon fontSize="large" />} label="REVATURE" className={classes.boxInternal}
                                onClick={(e) => load("revature", 0)} />
                            <Tab icon={<DynamicFeedOutlinedIcon fontSize="large" />} label="LOCATION" className={classes.boxInternal}
                                onClick={(e) => load("location", 0)} />
                        </Tabs>
                    </Box>
                    <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {renderQuestBoxComponents()}
                        </Box>
                    </div>
                    <Box display="flex" justifyContent="center" padding={5}>
                        <Pagination size="medium" count={props.storePageCount} page={props.storePage + 1} color="secondary" onChange={handlePageChange} />
                    </Box>
                </ThemeProvider>
            </Container>
        </div>
    )
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
    clickTab
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestContainerComponent);