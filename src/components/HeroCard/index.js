import React from 'react';

import '../card.css';

function HeroCard({ hero, scrollRef, openModal }) {
  return (
    <div id='hero-card-container' ref={scrollRef}>
      <div className='card-content' onClick={() => openModal(hero)}>
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
