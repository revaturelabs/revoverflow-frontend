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
});
