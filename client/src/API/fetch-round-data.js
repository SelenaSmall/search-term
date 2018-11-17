import axios from 'axios';

const fetchRoundData = async (id) => {
  const url = process.env.REACT_APP_API_BASE_URL || '';

  const response = await axios.get(`${url}/api/v1/rounds/${id}`);
  return response.data;
};

export default fetchRoundData;
