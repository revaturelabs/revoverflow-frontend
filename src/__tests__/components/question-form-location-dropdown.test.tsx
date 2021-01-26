import React from 'react';
import { NavbarComponent } from '../../components/navbar.component';
import { mount } from 'enzyme';
import {Menu, IconButton, Button, MenuList} from '@material-ui/core'
import { DescriptionTwoTone } from '@material-ui/icons';
import { RichTextEditorComponent } from '../../components/pages/forum-components/rich-text-editor-component/draftjs';

describe('question-form-location-dropdown', () => {

    it('should render', ()=> {
        const wrapper = mount(<RichTextEditorComponent />)
        expect(wrapper).toBeDefined();

    })

    it('Should render the dropdown menu button', () => {
        const wrapper = mount(<RichTextEditorComponent />);
        const dropDownButton = wrapper.find("#location-dropdown-button").find(Button)
        
        expect(dropDownButton).toBeDefined();
    
    })

    it('Should render the location dropdown menu when clicked', () => {
        const wrapper = mount(<RichTextEditorComponent />);
        const dropDownButton = wrapper.find("#location-dropdown-button").find(Button)
        
        dropDownButton.simulate('click');

        wrapper.update()

        const dropDownMenu = wrapper.find("#location-dropdown-menu").find(Menu)
      

        expect(dropDownMenu.prop('open')).toBeTruthy()
        


    })


    it('Should show Reston, VA as one of the locations', () => {
        const wrapper = mount(<RichTextEditorComponent />);
        const dropDownButton = wrapper.find("#location-dropdown-button").find(Button)
        
        dropDownButton.simulate('click');

        wrapper.update()

        const dropDownMenu = wrapper.find("#location-dropdown-menu").find(Menu)
        
        //TODO mock location data from database and test that the location appears in the dropdown menu


    })





})