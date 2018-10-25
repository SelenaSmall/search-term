import axios from 'axios';

const fetchGameData = async () => {
  const url = process.env.REACT_APP_API_BASE_URL || ''

  const response = await axios.get(`${url}/api/v1/games`);
  return response.data;
};

export default fetchGameData;
