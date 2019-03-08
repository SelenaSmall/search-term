import React, { useEffect, useState } from 'react';
import API from '../../API';

export default ({
  match: {
    params: { matchId },
  },
}) => {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = async () => {
    if (isLoading) {
      const data = await API.fetchMatchResults(matchId);
      setResults(data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    fetchResults();
  }, []);
  return (
    <>
      {isLoading ? <div>loading...</div> : <div>{JSON.stringify(results)}</div>}
    </>
  );
};