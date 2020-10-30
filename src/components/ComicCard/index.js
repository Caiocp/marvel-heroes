import React from 'react';

import '../card.css';

function ComicCard({ comic, scrollRef, openModal }) {
  console.log(comic);
  return (
    <div id='hero-card-container' ref={scrollRef}>
      <div className='card-content' onClick={() => openModal(comic)}>
        <h3>{comic.title}</h3>
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className='hero-image'
        />
      </div>
    </div>
  );
}

export default ComicCard;
