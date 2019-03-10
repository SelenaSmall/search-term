import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '.';

it('renders without crashing', () => {
  const wrapper = shallow(<Navigation />);
  expect(wrapper).toMatchSnapshot();
});
