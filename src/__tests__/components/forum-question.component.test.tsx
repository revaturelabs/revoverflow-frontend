import React from 'react';
import { mount } from 'enzyme';
import { ForumQuestionComponent, ForumQuestionComponentProps } from '../../components/pages/forum-components/forum-question.component';


describe("<forum-question.component.tsx", () => {
    it('should render without crashing', () => {

        const props: ForumQuestionComponentProps = {
            storeQuestion: [],
            storeAnswer: [],
            storeConfirm: [],
            clickQuestion: () => { },
            clickConfirm: () => { },
        }
        const wrapper = mount(<ForumQuestionComponent {...props} />);
        expect(wrapper).toBeDefined();

    })
})