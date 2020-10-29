import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/marvel.svg';

import './styles.css';

function Header() {
  const history = useHistory();

  return (
    <div className='header'>
      <div className='header-content' onClick={() => history.push('/')}>
        <img src={logo} alt='marvel' width={200} />
        <h4>HEROES</h4>
      </div>
    </div>
  );
}

export default Header;
