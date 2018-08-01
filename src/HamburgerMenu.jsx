import React, { Component } from 'react';

class HamburgerMenu extends Component {

  componentDidMount() {
    this.setListener()
  }

  setListener = () => {
    const $menuContainer = document.querySelector('.hamburger-menu-container')
    const $mainContainer = document.querySelector('.main-container')
    const $searchContainer = document.querySelector('.search-container')

    $menuContainer.addEventListener('click', function() {
      $mainContainer.classList.toggle('horizontal')
      $searchContainer.classList.toggle('searchOnTop')
    })
  }

  render() {
    return (
      <a className='hamburger-menu-container' tabIndex='0'>
        <img src='https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png' alt='hamburger menu' />
      </a>
    );
  }
}

export default HamburgerMenu;