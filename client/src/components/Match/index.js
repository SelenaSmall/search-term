import React, { useEffect, useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import UserList from '../UserList';
import API from '../../API';

export default ({
  match: {
    params: { gameName, matchId },
  },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startGame, setStartGame] = useState(false);
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

  const startMatch = () => {
    API.startMatch(matchId, player.id);
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  const handleReceivedPlay = (response) => {
    const {
      play: { text },
    } = response;
    const match = /START MATCH/.exec(text);
    if (match) {
      setStartGame(true);
    }
  };

  const content = startGame ? (
    <Redirect to={`/game/${gameName}/match/${matchId}/pre-round/1`} />
  ) : (
    <>
      <h1>Players waiting to start match</h1>
      <div>
        match id:
        {matchId}
      </div>
      <button type="button" onClick={startMatch}>
        Start Match
      </button>
      <UserList matchId={matchId} myUserId={player} />
    </>
  );
  return (
    <ActionCableConsumer
      url="ws://localhost:4001/cable"
      channel={{
        channel: 'PlaysChannel',
        match: matchId,
      }}
      onReceived={handleReceivedPlay}
    >
      {isLoading ? <Spinner color="primary" /> : content}
    </ActionCableConsumer>
  );
};
