import React from 'react';

import './styles.css';

function HeroModal({ hero, comics }) {
  console.log(comics);
  return (
    <div id='hero-modal'>
      <div className='hero-details'>
        <div>
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={hero.name}
          />
        </div>
        <div className='hero-description'>
          <div>
            <h1>{hero.name}</h1>
            <p>
              {hero.description
                ? hero.description
                : 'No description provided :('}
            </p>
          </div>
          <div className='span-left'>
            <span>Aparece em {hero.comics.available} quadrinhos</span>
          </div>
        </div>
      </div>
      <div className='comics'>
        <h2>Quadrinhos</h2>
        <div className='comics-content'>
          {comics.map((comic) => (
            <div key={comic.id} className='comic-container'>
              <p>{comic.title}</p>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={hero.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroModal;
