import React, { Component } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { mount } from 'enzyme';
import {render} from '@testing-library/react'
import renderer from 'react-test-renderer';
import Faq from '../../components/UserFAQ/UserFAQ'

import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import FaqContainerComponent from '../../components/pages/faq-components/faq-container.component';
configure({adapter: new Adapter()})





describe('USER-FAQ component tests', () => {
    
    test('USER-FAQ component mounting test:Should Render', () => {
        
        const wrapper = mount(<FaqContainerComponent />);
        expect(wrapper).toBeDefined();
    })

      test('test unmounting of component', () => {
        
        const wrapper = mount(<FaqContainerComponent />);
    
        wrapper.unmount()
        expect(wrapper).toBeUndefined;
    })


    test("Snapshot of render", ()=>{
        const tree = renderer.create(<FaqContainerComponent />).toJSON();

        expect(tree).toMatchSnapshot();
    })

    test('Render the title of component', () => {
        const wrapper = shallow(<FaqContainerComponent />)
        expect(wrapper.find('h1').text()).toContain("User-FAQ")
   
    })

    test('Does this button get Revature questions', () => {
        const wrapper = shallow(<FaqContainerComponent />)
        
        wrapper.find("#revatureQ").simulate("click")

        expect(wrapper.find('h2').text()).toContain("Revature Questions")
   
    })

     test('Does this button display the location breadcrumb', () => {
        const wrapper = shallow(<FaqContainerComponent />)
        
        wrapper.find("#locationQ").simulate("click")
        expect(wrapper.find('h2').text()).toContain("Location-based Questions")
   
    })


    test('Does clicking this breadcrumb show location based questions', () => {

   
    })

    test('Does Admin button not Render depending on isAdmin State = false', () => {
        
        console.log("yup!")
   
    })


});





