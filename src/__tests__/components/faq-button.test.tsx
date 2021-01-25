import React from 'react';
import { mount, shallow } from 'enzyme';
import { useState } from 'react';
import { FeedContainerComponentProps, FeedContainerComponent } from '../../components/pages/feed-components/feed-container.component';
import { ForumQuestionComponent, ForumQuestionComponentProps } from '../../components/pages/forum-components/forum-question.component';
import { prototype } from 'enzyme-adapter-react-16';
import { Question } from '../../models/question';

interface IButton {

}

export const FAQButton: React.FC<IButton> = () => {

    const [clickedToBeFAQ, setClickState] = useState(false);

    return (
        <>
            <button className="confirm-faq-answer-button" onClick={() => setClickState(true)} />
        </>
    )
}

describe.only('<FAQButton />', () => {

    it('Checking to see if the button exists', () => {
        const wrapper = mount(<FAQButton />);
        expect(wrapper.exists('.confirm-faq-answer-button')).toBe(true);
    })

    // it('should return true if the button is clicked', () => {
    //     const wrapper = shallow(<FAQButton />);

    //     wrapper.find('confirm-faq-answer-button').simulate('click');
    //     expect(wrapper.clickedToBeFAQ).toBe(true);
    // })

   

})


describe("<forum-question.component.tsx", () => {
    it('should render without crashing', () => {
        test('should render', () => {
            const props: ForumQuestionComponentProps = {
                storeQuestion: [],
                storeAnswer: [],
                storeConfirm: [],
                clickQuestion: () => { },
                clickConfirm: () => { },
            }
            const wrapper = mount(<ForumQuestionComponent {...props}/>);
            expect(wrapper).toBeDefined();
        })
    })

    it('should render with a ')
})