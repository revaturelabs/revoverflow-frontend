import React from 'react';
import { shallow } from 'enzyme';
import {PostQuestionComponent,PostQuestionComponentProps} from '../PostQuestionComponent';
import { Question } from '../../../models/question';


describe('PostQuestionComponent', () => {
    
    test('should render', () => {
        const props: PostQuestionComponentProps = {
            //userID:1,
            postQuestion: (question:Question) => {},
        }
        const wrapper = shallow(<PostQuestionComponent {...props} />);
        expect(wrapper).toBeDefined();
    })
})