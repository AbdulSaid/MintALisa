import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [ navbarOpen, setNavbarOpen ] = useState(false);
  

  return (
    <nav className='navBar'>
      <h3 className='logo'>MINT A LISA</h3>
      <button className='hamburger' onClick={() => setNavbarOpen(!navbarOpen)}>{navbarOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}</button>
    </nav>
  );
}
