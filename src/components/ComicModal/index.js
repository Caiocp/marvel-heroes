import React from 'react';

import './styles.css';

function ComicModal({ comic }) {
  return (
    <div id='hero-modal'>
      <div className='hero-details'>
        <div>
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
        </div>
        <div className='hero-description'>
          <div>
            <h1>{comic.title}</h1>
            <p>
              {comic.description ||
                comic.variantDescription ||
                'No description provided :('}
            </p>
          </div>
          <div className='span-left'>
            <span>
              Criado por{' '}
              {comic.creators.available ? comic.creators.items[0].name : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicModal;
