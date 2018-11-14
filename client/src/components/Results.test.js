import React from 'react';
import Results from './Results';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('basic rendering', () => {
  const output = shallow(<Results location={{state: {score: null}}} />)
  expect(shallowToJson(output)).toMatchSnapshot()
})
