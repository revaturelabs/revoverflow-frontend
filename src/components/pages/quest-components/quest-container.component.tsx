
import React, { useState } from 'react';
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
        minWidth: 500,
        
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

export interface QuestContainerComponentProps {
    storeQuestions: Question[]
    clickTab: (questions: Question[], tab: number, pageCount: number, page: number) => void;
    storeTab: number;
    storePageCount: number;
    storePage: number;
}
 
export const  QuestContainerComponent: React.FC<QuestContainerComponentProps> = (props) => {
    const classes = useStyles();
    const [revatureBasedQuestion, setRevatureBasedQuestion] = useState(false);
    const [locationBasedQuestion, setLocationBasedQuestion] = useState(false);
    const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
    const size = 10;

    const toggleQuestion = (e:any) => {
        if(e.target.name === 'revatureChk'){
            load(e.target.checked, locationBasedQuestion, 0)
            setRevatureBasedQuestion(e.target.checked)
        }else{
            load(revatureBasedQuestion,e.target.checked, 0)
            setLocationBasedQuestion(e.target.checked)
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        load(revatureBasedQuestion,locationBasedQuestion, value - 1);
    };

    const load = async (revatuure:boolean, location:boolean, page: number) => {
        let retrievedPageable: any;
        let tab: any;
        console.log("revatuure: " + revatuure)
        console.log("location: " + location)
        if (revatuure) {
            if(!location){
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
            if(location){
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
         load(revatureBasedQuestion,locationBasedQuestion,0);
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
            ABCDEFT
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <ThemeProvider theme={theme} >
                    <Box justifyContent="center" display="flex"  className={classes.boxExternal}>
                        <span id="checkbox"></span>
                        <Checkbox id="revatureChk" name="revatureChk"  
                                  icon={<BusinessIcon fontSize="large"/>}  className={classes.boxInternal} checked={revatureBasedQuestion} 
                                  onChange={toggleQuestion} />
                        <Checkbox id="locationChk" name="locationChk"  
                                  icon={<LocationOnIcon fontSize="large" />} className={classes.boxInternal} checked={locationBasedQuestion} 
                                  onChange={toggleQuestion} />
                        
                    </Box>
                    <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {/*renderQuestBoxComponents()*/}
                            { locationBasedQuestion ? <CustomizedBreadcrumbs />  : ''}
                            { (locationBasedQuestion || revatureBasedQuestion) ? renderQuestBoxComponents() : ''}
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