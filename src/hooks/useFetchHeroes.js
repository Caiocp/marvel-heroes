import { useState, useEffect } from 'react';
import Axios from 'axios';

import api from '../services/api';
import { getMd5Hash } from '../utils';

export default function useFetchHeores(search, offset) {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setHeroes([]);
  }, [search]);

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const fetchHeroes = async () => {
      const { hash, ts } = getMd5Hash();
      setLoading(true);

      try {
        const { data } = await api.get(
          `/characters?ts=${ts}&apikey=${
            process.env.REACT_APP_PUBLIC_KEY
          }&hash=${hash}&${
            search.length ? `nameStartsWith=${search}` : ''
          }&offset=${offset}`,
          { cancelToken: source.token }
        );

        setHeroes((prevHeroes) => {
          return [...prevHeroes, ...data.data.results];
        });
        setHasMore(data.data.total > offset);
        setLoading(false);
      } catch (error) {
        if (Axios.isCancel(error)) return;
        setError(true);
        setErrorMessage(error.response.data.message);
      }
    };
    fetchHeroes();
    return () => {
      source.cancel();
    };
  }, [search, offset]);

  return { loading, error, errorMessage, heroes, hasMore };
}
