import axios from 'axios';
import fetchRoundData from './fetch-round-data'

it('should request data from the backend for a given round', () => {
  const axiosGets = [];

  axios.get = (url, { params }) => {
    axiosGets.push({ url, params });
    return new Promise(() => {});
  };

  fetchRoundData(123);

  expect(axiosGets).toEqual([
    {
      url: 'http://example.com/api/v1/rounds',
      params: {
        id: 123,
      },
    }
  ]);
})

it('should return data from response', async () => {
  const data = { key: 'value1' };
  const response = { data };
  axios.get = () => Promise.resolve(response);

  const returnData = await fetchRoundData(1);

  expect(returnData).toEqual({ key: 'value1' });
});