import axios from 'axios';

import fetchRoundData from './fetch-round-data';
import fetchGameData from './fetch-game-data';
import fetchGamesData from './fetch-games-data';
import newMatch from './new-match';

const joinMatch = async (playerId, matchId) => {
  const url = process.env.REACT_APP_API_BASE_URL || '';

  const response = await axios.put(`${url}/matches/${matchId}/join`, {
    player_id: playerId,
    match_id: matchId,
  });
  return response.data;
};

const fetchOrCreatePlayer = async (id) => {
  const url = process.env.REACT_APP_API_BASE_URL || '';

  const response = await axios.post(`${url}/players/${id}/first_or_create`, {
    playerId: id,
  });
  return response.data;
};

const fetchMatchResults = async (id) => {
  const url = process.env.REACT_APP_API_BASE_URL || '';
  const response = await axios.get(`${url}/matches/${id}/results`);
  return response.data;
};

const startMatch = async (matchId, playerId) => {
  const url = process.env.REACT_APP_API_BASE_URL || '';
  const response = await axios.put(`${url}/matches/${matchId}/start`, {
    player_id: playerId,
  });
  return response.data;
};

const fetchCommandingPlayer = async (id) => {
  const url = process.env.REACT_APP_API_BASE_URL || '';
  const response = await axios.get(`${url}/matches/${id}/commanding_player`);
  return response.data;
};

export default {
  fetchRoundData,
  fetchGameData,
  fetchGamesData,
  newMatch,
  joinMatch,
  fetchOrCreatePlayer,
  fetchMatchResults,
  startMatch,
  fetchCommandingPlayer,
};
