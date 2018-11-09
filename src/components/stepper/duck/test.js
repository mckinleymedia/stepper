import React from 'react';
import Stepper from '../StepperContainer';
import { shallow } from 'enzyme';

describe('Stepper component', () => {
  it('render component', () => {
    const wrapper = shallow(<Stepper />);
    wrapper.unmount();
  });
});
