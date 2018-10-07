import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('snapshot testing', () => {
  const output = shallow(<Game />)
  expect(shallowToJson(output)).toMatchSnapshot()
})