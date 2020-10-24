import React from 'react';

import './styles.css';

function HeroCard({ hero }) {
  return (
    <div id='hero-card-container'>
      <div className='card-content'>
        <h3>{hero.name}</h3>
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
          className='hero-image'
        />
      </div>
    </div>
  );
}

export default HeroCard;
