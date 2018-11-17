import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
import Header from '.';

Enzyme.configure({ adapter: new Adapter() });

it('basic rendering', () => {
  const output = shallow(<Header />);
  expect(shallowToJson(output)).toMatchSnapshot();
});

it('renders status, score and time remaining', () => {
  const output = shallow(<Header status="the status" />);
  expect(shallowToJson(output)).toMatchSnapshot();
  const outputWithScore = shallow(<Header status="the status" score={101} />);
  expect(shallowToJson(outputWithScore)).toMatchSnapshot();
  const outputWithSecondsRemaining = shallow(<Header status="the status" score={101} secondsRemaining={56} />);
  expect(shallowToJson(outputWithSecondsRemaining)).toMatchSnapshot();
});
