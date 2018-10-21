import axios from 'axios';

const fetchRoundData = async (id) => {
  const url = process.env.NODE_ENV === 'test' ? 'http://example.com' : 'http://localhost:3001'; // I hacked this shit

  const response = await axios.get(
    `${url}/api/v1/rounds`,
    {
      params: { id },
    },
  );
  return response.data;
};

export default fetchRoundData;
