import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
import Results from './Results';

Enzyme.configure({ adapter: new Adapter() });

it('basic rendering', () => {
  const output = shallow(<Results location={{ state: { score: null } }} />);
  expect(shallowToJson(output)).toMatchSnapshot();
});
