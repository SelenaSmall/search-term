import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
import Footer from '.';

Enzyme.configure({ adapter: new Adapter() });

it('basic rendering', () => {
  const output = shallow(<Footer />);
  expect(shallowToJson(output)).toMatchSnapshot();
});
