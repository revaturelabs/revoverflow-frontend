import React from 'react';
import { FeedContainerComponent, FeedContainerComponentProps } from '../../components/pages/feed-components/feed-container.component';
import { mount } from 'enzyme';


describe('feed-container.component', () => {
    let wrapper:any;
    beforeEach(()=> {
        const props: FeedContainerComponentProps = {
            storeQuestions: [],
            storeTab: 0,
            storePage: 0,
            storePageCount: 0,
            clickTab: () => { }
        }
        wrapper = mount(<FeedContainerComponent {...props} />);
    })

    test('should render the FeedContainerComponent', () => {
        expect(wrapper).toBeDefined();
    })

    test('should render a tab for the FAQ', () => {
        expect(wrapper.exists('#FAQ-Tab')).toBe(true);
    })

    it('should not contain a Add FAQ when not in the FAQ tab', () => {
        expect(wrapper.exists('#add-FAQ-button')).toBe(false);
    })

    it('should render an FAQ button after the FAQ tab has been clicked', ()=> {
        /*
        currently there is a bug where if no questions exist, you have to double click the faq tab button for the button to display. Bug needs to be fixed 
        before test can continue 
        */
        const test = wrapper.find('#FAQ-Tab').first();
        test.simulate('click');
        expect(wrapper.exists('#add-FAQ-button')).toBe(true);
    })

});
