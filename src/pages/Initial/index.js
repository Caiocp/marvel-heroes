import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import RowCards from '../../components/RowCards';
import useFetchHeroes from '../../hooks/useFetchHeroes';

import api from '../../services/api';
import { getMd5Hash } from '../../utils';

function Initial() {
  const [comics, setComics] = useState([]);
  const { heroes, loading } = useFetchHeroes('', 0);

  useEffect(() => {
    const fetchComics = async () => {
      const { hash, ts } = getMd5Hash();

      const { data } = await api.get(
        `/comics?ts=${ts}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`
      );

      setComics(data.data.results);
    };
    fetchComics();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className='centered-div'>loading...</div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <RowCards data={heroes} link='/heroes' title='Personagens' />
      </div>
      <div>
        <RowCards data={comics} link='/comics' title='Quadrinhos' />
      </div>
    </div>
  );
}

export default Initial;
