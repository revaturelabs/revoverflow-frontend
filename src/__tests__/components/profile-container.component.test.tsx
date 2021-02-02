import React from 'react';
import { ProfileContainerComponent } from '../../components/pages/profile-components/profile-container.component';
import { ProfileHeaderComponent } from '../../components/pages/profile-components/profile-header.component';
import { mount } from 'enzyme';

describe('profile-container.component', () => {

    test('should render the ProfileContainerComponent', () => {
        expect(mount(<ProfileContainerComponent />)).toBeDefined();
    })

    test('should render the ProfileHeaderComponent', () => {
        expect(mount(<ProfileHeaderComponent />)).toBeDefined();
    })
});
