
import React, { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Checkbox } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import QuestBoxComponent from './quest-box.component';
import {createMuiTheme, makeStyles, Container, Box, ThemeProvider} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import * as questionRemote from '../../../remotes/question.remote';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickTab } from '../../../actions/question.actions';
import CustomizedBreadcrumbs from './BreadCrumbs';
import useForceUpdate from 'use-force-update';

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
    const [value, setValue] = React.useState(props.storeTab);
    const [revatureBasedQuestion, setRevatureBasedQuestion] = useState(true);
    const [locationBasedQuestion, setLocationBasedQuestion] = useState(true);
    const [allQuestions, setAllQuestions] = useState(true);
    const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
    const size = 10;
    const forceUpdate = useForceUpdate();

    const toggleQuestion = (e:any) => {
       // const forceUpdate = useForceUpdate();
       // const forceUpdate = () => {
                
                if(e.target.name === 'revatureChk') setRevatureBasedQuestion(e.target.checked)
                else setLocationBasedQuestion(e.target.checked)
                forceUpdate();
                load(0)
                //WHY?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! getting upset!!!!!!
               

    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        load(value - 1);
    };

    const load = async (page: number) => {
        let retrievedPageable: any;
        let tab: any;
        console.log("revatureBasedQuestion: " + revatureBasedQuestion)
        console.log("locationBasedQuestion: " + locationBasedQuestion)
        if (revatureBasedQuestion === true) {
            if(locationBasedQuestion === false){
                retrievedPageable = await questionRemote.getAllRevatureQuestions(size, page, true);
                //tab = 0; 
                if (retrievedPageable.numberOfElements === 0) {
                     return;
                 }
            }else{
                retrievedPageable = await questionRemote.getAllQuestions(userId, page);
                
                if (retrievedPageable.numberOfElements === 0) {
                    return;
                }
            }
        } else {
            if(locationBasedQuestion === true){
                //SHOULD BE CHANGED!!!!
                retrievedPageable = await questionRemote.getQuestionsByUserId(userId, size, page);
                //tab = 1;
            }else{
                return;
            }
        }

        props.clickTab(retrievedPageable.content, tab, retrievedPageable.totalPages, retrievedPageable.number);
    }

    if (props.storeQuestions.length === 0 ) {
         load(0);
    }

    const renderQuestBoxComponents = () => {
        return props.storeQuestions.map(question => {
            return (
                <QuestBoxComponent key={question.id} question={question} questionContent={question.content} view='' />
            )
        })
    }

    return (
        <div className={classes.breadcrumbBar}>
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <ThemeProvider theme={theme} >
                    <Box justifyContent="center" display="flex" className={classes.boxExternal}>
                        <Checkbox id="chk1" name="revatureChk" defaultChecked 
                                  icon={<BusinessIcon fontSize="large"/>}  className={classes.boxInternal} checked={revatureBasedQuestion} 
                                    onChange={toggleQuestion} />
                        <Checkbox id="chk2" name="locationChk" defaultChecked 
                                  icon={<LocationOnIcon fontSize="large" />} className={classes.boxInternal} checked={locationBasedQuestion} 
                                   onChange={toggleQuestion} />
                        
                    </Box>
                    <div style={{ width: '100%' }}>
                       {
                           /* <Box display="flex" flexDirection="column" justifyContent="center" >
                                {renderQuestBoxComponents()}
                              </Box>*/
                       } 
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {/*renderQuestBoxComponents()*/}
                            { locationBasedQuestion ? <CustomizedBreadcrumbs />  : ''}
                            { renderQuestBoxComponents()}
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