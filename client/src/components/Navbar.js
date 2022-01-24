import { useEffect, useState } from 'react';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [walletAddress, setWallet] = useState("");

  useEffect(async () => { //TODO: implement
    const { address } = await getCurrentWalletConnected();
    setWallet(address);

    addWalletListener();
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }

  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <Link to={'/'} className='logo'>
          <h3>MINT A LISA</h3>
        </Link>
        <button
          className='hamburger'
          onClick={() => setNavbarOpen(!navbarOpen)}>
          {navbarOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </nav>
      {navbarOpen &&
        <ul className='nav-list'>
          <li><Link to={'/'} className='nav-link' onClick={() => setNavbarOpen(false)}>Home</Link></li>
          <li><Link to={'/gallery'} className='nav-link' onClick={() => setNavbarOpen(false)}>Gallery</Link></li>
          <li>{window.ethereum && <button id="walletButton" className='nav-connect' onClick={() => setNavbarOpen(false)} onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>}
            {!window.ethereum && <p><a target="_blank" rel="noreferrer" className='sort-btn' href={`https://metamask.io/download.html`}>
              Sign up for metamask.
            </a></p>}</li>
        </ul>}
    </div>
  );
}
