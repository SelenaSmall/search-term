import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Footer from '.';

it('basic rendering', () => {
  const output = shallow(<Footer />);
  expect(shallowToJson(output)).toMatchSnapshot();
});
