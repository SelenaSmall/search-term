import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Results from './Results';

it('basic rendering', () => {
  const output = shallow(<Results location={{ state: { score: null } }} />);
  expect(shallowToJson(output)).toMatchSnapshot();
});
