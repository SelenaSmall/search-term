import React from 'react';

export default ({
  match: {
    params: { matchId },
  },
}) => (
  <>
    <h1>Players waiting to start match</h1>
    <span>
match id:
{' '}
{matchId}
</span>
  </>
);
