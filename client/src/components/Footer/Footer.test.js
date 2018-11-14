import React from 'react';
import Footer from './';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('basic rendering', () => {
  const output = shallow(<Footer />)
  expect(shallowToJson(output)).toMatchSnapshot()
})
