import React, { useEffect, useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { Link } from 'react-router-dom';
import UserList from '../UserList';
import API from '../../API';

export default ({
  match: {
    params: { gameName, matchId },
  },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState(() => localStorage.getItem(player));

  const fetchPlayer = async () => {
    setIsLoading(true);
    const storedPlayer = JSON.parse(localStorage.getItem('player'));
    const fetchedPlayer = await API.fetchOrCreatePlayer(
      storedPlayer && storedPlayer.id,
    );
    localStorage.setItem('player', JSON.stringify(fetchedPlayer));
    setPlayer(fetchedPlayer);
    API.joinMatch(fetchedPlayer.id, matchId).then();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  return (
    <ActionCableConsumer url="ws://localhost:4001/cable">
      {isLoading ? (
        <div>loading ...</div>
      ) : (
        <>
          <h1>Players waiting to start match</h1>
          <div>
            match id:
            {matchId}
          </div>
          <Link to={`/game/${gameName}/match/${matchId}/pre-round/1`}>
            Start Match
          </Link>
          <UserList matchId={matchId} myUserId={player} />
        </>
      )}
    </ActionCableConsumer>
  );
};
