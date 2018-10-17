import React from 'react';
import Round from './Round';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('snapshot testing', () => {
  const output = shallow(<Round />)
  expect(shallowToJson(output)).toMatchSnapshot()
})
