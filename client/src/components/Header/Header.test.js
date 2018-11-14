import React from 'react';
import Header from './';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('basic rendering', () => {
  const output = shallow(<Header />)
  expect(shallowToJson(output)).toMatchSnapshot()
})
