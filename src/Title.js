import React from 'react';
import HamburgerMenu from './HamburgerMenu';

const Title = () => (
  <div className='title-container'>
    <HamburgerMenu />
    <div className='title-inner'>
      <h1> Zagreb places</h1>
      <p>... do not miss out on this hidden gems ...</p>
    </div>
  </div>
);

export default Title;