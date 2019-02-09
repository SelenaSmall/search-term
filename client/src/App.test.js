import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import App from './App';

// TODO: crashes whole test suite - Error: Network Error
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('snapshot testing', () => {
  const output = shallow(<App />);
  expect(shallowToJson(output)).toMatchSnapshot();
});
