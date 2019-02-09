import React from 'react';
import { shallow } from 'enzyme';

import Footer from '.';

it('basic rendering', () => {
  const output = shallow(<Footer />);
  expect(output).toMatchSnapshot();
});
