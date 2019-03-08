import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../API';

export default ({
  match: {
    params: { gameName, matchId, round },
  },
}) => {
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(3);
  const [endRound, setEndRound] = useState(false);

  const tick = () => {
    if (secondsRemaining <= 0) {
      setEndRound(true);
    } else {
      setSecondsRemaining(secondsRemaining - 1);
    }
  };

  const startTimer = () => {
    setInterval(tick, 1000);
  };

  const fetchChoices = async () => {
    if (isLoading) {
      const data = await API.fetchRoundData(round, gameName);
      setChoices(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  useEffect(() => {
    startTimer();
  });

  const {
 term, images, terms, rounds 
} = choices;
  const nextRound = parseInt(round, 10) + 1;
  const lastRound = nextRound > rounds;
  return (
    <>
      {lastRound ? (
        <Redirect to={`/game/${gameName}/match/${matchId}/results`} />
      ) : (
        ''
      )}
      {endRound ? (
        <Redirect
          to={`/game/${gameName}/match/${matchId}/pre-round/${nextRound}`}
        />
      ) : (
        ''
      )}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <div>{secondsRemaining}</div>
          {term}
          {JSON.stringify(images)}
          {JSON.stringify(terms)}
        </div>
      )}
    </>
  );
};
