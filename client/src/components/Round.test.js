import React from 'react';
import Round from './Round';
import { shallow, mount  } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import API from '../API'

it('snapshot testing', () => {
  API.fetchRoundData = () => Promise.resolve();
  API.fetchGameData = () => Promise.resolve({rounds: 1});

  const output = shallow(<Round match={{params: {round: 1}}} />)
  expect(shallowToJson(output)).toMatchSnapshot()
})

it('calls api to get all images on construction', () => {
  const fetchRoundDataCalls = [];

  const roundDataPromise = Promise.resolve(
    { round: 1,
      images: [
        { src: 'image_1.jpg', id: 'abc-Xyz' },
        { src: 'image_1.jpg', id: 'abc-Xyz' }
      ],
      term: 'search term'
    });
  API.fetchRoundData = (args) => {
    fetchRoundDataCalls.push(args);
    return roundDataPromise
  };
  API.fetchGameData = () => Promise.resolve({rounds: 1});

  const output = shallow(<Round match={{params: {round: 1}}} />);
  roundDataPromise.then(() => {
    expect(shallowToJson(output)).toMatchSnapshot();
  })
  expect(fetchRoundDataCalls).toEqual([1]);
});

// TODO attempt to test active element
// https://stackoverflow.com/questions/37694900/testing-input-focus-in-enzyme/49448639#49448639
//   TypeError: Cannot read property 'focus' of null
//   console.log(this.guessInputRef)
//   { current: null }
it.skip('focuses on the guess box by default', () => {
  API.fetchRoundData = (args) => Promise.resolve({});
  API.fetchGameData = () => Promise.resolve({rounds: 1});
  const wrapper = mount(<BrowserRouter>
    <Round match={{params: {round: 1}}} />
  </BrowserRouter>);

  const focusedElement = document.activeElement;

  expect(wrapper.find('.input-container-guess').matchesElement(focusedElement)).toEqual(true)
})

it('calls api and handles an error', () => {
  const fetchRoundDataCalls = [];

  const expectedError = new Error('Fail');
  const roundDataPromise = Promise.reject(expectedError)

  API.fetchRoundData = (args) => {
    fetchRoundDataCalls.push(args);
    return roundDataPromise
  }
  API.fetchGameData = () => Promise.resolve({rounds: 1});

  const output = shallow(<Round match={{params: {round: 1}}} />);
  expect(output.find('.status .status-menu-item-value').text()).toEqual('LOADING ...');
  roundDataPromise.then(() => {
  }).catch(() => {
    expect(fetchRoundDataCalls).toEqual([1]);
    expect(output.find('.status .status-menu-item-value').text()).toEqual('ERROR');
  })
});

it.skip('sets state to winner if guess is correct', () => {
  API.fetchGameData = () => Promise.resolve({rounds: 1});
  API.fetchRoundData = (args) => Promise.resolve({ term: 'ghost' })

  const output = shallow(<Round match={{params: {round: 1}}} />);
  expect(output.find('.status .status-menu-item-value').text()).toEqual('IN-PROGRESS');
  output.find('textarea.input-container-guess').simulate('change', { target: { value: 'ghost' } });
  expect(output.find('.status .status-menu-item-value').text()).toEqual('WINNER');
})