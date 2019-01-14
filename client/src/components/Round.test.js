import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';

import Adapter from 'enzyme-adapter-react-16';
import Round from './Round';
import API from '../API';
import Header from './Header';

Enzyme.configure({ adapter: new Adapter() });

it('snapshot testing', () => {
  API.fetchRoundData = () => Promise.resolve();
  API.fetchGameData = () => Promise.resolve({ rounds: 1 });

  const output = shallow(<Round match={{ params: { round: 1 } }} />);
  expect(shallowToJson(output)).toMatchSnapshot();
});

it('calls api to get all images on construction', () => {
  const fetchRoundDataCalls = [];

  const roundDataPromise = Promise.resolve(
    {
      round: 1,
      images: [
        { src: 'image_1.jpg', id: 'abc-Xyz' },
        { src: 'image_1.jpg', id: 'abc-Xyz' },
      ],
      term: 'search term',
    },
  );
  API.fetchRoundData = (args) => {
    fetchRoundDataCalls.push(args);
    return roundDataPromise;
  };
  API.fetchGameData = () => Promise.resolve({ rounds: 1 });

  const output = shallow(<Round match={{ params: { round: 1 } }} />);
  roundDataPromise.then(() => {
    expect(shallowToJson(output)).toMatchSnapshot();
  });
  expect(fetchRoundDataCalls).toEqual([1]);
});

// TODO attempt to test active element
// https://stackoverflow.com/questions/37694900/testing-input-focus-in-enzyme/49448639#49448639
//   TypeError: Cannot read property 'focus' of null
//   console.log(this.guessInputRef)
//   { current: null }
//
// https://blog.logrocket.com/how-to-use-react-createref-ea014ad09dba
it.skip('focuses on the guess box by default', () => {
  API.fetchRoundData = () => Promise.resolve({});
  API.fetchGameData = () => Promise.resolve({ rounds: 1 });
  const wrapper = mount(
    <BrowserRouter>
      <Round match={{ params: { round: 1 } }} />
    </BrowserRouter>,
  );

  const focusedElement = document.activeElement;

  expect(wrapper.find('.input-container-guess').matchesElement(focusedElement)).toEqual(true);
});

it('calls api and handles an error', () => {
  const fetchRoundDataCalls = [];

  const expectedError = new Error('Fail');
  const roundDataPromise = Promise.reject(expectedError);

  API.fetchRoundData = (args) => {
    fetchRoundDataCalls.push(args);
    return roundDataPromise;
  };
  API.fetchGameData = () => Promise.resolve({ rounds: 1 });

  const output = shallow(<Round match={{ params: { round: 1 } }} />);
  expect(shallowToJson(output)).toMatchSnapshot();
  roundDataPromise.then(() => {
  }).catch(() => {
    expect(fetchRoundDataCalls).toEqual([1]);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

it.skip('sets state to winner if guess is correct', () => {
  API.fetchGameData = () => Promise.resolve({ rounds: 1 });
  API.fetchRoundData = () => Promise.resolve({ term: 'ghost' });

  const output = shallow(<Round match={{ params: { round: 1 } }} />);
  expect(output.find('.status .status-menu-item-value').text()).toEqual('IN-PROGRESS');
  output.find('textarea.input-container-guess').simulate('change', { target: { value: 'ghost' } });
  expect(output.find('.status .status-menu-item-value').text()).toEqual('WINNER');
});

describe('status', () => {
  it('is set to LOADING ... by default', () => {
    const wrapper = shallow(<Round match={{ params: { round: 1 } }} />);
    expect(wrapper.find(Header).at(0).prop('status')).toBe('LOADING ...');
  });

  it('is set to IN-PROGRESS once the API call comes back', () => {
    expect.assertions(2);

    const roundDataPromise = Promise.resolve({ term: 'bjorn borg' });
    API.fetchRoundData = () => roundDataPromise;

    const wrapper = shallow(<Round match={{ params: { round: 1 } }} />);

    expect(wrapper.find(Header).at(0).prop('status')).toBe('LOADING ...');
    roundDataPromise.then(() => {
      expect(wrapper.find(Header).at(0).prop('status')).toBe('IN-PROGRESS');
    });
  });

  it.skip('is set to ERROR if the API call fails', () => {
    expect.assertions(2);

    const roundDataPromise = Promise.reject(new Error('oops'));
    API.fetchRoundData = () => roundDataPromise;

    const wrapper = shallow(<Round match={{ params: { round: 1 } }} />);

    expect(wrapper.find(Header).at(0).prop('status')).toBe('LOADING ...');
    roundDataPromise.catch(() => {
      expect(wrapper.find(Header).at(0).prop('status')).toBe('ERROR');
    });
  });

  it('is set to WINNER the right answer is guessed', () => {
    expect.assertions(3);

    const roundDataPromise = Promise.resolve({ term: 'bjorn borg' });
    API.fetchRoundData = () => roundDataPromise;

    const wrapper = shallow(<Round match={{ params: { round: 1 } }} />);

    expect(wrapper.find(Header).at(0).prop('status')).toBe('LOADING ...');
    roundDataPromise.then(() => {
      expect(wrapper.find(Header).at(0).prop('status')).toBe('IN-PROGRESS');
      wrapper.instance().handleGuess({target: { value: 'bjorn borg'}});
      expect(wrapper.find(Header).at(0).prop('status')).toBe('WINNER');
    });
  });

  it('is set to TIME-IS-UP once the time runs out', () => {
    expect.assertions(3);

    const roundDataPromise = Promise.resolve({ term: 'bjorn borg' });
    API.fetchRoundData = () => roundDataPromise;

    const wrapper = shallow(<Round match={{ params: { round: 1 } }} />);

    expect(wrapper.find(Header).at(0).prop('status')).toBe('LOADING ...');
    roundDataPromise.then(() => {
      expect(wrapper.find(Header).at(0).prop('status')).toBe('IN-PROGRESS');
      wrapper.instance().timeIsUp();
      expect(wrapper.find(Header).at(0).prop('status')).toBe('TIME-IS-UP');
    });
  });

  it('is set to WRONG if the wrong answer is guessed', () => {
    expect.assertions(3);

    const roundDataPromise = Promise.resolve({ term: 'bjorn borg' });
    API.fetchRoundData = () => roundDataPromise;

    const wrapper = shallow(<Round match={{ params: { round: 1 } }} />);

    expect(wrapper.find(Header).at(0).prop('status')).toBe('LOADING ...');
    roundDataPromise.then(() => {
      expect(wrapper.find(Header).at(0).prop('status')).toBe('IN-PROGRESS');
      wrapper.instance().handleGuess({target: { value: 'martina navratilova'}});
      expect(wrapper.find(Header).at(0).prop('status')).toBe('WRONG');
    });
  });
});
