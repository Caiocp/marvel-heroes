import { useEffect, useState } from 'react';

import api from './services/api';
import { getMd5Hash } from './utils';
import HeroCard from './components/HeroCard';
import logo from './assets/marvel.svg';

import './global.css';
import './App.css';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      const { hash, ts } = getMd5Hash();

      try {
        const { data } = await api.get(
          `/characters?ts=${ts}&apikey=${
            process.env.REACT_APP_PUBLIC_KEY
          }&hash=${hash}&${isSearching ? 'nameStartsWith=iron man' : ''}`
        );

        console.log(data.data.results);
        setHeroes(data.data.results);
      } catch (error) {
        setError(true);
        setErrorMessage(error.response.data.message);
      }
    };
    fetchHeroes();
  }, [isSearching]);

  return (
    <>
      <div className='header'>
        <img src={logo} alt='marvel' width={200} />
        <h4>HEROES</h4>
      </div>
      <div className='App'>
        {error ? (
          <h1>{errorMessage}</h1>
        ) : (
          heroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)
        )}
      </div>
    </>
  );
}

export default App;
