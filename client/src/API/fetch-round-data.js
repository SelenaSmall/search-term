import axios from 'axios';

const fetchRoundData = async (id, gameName) => {
  const url = process.env.REACT_APP_API_BASE_URL || '';

  const response = await axios.get(`${url}/api/v1/rounds/${id}?gameName=${gameName}`);
  return response.data;
};

export default fetchRoundData;
