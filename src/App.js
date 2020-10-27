import { useCallback, useEffect, useRef, useState } from 'react';

import api from './services/api';
import { getMd5Hash } from './utils';
import HeroCard from './components/HeroCard';
import logo from './assets/marvel.svg';

import './global.css';
import './App.css';
import Axios from 'axios';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const observer = useRef();
  const lastHeroElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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

        console.log(data.data);
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

  return (
    <>
      <div className='header'>
        <img src={logo} alt='marvel' width={200} />
        <h4>HEROES</h4>
      </div>
      <div className='App'>
        <div className='input-container'>
          <input
            type='text'
            value={search}
            onChange={(e) => {
              setOffset(0);
              setSearch(e.target.value);
            }}
            placeholder='Pesquisar herói'
          />
          <button onClick={() => setOffset(offset + 20)}>add</button>
        </div>
        <div style={{ width: '100%' }}>
          {error ? (
            <h1>{errorMessage}</h1>
          ) : (
            heroes.map((hero, index) => {
              if (heroes.length === index + 1) {
                return (
                  <HeroCard
                    key={hero.id}
                    hero={hero}
                    scrollRef={lastHeroElementRef}
                  />
                );
              } else {
                return <HeroCard key={hero.id} hero={hero} />;
              }
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
