import { React, useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [ navbarOpen, setNavbarOpen ] = useState(false);
  

  return (
    <nav className='navBar'>
      <Link to={'/'}  className='logo'>
      <h3>MINT A LISA</h3>
      </Link>
      <button 
        className='hamburger' 
        onClick={() => setNavbarOpen(!navbarOpen)}>{navbarOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
    </nav>
  );
}
