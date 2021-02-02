import React from 'react';
import { RichTextEditorComponent } from '../../components/pages/forum-components/rich-text-editor-component/draftjs';
import { mount } from 'enzyme';


describe('draftjs.tsx', () => {

    test('should render', () => {

        const wrapper = mount(<RichTextEditorComponent />);
        expect(wrapper).toBeDefined();
    })
});

