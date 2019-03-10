import React from 'react';
import { shallow } from 'enzyme';
import Profile from ".";

it('renders without crashing', () => {
  const wrapper = shallow(<Profile />);
  expect(wrapper).toMatchSnapshot();
});
