import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import newMatch from '../../API/new-match';

const PreRound = ({
  match: {
    params: { gameName },
  },
}) => {
  const [values, setValues] = useState({ matchId: '', newMatchId: '' });

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  return values.newMatchId ? (
    <Redirect to={`/game/${gameName}/match/${values.newMatchId}`} />
  ) : (
    <>
      <ul>
        <li>
          <Link to={`/game/${gameName}/round/1`}>play demo</Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              newMatch().then((response) => {
                const {
                  match: { id: matchId },
                } = response;
                setValues({ ...values, newMatchId: matchId });
              });
              // this.props.history.push(`/game/${gameName}/match/${matchId}`)
            }}
          >
            new match
          </button>
        </li>
        <li>
          <input
            value={values.matchId}
            onChange={(event) => {
              event.preventDefault();
              onChange('matchId', event.target.value);
            }}
          />
          <Link to={`/game/${gameName}/match/${values.matchId}`}>
            join existing match
          </Link>
        </li>
      </ul>
    </>
  );
};

export default PreRound;
