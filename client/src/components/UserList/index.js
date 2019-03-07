import React, { useEffect, useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import axios from 'axios';

export default ({ matchId, myUserId }) => {
  const API_ROOT = 'http://localhost:4001';

  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    const result = await axios.get(`${API_ROOT}/matches/${matchId}/players`);
    // TODO why not fetch?
    // const response = await fetch(`${API_ROOT}/matches/${matchId}/players`);
    // const result = await response.json();
    setUsers(result.data);
  };

  useEffect(() => {
    // TODO
    // Warning: Can't perform a React state update on an unmounted component.
    // This is a no-op, but it indicates a memory leak in your application
    // https://github.com/facebook/react/issues/14369#issuecomment-468267798
    let didCancel = false;

    if (didCancel) {
      fetchData();
    }
    return () => {
      didCancel = true;
    };
  }, []);

  const handleReceivedPlay = (response) => {
    const {
      play: { text },
    } = response;
    const match = /NEW PLAYER (.*)$/.exec(text);
    if (match) {
      // TODO only if new player and player is not in data should we fetch data otherwise just add them in
      // console.log('fetching')
      // match[1] === user id added
      // console.log(play);
      fetchData();
    }
  };
  return (
    <ActionCableConsumer
      url="ws://localhost:4001/cable"
      channel={{
        channel: 'PlaysChannel',
        match: matchId,
      }}
      onReceived={handleReceivedPlay}
    >
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.id}
            {user.id === myUserId ? <span> (myUserId)</span> : ''}
          </li>
        ))}
      </ul>
    </ActionCableConsumer>
  );
};
