import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import './styles.css';

function RowCards({ data, link, title }) {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = data.length * 320;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 64;
    }
    setScrollX(x);
  };

  return (
    <div id='initial-container'>
      <div className='data-row-area'>
        <Link to={link} className='link'>
          {title}
          <MdKeyboardArrowRight size={36} />
        </Link>
        <div className='data-row-left' onClick={handleLeftArrow}>
          <MdKeyboardArrowLeft size={56} />
        </div>
        <div className='data-row-right' onClick={handleRightArrow}>
          <MdKeyboardArrowRight size={56} />
        </div>
        <div
          className='data-row-list'
          style={{ marginLeft: scrollX, width: data.length * 320 }}
        >
          {data.map((item) => (
            <div className='data-row-item' key={item.id}>
              <img
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RowCards;
