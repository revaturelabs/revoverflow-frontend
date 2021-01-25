import React from 'react';
import { mount, shallow } from 'enzyme';
import { useState } from 'react';

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