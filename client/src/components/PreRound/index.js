import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import API from '../../API';

export default ({
  match: {
    params: { gameName, matchId, round },
  },
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [startRound, setStartRound] = useState(false);
  const [masterPlayer, setMasterPlayer] = useState(false);

  const tick = () => {
    // const { secondsRemaining } = this.state;
    if (secondsRemaining <= 0) {
      setStartRound(true);
      //   this.timeIsUp();
    } else {
      setSecondsRemaining(secondsRemaining - 1);
    }
  };

  const startTimer = () => {
    // const interval =
    setInterval(tick, 1000);
    // this.setState({ interval });
  };

  const fetchCommandingPlayer = async () => {
    const data = await API.fetchCommandingPlayer(matchId);
    setMasterPlayer(data);
  };

  useEffect(() => {
    startTimer();
  });

  useEffect(() => {
    fetchCommandingPlayer();
  }, []);

  return (
    <>
      {startRound ? (
        <Redirect to={`/game/${gameName}/match/${matchId}/round/${round}`} />
      ) : (
        <dl>
          <dt>remaining</dt>
          <dd>
            <Spinner color="primary" />
            {secondsRemaining}
          </dd>
          <dt>master player</dt>
          <dd>{JSON.stringify(masterPlayer)}</dd>
        </dl>
      )}
    </>
  );
};
