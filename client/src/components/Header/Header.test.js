import React from 'react';
import { shallow } from 'enzyme';

import Header from '.';

it('basic rendering', () => {
  const output = shallow(<Header />);
  expect(output).toMatchSnapshot();
});

it('renders status, score and time remaining', () => {
  const output = shallow(<Header status="the status" />);
  expect(output).toMatchSnapshot();
  const outputWithScore = shallow(<Header status="the status" score={101} />);
  expect(outputWithScore).toMatchSnapshot();
  const outputWithSecondsRemaining = shallow(<Header status="the status" score={101} secondsRemaining={56} />);
  expect(outputWithSecondsRemaining).toMatchSnapshot();
});
