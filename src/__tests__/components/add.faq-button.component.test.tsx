import { mount } from 'enzyme';
import React from 'react'
import { FeedBoxComponent } from '../../components/pages/feed-components/feed-box.component';
import { FeedContainerComponent, FeedContainerComponentProps } from '../../components/pages/feed-components/feed-container.component';
import AddCircleIcon from '@material-ui/icons/AddCircle';



describe('feed-container.component', () => {

   
        const props: FeedContainerComponentProps = {
            storeQuestions: [],
            storeTab: 0,
            storePage: 0,
            storePageCount: 0,
            clickTab: () => { }
        }

        it('should render', () => {
        const wrapper = mount(<FeedContainerComponent {...props} />);
        expect(wrapper).toBeDefined();

        })

        it('when add icon button is clicked, form should open to add answers to questions',() => {
             //render the base component for testing
        const wrapper = mount(<FeedContainerComponent{...props}  />);
        //find a node
        const iconButton = wrapper.find("#addQuestionFAQButton").find(AddCircleIcon)
        //simulate event
        console.log(iconButton)
        iconButton.simulate('click')
        //update all refs because we triggered a render
        wrapper.update()
        
        })

    });



   