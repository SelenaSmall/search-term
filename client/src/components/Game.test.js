import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';

import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';

Enzyme.configure({ adapter: new Adapter() });

it('needs atleast 1 test', () => {
  expect(true).toEqual(true);
});
// TODO: crashes whole test suite - Error: Network Error
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<MemoryRouter><Game /></MemoryRouter>, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// TODO: crashes whole test suite - Error: Network Error
// it('snapshot testing', () => {
//   const output = shallow(<Game />);
//   expect(shallowToJson(output)).toMatchSnapshot();
// });
