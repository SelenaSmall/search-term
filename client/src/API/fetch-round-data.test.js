import axios from 'axios';
import fetchRoundData from './fetch-round-data';

it('should request data from the backend for a given round', () => {
  const axiosGets = [];

  axios.get = (url) => {
    axiosGets.push(url);
    return new Promise(() => {});
  };

  fetchRoundData(123, "game-1");

  expect(axiosGets).toEqual(['/api/v1/rounds/123?gameName=game-1']);
});

it('should return data from response', async () => {
  const data = { key: 'value1' };
  const response = { data };
  axios.get = () => Promise.resolve(response);

  const returnData = await fetchRoundData(1);

  expect(returnData).toEqual({ key: 'value1' });
});
