import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';

import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Game /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('snapshot testing', () => {
  const output = shallow(<Game />);
  expect(shallowToJson(output)).toMatchSnapshot();
});
