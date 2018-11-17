import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('snapshot testing', () => {
  const output = shallow(<App />);
  expect(shallowToJson(output)).toMatchSnapshot();
});
