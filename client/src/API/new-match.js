import axios from 'axios';

const newMatch = async () => {
  const url = process.env.REACT_APP_API_BASE_URL || '';

  const response = await axios.post(`${url}/matches`, {
    match: { title: '' },
  });
  return response.data;
};

export default newMatch;
