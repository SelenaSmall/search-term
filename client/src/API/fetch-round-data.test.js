import fetchRoundData from './fetch-round-data'

it('should return a promise', () => {
  expect.assertions(1);
  return fetchRoundData().then(data => expect(data).toEqual({}));
})