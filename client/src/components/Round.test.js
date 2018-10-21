import React from 'react';
import Round from './Round';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import API from '../API'

it('snapshot testing', () => {
  API.fetchRoundData = () => Promise.resolve();

  const output = shallow(<Round />)
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
    });
  API.fetchRoundData = (args) => {
    fetchRoundDataCalls.push(args);
    return roundDataPromise
  };

  const output = shallow(<Round />);
  roundDataPromise.then(() => {
    expect(shallowToJson(output)).toMatchSnapshot();
  })
  expect(fetchRoundDataCalls).toEqual([{ round: 1 }]);
});