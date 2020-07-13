import React from 'react';
import { shallow } from 'enzyme';
import {PostQuestionComponent,PostQuestionComponentProps} from '../PostQuestionComponent';


describe('PostQuestionComponent', () => {
    
    test('should render', () => {
        const props: PostQuestionComponentProps = {
            title: "Title",
            body: "Body",
            userID:1,
            saveQuestion: (title:string, body:string, userID:number) => {},
        }
        const wrapper = shallow(<PostQuestionComponent {...props} />);
        expect(wrapper).toBeDefined();
    })
})