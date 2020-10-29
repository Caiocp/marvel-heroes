import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import Header from '../../components/Header';
import useFetchHeroes from '../../hooks/useFetchHeroes';

import './styles.css';

function Initial() {
  const [scrollX, setScrollX] = useState(0);

  const { heroes, loading } = useFetchHeroes('', 0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = heroes.length * 320;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 64;
    }
    setScrollX(x);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className='loading-div'>loading...</div>
      </>
    );
  }

  return (
    <div id='initial-container'>
      <Header />
      <div className='hero-row-area'>
        <Link to='/heroes' className='link'>
          Personagens
          <MdKeyboardArrowRight size={36} />
        </Link>
        <div className='hero-row-left' onClick={handleLeftArrow}>
          <MdKeyboardArrowLeft size={56} />
        </div>
        <div className='hero-row-right' onClick={handleRightArrow}>
          <MdKeyboardArrowRight size={56} />
        </div>
        <div
          className='hero-row-list'
          style={{ marginLeft: scrollX, width: heroes.length * 320 }}
        >
          {heroes.map((hero) => (
            <div className='hero-row-item' key={hero.id}>
              <img
                src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                alt={hero.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Initial;
