import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default ({
  match: {
    params: { gameName, matchId, round },
  },
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [startRound, setStartRound] = useState(false);

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

  useEffect(() => {
    startTimer();
  });

  return (
    <>
      {startRound ? (
        <Redirect to={`/game/${gameName}/match/${matchId}/round/${round}`} />
      ) : (
        <div>{secondsRemaining}</div>
      )}
    </>
  );
};
