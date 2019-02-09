import React from 'react';
import { shallow } from 'enzyme';

import Results from './Results';

it('basic rendering', () => {
  const output = shallow(<Results location={{ state: { score: null } }} />);
  expect(output).toMatchSnapshot();
});
