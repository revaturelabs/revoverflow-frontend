import React from 'react';
import { shallow } from 'enzyme';
import {PostAnswerComponent,PostAnswerComponentProps} from '../PostAnswerComponent';


describe('PostAnswerComponent', () => {
    
    test('should render', () => {
        const props: PostAnswerComponentProps = {
            //userID:1,
            //postAnswer: (answer:Answer) => {},
        }
        const wrapper = shallow(<PostAnswerComponent {...props} />);
        expect(wrapper).toBeDefined();
    })
})